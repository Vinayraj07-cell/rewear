// src/utils/geminiService.js
// Stage 6 / Task A11: Real Gemini AI Vision Integration
// Analyzes fabric or garment photo using Gemini 1.5 Flash API via REST.

export const AI_HONESTY_LABEL = '✨ AI Suggestion - Please verify measurements with a tailor.';

export const TAILOR_SYSTEM_INSTRUCTION =
  'You are an expert tailor. Look at the provided image of fabric or old clothes. Based on its apparent texture, size, and material, suggest ONE or TWO products that can be made from it out of our catalog (e.g., tote bag, cushion cover, lunch bag, apron, pouch). Provide a 2-sentence explanation of why this fabric is suitable. Keep it encouraging.';

/**
 * Extracts pure base64 data and MIME type from a string or object.
 * 
 * @param {string|{data: string, mimeType?: string}} input
 * @returns {{ mimeType: string, base64Data: string }}
 */
export function parseImagePayload(input) {
  if (!input) {
    throw new Error('No image data provided for AI vision analysis.');
  }

  let mimeType = 'image/jpeg';
  let base64Data = '';

  if (typeof input === 'object' && input.data) {
    base64Data = input.data;
    if (input.mimeType) mimeType = input.mimeType;
  } else if (typeof input === 'string') {
    if (input.startsWith('data:')) {
      const commaIdx = input.indexOf(',');
      const semiIdx = input.indexOf(';');
      if (commaIdx !== -1 && semiIdx !== -1) {
        mimeType = input.substring(5, semiIdx) || 'image/jpeg';
        base64Data = input.substring(commaIdx + 1);
      } else {
        base64Data = input;
      }
    } else {
      base64Data = input;
    }
  }

  // Strip any whitespace or line breaks
  base64Data = base64Data.trim().replace(/\s/g, '');

  if (!base64Data) {
    throw new Error('Image data is empty.');
  }

  return { mimeType, base64Data };
}

/**
 * Calls Gemini 1.5 Flash with the fabric image to get product recommendations.
 * 
 * @param {string|{data: string, mimeType?: string}} imageData - Base64 image
 * @param {Object} [options]
 * @param {string} [options.apiKey] - Explicit API key (defaults to VITE_GEMINI_API_KEY)
 * @param {Function} [options.fetchFn] - Custom fetch function (for unit testing)
 * @returns {Promise<{ success: boolean, suggestion: string, honestyLabel: string, rawResponse?: any }>}
 */
export async function suggestProductFromFabricImage(imageData, options = {}) {
  // 1. Resolve API Key with safe environment access
  const envKey =
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) ||
    (typeof process !== 'undefined' && process.env && process.env.VITE_GEMINI_API_KEY) ||
    '';

  const apiKey = (options.apiKey || envKey || '').trim();

  if (!apiKey) {
    throw new Error('AI service unavailable: API key not configured.');
  }

  // 2. Parse payload
  const { mimeType, base64Data } = parseImagePayload(imageData);

  // 3. Assemble Gemini 1.5 Flash request body
  const requestBody = {
    system_instruction: {
      parts: [
        {
          text: TAILOR_SYSTEM_INSTRUCTION,
        },
      ],
    },
    contents: [
      {
        parts: [
          {
            inline_data: {
              mime_type: mimeType,
              data: base64Data,
            },
          },
          {
            text: 'What product from your catalog do you recommend making with this fabric? Give a concise 2-sentence explanation.',
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 256,
    },
  };

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
  const fetchImpl = options.fetchFn || (typeof fetch !== 'undefined' ? fetch : null);

  if (!fetchImpl) {
    throw new Error('AI service unavailable: fetch environment not found.');
  }

  try {
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      let errMsg = `HTTP ${response.status}`;
      try {
        const errJson = await response.json();
        if (errJson?.error?.message) {
          errMsg = errJson.error.message;
        }
      } catch {
        // ignore json parse error
      }
      throw new Error(`AI service unavailable: ${errMsg}`);
    }

    const data = await response.json();
    const candidate = data?.candidates?.[0];
    const textPart = candidate?.content?.parts?.[0]?.text;

    if (!textPart || typeof textPart !== 'string') {
      throw new Error('AI service unavailable: No recommendation returned.');
    }

    return {
      success: true,
      suggestion: textPart.trim(),
      honestyLabel: AI_HONESTY_LABEL,
      rawResponse: data,
    };
  } catch (err) {
    // Return or rethrow with guaranteed friendly message prefix
    const message = err.message || 'AI service unavailable';
    if (!message.includes('AI service unavailable')) {
      throw new Error(`AI service unavailable: ${message}`);
    }
    throw err;
  }
}
