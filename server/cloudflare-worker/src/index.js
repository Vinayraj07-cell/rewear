// server/cloudflare-worker/src/index.js
// Cloudflare Worker Proxy for ReWear AI Photo Preview
// Protects GEMINI_API_KEY as a secret, enforces per-device and global daily limits,
// and supports both MOCK_AI mode and real Gemini API calls.

// In-memory fallback cache for rate-limiting when KV is not bound
const memoryLimits = new Map();

function getTodayKey() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
}

function checkAndIncrementLimit(deviceId, maxPerDevice = 10, maxGlobal = 100) {
  const today = getTodayKey();
  const devKey = `${today}:${deviceId || 'anonymous'}`;
  const globKey = `${today}:__global__`;

  const devCount = memoryLimits.get(devKey) || 0;
  const globCount = memoryLimits.get(globKey) || 0;

  if (globCount >= maxGlobal) {
    return {
      allowed: false,
      reason: 'GLOBAL_LIMIT_REACHED',
      message: 'Server daily capacity reached. Please try tomorrow.',
      remaining: 0,
    };
  }

  if (devCount >= maxPerDevice) {
    return {
      allowed: false,
      reason: 'DEVICE_LIMIT_REACHED',
      message: `Daily preview limit reached (${maxPerDevice}/${maxPerDevice}). Resets tomorrow.`,
      remaining: 0,
    };
  }

  memoryLimits.set(devKey, devCount + 1);
  memoryLimits.set(globKey, globCount + 1);

  return {
    allowed: true,
    count: devCount + 1,
    remaining: maxPerDevice - (devCount + 1),
  };
}

export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Device-ID',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    // Health / Status endpoint
    if (url.pathname === '/api/status' || url.pathname === '/') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          service: 'ReWear AI Proxy',
          mockMode: env.MOCK_AI === 'true',
          model: env.AI_MODEL || 'models/gemini-2.5-flash-image',
          todayUtc: getTodayKey(),
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Main generate endpoint
    if (url.pathname === '/api/generate-preview' && request.method === 'POST') {
      try {
        const body = await request.json().catch(() => ({}));
        const {
          referenceImage, // base64 PNG/JPEG
          prompt,          // text description of patchwork layout
          deviceId,        // unique client identifier
          productId,       // pouch, tote_bag, cushion_cover, child_top
          isMock,          // optional client override flag
        } = body;

        if (!prompt) {
          return new Response(
            JSON.stringify({ error: 'Missing prompt description' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const deviceLimit = parseInt(env.DEVICE_DAILY_LIMIT || '10', 10);
        const globalCap = parseInt(env.GLOBAL_DAILY_CAP || '100', 10);

        // Check Rate Limits
        const limitCheck = checkAndIncrementLimit(deviceId, deviceLimit, globalCap);
        if (!limitCheck.allowed) {
          return new Response(
            JSON.stringify({
              error: limitCheck.message,
              reason: limitCheck.reason,
              remainingToday: 0,
            }),
            { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // MOCK MODE:
        // Returns example bundled image metadata with strict disclaimer
        const useMock = env.MOCK_AI === 'true' || isMock === true;
        if (useMock) {
          // Simulate realistic network delay (3 seconds)
          await new Promise((r) => setTimeout(r, 3000));

          return new Response(
            JSON.stringify({
              ok: true,
              isMock: true,
              label: 'Example photo (not generated from your design)',
              disclaimer: 'Example photo (not generated from your design)',
              productId: productId || 'custom',
              exampleImageUrl: `/mock_ai/example_${productId || 'pouch'}.jpg`,
              remainingToday: limitCheck.remaining,
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // REAL GEMINI API CALL:
        if (!env.GEMINI_API_KEY) {
          return new Response(
            JSON.stringify({ error: 'GEMINI_API_KEY is not configured on the proxy worker.' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const modelName = env.AI_MODEL || 'models/gemini-2.5-flash-image';
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${env.GEMINI_API_KEY}`;

        const parts = [
          {
            text: `${prompt}\n\nStrict requirement: Match the exact patch layout, seam lines, and color blocking shown in the reference image. Forbid any extra decorative patches, quilting puffiness, metal rivets, or printed text.`,
          },
        ];

        if (referenceImage) {
          // Strip prefix data:image/...;base64, if present
          const cleanB64 = referenceImage.replace(/^data:image\/[a-z]+;base64,/, '');
          parts.push({
            inline_data: {
              mime_type: 'image/png',
              data: cleanB64,
            },
          });
        }

        const payload = {
          contents: [{ parts }],
          generationConfig: {
            responseModalities: ['IMAGE'],
          },
        };

        const geminiRes = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const geminiData = await geminiRes.json();

        if (!geminiRes.ok) {
          const errMsg = geminiData.error?.message || 'Gemini API call failed';
          return new Response(
            JSON.stringify({
              error: errMsg,
              reason: geminiRes.status === 429 ? 'UPSTREAM_QUOTA_EXCEEDED' : 'API_ERROR',
              remainingToday: limitCheck.remaining,
            }),
            { status: geminiRes.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const candidate = geminiData.candidates?.[0];
        const imagePart = candidate?.content?.parts?.find((p) => p.inlineData || p.inline_data);
        if (!imagePart) {
          return new Response(
            JSON.stringify({ error: 'No image was generated by the model. Please try again.' }),
            { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const imgB64 = imagePart.inlineData?.data || imagePart.inline_data?.data;
        const mime = imagePart.inlineData?.mimeType || imagePart.inline_data?.mime_type || 'image/png';

        return new Response(
          JSON.stringify({
            ok: true,
            isMock: false,
            imageBase64: imgB64,
            mimeType: mime,
            label: 'AI photo. For inspiration only. Seams and patch positions follow the plan and blueprint.',
            disclaimer: 'AI photo. For inspiration only. Seams and patch positions follow the plan and blueprint.',
            remainingToday: limitCheck.remaining,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err.message || 'Internal proxy error' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  },
};
