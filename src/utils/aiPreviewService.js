// src/utils/aiPreviewService.js
// Service for AI Realistic Photo Preview in ReWear
// Handles deterministic design hashing, local caching, daily device limits,
// clean reference SVG generation (no text/labels), mock mode simulation, and proxy API calls.

import { AI_CONFIG } from '../config/aiConfig.js';

// In-memory fallback for environments without localStorage (Node.js tests, SSR)
const memoryStore = new Map();

function getStorage() {
  try {
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
      return localStorage;
    }
  } catch {}
  return {
    getItem: (k) => (memoryStore.has(k) ? memoryStore.get(k) : null),
    setItem: (k, v) => memoryStore.set(k, String(v)),
    removeItem: (k) => memoryStore.delete(k),
    clear: () => memoryStore.clear(),
    keys: () => Array.from(memoryStore.keys()),
  };
}

/**
 * Returns today's UTC date string: YYYY-MM-DD
 */
export function getTodayUtc() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Deterministic hash of design placements and configuration.
 * Ensures identical scrap colors and layouts produce identical hashes,
 * preventing duplicate API calls.
 */
export function computeDesignHash(design) {
  if (!design) return 'empty_design';
  const parts = [
    design.productId || 'unknown',
    design.sizeKey || 'default',
    design.variant || 'plain',
  ];

  const placements = design.placements || [];
  placements.forEach((p) => {
    parts.push(p.zoneId || p.id);
    (p.scraps || []).forEach((s) => {
      parts.push(`${s.color || ''}_${s.cutWidth || 0}x${s.cutHeight || 0}`);
    });
  });

  // Simple string hash (djb2)
  let hash = 5381;
  const str = parts.join('|');
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return `hash_${(hash >>> 0).toString(16)}`;
}

/**
 * Manages per-device daily rate limiting in localStorage / fallback store.
 */
export const rateLimitTracker = {
  getUsage() {
    try {
      const storage = getStorage();
      const today = getTodayUtc();
      const raw = storage.getItem('rewear_ai_daily_usage');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.date === today) {
          return parsed;
        }
      }
      return { date: today, count: 0 };
    } catch {
      return { date: getTodayUtc(), count: 0 };
    }
  },

  increment() {
    try {
      const storage = getStorage();
      const current = this.getUsage();
      const updated = { date: current.date, count: current.count + 1 };
      storage.setItem('rewear_ai_daily_usage', JSON.stringify(updated));
      return updated.count;
    } catch {
      return 1;
    }
  },

  getRemaining() {
    const usage = this.getUsage();
    return Math.max(0, AI_CONFIG.DAILY_DEVICE_LIMIT - usage.count);
  },

  isLimitReached() {
    return this.getRemaining() <= 0;
  },

  resetForTesting() {
    try {
      const storage = getStorage();
      storage.removeItem('rewear_ai_daily_usage');
    } catch {}
  },
};

/**
 * LocalStorage cache for AI preview images by design hash.
 */
export const aiPreviewCache = {
  get(designHash) {
    try {
      const storage = getStorage();
      const raw = storage.getItem(`rewear_ai_cache_${designHash}`);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  set(designHash, data) {
    try {
      const storage = getStorage();
      storage.setItem(`rewear_ai_cache_${designHash}`, JSON.stringify(data));
    } catch {}
  },

  delete(designHash) {
    try {
      const storage = getStorage();
      storage.removeItem(`rewear_ai_cache_${designHash}`);
    } catch {}
  },

  clearForTesting() {
    try {
      const storage = getStorage();
      if (typeof storage.keys === 'function') {
        storage.keys().forEach((k) => {
          if (k.startsWith('rewear_ai_cache_')) {
            storage.removeItem(k);
          }
        });
      } else {
        const keys = Object.keys(storage);
        keys.forEach((k) => {
          if (k.startsWith('rewear_ai_cache_')) {
            storage.removeItem(k);
          }
        });
      }
    } catch {}
  },
};

/**
 * Builds a verbal description of the design layout directly from engine data.
 * Forbids extra patches, rivets, quilting padding, and printed text.
 */
export function buildVerbalLayoutPrompt(design) {
  const pid = design.productId;
  const pName = design.productName || 'Garment';
  const placements = design.placements || [];

  if (pid === 'pouch') {
    return `Small zippered utility pouch (14 x 11 cm). The front face is made of two horizontal fabric panels separated by a clean straight seam line: the upper zipper trim band in beige cotton, and the lower main base body in deep navy blue cotton. Back is a single solid navy panel. Top zipper in matching metal. Studio photo on pure plain light background. Absolutely no extra patches, no rivets, no quilting padding, no studs, no printed text or brand logos.`;
  }

  if (pid === 'tote_bag') {
    return `Medium rectangular tote bag (36 x 38 cm) with two sturdy shoulder strap handles. The front body consists of horizontal and vertical color-blocked panels from leftover fabric: top facing band in navy cotton, main body in beige cotton with navy accent. Clean sewn joins. Studio photo on pure plain light background. Absolutely no extra patches, no rivets, no quilting padding, no decorative studs, no printed words or text.`;
  }

  if (pid === 'cushion_cover') {
    return `Square patchwork cushion cover (40 x 40 cm). The front face consists of a 3x3 grid of 9 equal flat square fabric patches: top row has navy, beige, grey; middle row has navy, beige, grey; bottom row has navy, beige, grey. Flat plain-weave cotton fabric. Studio photo on pure plain light background. Absolutely no extra patches, no rivets, no quilting padding, no embroidery, no printed text or letters.`;
  }

  if (pid === 'child_top') {
    return `Child raglan T-shirt top (size chest 56 cm, ~3-4 years). The front bodice and back bodice are cut from one continuous plain cream-white solid fabric with smooth texture and zero patchwork seams. The two short raglan sleeves are a symmetrical mirrored pair: each sleeve is pieced from a 3x2 grid of small rectangular fabric scraps in navy and beige cotton, with identical colors and mirror-image patch arrangement on left and right sleeves. Contrast ribbed round neckline trim. Flat garment studio photo on plain light background. Absolutely no extra patches, no rivets, no quilting padding, no buttons, no printed text or graphics.`;
  }

  return `Patchwork ${pName} made from upcycled cotton fabric scraps. Clean flat studio photo on plain background. Absolutely no extra patches, no rivets, no quilting padding, no printed text.`;
}

/**
 * Builds a clean SVG reference image from the design with NO text, NO numbers, and NO labels.
 */
export function buildCleanReferenceSvg(design, layout, style = AI_CONFIG.AI_REFERENCE_STYLE) {
  const vb = layout?.viewBox || { x: 0, y: 0, width: 360, height: 360 };
  const panels = layout?.panels || [];

  if (style === 'flat2d') {
    // Pure flat geometric rectangles
    const rects = panels.map((p) => {
      const ox = p.canvasX || 0;
      const oy = p.canvasY || 0;
      return (p.patches || []).map((pt) => `
        <rect x="${ox + pt.relX}" y="${oy + pt.relY}" width="${pt.width}" height="${pt.height}" fill="${pt.colorHex}" stroke="#FFFFFF" stroke-width="2" />
      `).join('');
    }).join('');

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.x} ${vb.y} ${vb.width} ${vb.height}">
      <rect x="${vb.x}" y="${vb.y}" width="${vb.width}" height="${vb.height}" fill="#F8FAFC" />
      ${rects}
    </svg>`;
  }

  // Shaped view (curved or silhouette)
  if (design.productId === 'child_top') {
    const bodice = panels.find((p) => p.role === 'base') || panels[0];
    const leftSleeve = panels.find((p) => p.id === 'sleeve_1');
    const rightSleeve = panels.find((p) => p.id === 'sleeve_2');
    const is56 = design.sizeKey === 'chest56';
    const cuffX = is56 ? 75 : 81;
    const cuffY = is56 ? 263 : 291;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.x} ${vb.y} ${vb.width} ${vb.height}">
      <defs>
        ${bodice ? `<clipPath id="ref_b"><path d="${bodice.seamPath}" /><path d="${bodice.seamPath}" transform="scale(-1, 1)" /></clipPath>` : ''}
        ${leftSleeve ? `<clipPath id="ref_sl"><path d="${leftSleeve.seamPath}" /></clipPath>` : ''}
        ${rightSleeve ? `<clipPath id="ref_sr"><path d="${rightSleeve.seamPath}" transform="scale(-1, 1)" /></clipPath>` : ''}
      </defs>
      <rect x="${vb.x}" y="${vb.y}" width="${vb.width}" height="${vb.height}" fill="#F8FAFC" />
      ${bodice ? `
        <g clip-path="url(#ref_b)">
          <rect x="-200" y="-50" width="400" height="450" fill="#FAF7F2" />
        </g>
        <path d="${bodice.seamPath}" fill="none" stroke="#E2E8F0" stroke-width="2" />
        <path d="${bodice.seamPath}" transform="scale(-1, 1)" fill="none" stroke="#E2E8F0" stroke-width="2" />
      ` : ''}
      ${leftSleeve ? `
        <g transform="${leftSleeve.transform}">
          <g clip-path="url(#ref_sl)">
            ${leftSleeve.patches.map((p) => `<rect x="${p.relX}" y="${p.relY}" width="${p.width}" height="${p.height}" fill="${p.colorHex}" />`).join('')}
            ${leftSleeve.seams.map((s) => `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="4,4" />`).join('')}
          </g>
          <path d="${leftSleeve.seamPath}" fill="none" stroke="#FFFFFF" stroke-width="2" />
          <line x1="${-cuffX}" y1="${cuffY}" x2="${cuffX}" y2="${cuffY}" stroke="#D6C0A4" stroke-width="4" />
        </g>
      ` : ''}
      ${rightSleeve ? `
        <g transform="${rightSleeve.transform}">
          <g clip-path="url(#ref_sr)">
            ${rightSleeve.patches.map((p) => `<rect x="${p.relX}" y="${p.relY}" width="${p.width}" height="${p.height}" fill="${p.colorHex}" />`).join('')}
            ${rightSleeve.seams.map((s) => `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="4,4" />`).join('')}
          </g>
          <path d="${rightSleeve.seamPath}" transform="scale(-1, 1)" fill="none" stroke="#FFFFFF" stroke-width="2" />
          <line x1="${-cuffX}" y1="${cuffY}" x2="${cuffX}" y2="${cuffY}" stroke="#D6C0A4" stroke-width="4" />
        </g>
      ` : ''}
    </svg>`;
  }

  // Shaped view for tote, pouch, cushion
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.x} ${vb.y} ${vb.width} ${vb.height}">
    <rect x="${vb.x}" y="${vb.y}" width="${vb.width}" height="${vb.height}" fill="#F8FAFC" />
    ${(layout?.decorations || []).map((d) => {
      if (d.type === 'strap' || d.type === 'handle') {
        return `<path d="${d.path || ''}" fill="none" stroke="${d.stroke || '#CBD5E1'}" stroke-width="${d.strokeWidth || 8}" stroke-linecap="round" />`;
      }
      if (d.type === 'zipper') {
        return `<line x1="${d.x1}" y1="${d.y1}" x2="${d.x2}" y2="${d.y2}" stroke="#94A3B8" stroke-width="3" stroke-dasharray="2,2" />`;
      }
      return '';
    }).join('')}
    ${panels.map((p) => {
      const ox = p.canvasX || 0;
      const oy = p.canvasY || 0;
      return (p.patches || []).map((pt) => `
        <rect x="${ox + pt.relX}" y="${oy + pt.relY}" width="${pt.width}" height="${pt.height}" fill="${pt.colorHex}" stroke="#FFFFFF" stroke-width="1.5" />
      `).join('') + (p.seams || []).map((s) => `
        <line x1="${ox + s.x1}" y1="${oy + s.y1}" x2="${ox + s.x2}" y2="${oy + s.y2}" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="3,3" />
      `).join('');
    }).join('')}
  </svg>`;
}

/**
 * Main function to request an AI photo preview.
 * Online only; cached by design hash; enforces daily limit.
 *
 * @param {Object} options
 * @param {Object} options.design - Design data from buildDesign()
 * @param {Object} options.layout - Layout data from computeProduct2DLayout()
 * @param {AbortSignal} [options.signal] - For user cancelation
 * @param {boolean} [options.forceRegenerate] - Clears cache and re-requests
 * @returns {Promise<Object>} Preview result or error
 */
export async function requestAiPhotoPreview({
  design,
  layout,
  signal,
  forceRegenerate = false,
}) {
  if (!design) {
    return { error: 'Invalid design provided.', code: 'INVALID_DESIGN' };
  }

  // 1. Online check (Requirement 2: Online only; offline shows "Needs internet")
  const isOnline = typeof navigator !== 'undefined' ? (navigator.onLine ?? true) : true;
  if (!isOnline) {
    return {
      error: AI_CONFIG.LABELS.OFFLINE_DESC,
      code: 'OFFLINE',
      title: AI_CONFIG.LABELS.OFFLINE_TITLE,
    };
  }

  const designHash = computeDesignHash(design);

  // 2. Cache Check (Requirement 2: Cache by design hash so the same design is never generated twice)
  if (!forceRegenerate) {
    const cached = aiPreviewCache.get(designHash);
    if (cached) {
      return {
        ...cached,
        fromCache: true,
        remainingToday: rateLimitTracker.getRemaining(),
      };
    }
  }

  // 3. Daily Limit Check (Requirement 1 & 2: 10 per device daily limit)
  if (rateLimitTracker.isLimitReached()) {
    return {
      error: AI_CONFIG.LABELS.LIMIT_DESC,
      code: 'LIMIT_REACHED',
      title: AI_CONFIG.LABELS.LIMIT_TITLE,
      remainingToday: 0,
    };
  }

  // 4. MOCK MODE (Requirement: MOCK_AI=true fake wait 3s, bundled example image, strict disclaimer)
  if (AI_CONFIG.MOCK_AI) {
    // 3-second fake wait supporting user cancelation
    await new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, AI_CONFIG.MOCK_DELAY_MS);
      if (signal) {
        signal.addEventListener('abort', () => {
          clearTimeout(timer);
          reject(new DOMException('Operation canceled by user', 'AbortError'));
        });
      }
    });

    // Increment daily usage count
    rateLimitTracker.increment();

    const pid = design.productId || 'pouch';
    const exampleUrl = AI_CONFIG.MOCK_EXAMPLES[pid] || AI_CONFIG.MOCK_EXAMPLES.pouch;

    const result = {
      ok: true,
      isMock: true,
      imageUrl: exampleUrl,
      label: AI_CONFIG.LABELS.MOCK_DISCLAIMER,
      disclaimer: AI_CONFIG.LABELS.MOCK_DISCLAIMER,
      designHash,
      remainingToday: rateLimitTracker.getRemaining(),
      generatedAt: new Date().toISOString(),
    };

    // Cache the result
    aiPreviewCache.set(designHash, result);
    return result;
  }

  // 5. REAL MODE (via Cloudflare Worker proxy)
  const cleanSvg = buildCleanReferenceSvg(design, layout, AI_CONFIG.AI_REFERENCE_STYLE);
  const prompt = buildVerbalLayoutPrompt(design);

  // Convert SVG to data URI
  const svgDataUri = `data:image/svg+xml;base64,${typeof btoa === 'function' ? btoa(cleanSvg) : Buffer.from(cleanSvg).toString('base64')}`;

  const payload = {
    referenceImage: svgDataUri,
    prompt,
    deviceId: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'device_local',
    productId: design.productId,
    isMock: false,
  };

  const response = await fetch(`${AI_CONFIG.AI_PROXY_URL}/api/generate-preview`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 429) {
      return {
        error: errorData.error || AI_CONFIG.LABELS.LIMIT_DESC,
        code: 'LIMIT_REACHED',
        title: AI_CONFIG.LABELS.LIMIT_TITLE,
        remainingToday: 0,
      };
    }
    return {
      error: errorData.error || 'Could not generate photo. Please try again.',
      code: 'API_ERROR',
    };
  }

  const data = await response.json();
  rateLimitTracker.increment();

  const finalResult = {
    ok: true,
    isMock: false,
    imageUrl: `data:${data.mimeType || 'image/png'};base64,${data.imageBase64}`,
    label: AI_CONFIG.LABELS.REAL_DISCLAIMER,
    disclaimer: AI_CONFIG.LABELS.REAL_DISCLAIMER,
    designHash,
    remainingToday: rateLimitTracker.getRemaining(),
    generatedAt: new Date().toISOString(),
  };

  aiPreviewCache.set(designHash, finalResult);
  return finalResult;
}
