// src/config/aiConfig.js
// Configuration for ReWear AI Realistic Photo Preview
// Model name, reference style, and proxy settings are centralized here.

export const AI_CONFIG = {
  // MOCK_AI: Set to true while Google AI Studio image generation quota is unavailable on free tier.
  // In mock mode, the app returns a bundled example photo after a 3-second fake wait,
  // clearly labelled: "Example photo (not generated from your design)".
  MOCK_AI: true,

  // Deployed Cloudflare Worker proxy URL (holds GEMINI_API_KEY as secret).
  // The app only communicates with this proxy; the secret is never in the client or APK.
  AI_PROXY_URL: 'https://rewear-ai-proxy.your-subdomain.workers.dev',

  // Google Gemini Image-Generation Model Name
  // Used in real mode via generateContent with inline_data reference image and responseModalities: ["IMAGE"]
  AI_MODEL: 'models/gemini-2.5-flash-image',

  // Reference image style to feed into the model: 'shaped' (product silhouette) or 'flat2d' (geometric patchwork)
  AI_REFERENCE_STYLE: 'shaped',

  // Per-device daily limit
  DAILY_DEVICE_LIMIT: 10,

  // Fake delay in milliseconds for mock mode simulation
  MOCK_DELAY_MS: 3000,

  // Bundled example images per product for mock mode
  MOCK_EXAMPLES: {
    pouch: '/mock_ai/example_pouch.jpg',
    tote_bag: '/mock_ai/example_tote_bag.jpg',
    cushion_cover: '/mock_ai/example_cushion_cover.jpg',
    child_top: '/mock_ai/example_child_top.jpg',
    kids_frock: '/mock_ai/example_kids_frock.jpg',
  },

  // Mandatory user-facing labels & disclaimers
  LABELS: {
    MOCK_DISCLAIMER: 'Example photo (not generated from your design)',
    REAL_DISCLAIMER: 'AI photo. For inspiration only. Seams and patch positions follow the plan and blueprint.',
    WAITING_TITLE: 'Creating your photo...',
    WAITING_DESC: 'Visualizing leftover fabric patchwork as a finished studio photo...',
    OFFLINE_TITLE: 'Needs internet connection',
    OFFLINE_DESC: 'AI photo preview requires an active internet connection. Your scrap fitting and tailor blueprints work 100% offline.',
    LIMIT_TITLE: 'Daily preview limit reached',
    LIMIT_DESC: 'You have used all 10 previews for today. Limit resets tomorrow.',
  },
};
