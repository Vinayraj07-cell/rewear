// src/utils/aiSuggestionService.js
// Stage 6 / Task A8: Safe AI Product Suggestion Logic (Task A11 lite)
// Analyzes the current pile and suggests an optimal product.
// Strictly labelled: "AI suggestion - Tailor always confirms"

import { PRODUCT_TEMPLATES } from '../engine/templates.js';

export const AI_SUGGESTION_LABEL = 'AI suggestion - Tailor always confirms';

/**
 * Computes a safe, deterministic product suggestion based on the user's scrap pile.
 * Never throws on empty, null, or undefined pile inputs.
 * 
 * @param {Array<Object>} pieces - Current scraps in pile
 * @param {string} [lang='en'] - UI language
 * @returns {Object} Suggestion details with strict honesty label
 */
export function getAiProductSuggestion(pieces = [], lang = 'en') {
  const activePieces = Array.isArray(pieces) ? pieces.filter((p) => p && p.included !== false) : [];
  
  // Calculate total scrap area and count
  const totalScrapsCount = activePieces.reduce((sum, p) => sum + (Number(p.quantity) || 1), 0);
  const totalAreaCm2 = activePieces.reduce((sum, p) => {
    const w = Number(p.width) || 0;
    const h = Number(p.height) || 0;
    const qty = Number(p.quantity) || 1;
    return sum + (w * h * qty);
  }, 0);

  // Default empty pile fallback
  if (activePieces.length === 0 || totalScrapsCount === 0 || totalAreaCm2 === 0) {
    return {
      productId: 'tote_bag',
      productName: PRODUCT_TEMPLATES.tote_bag?.name || 'Quilted Tote Bag',
      label: AI_SUGGESTION_LABEL,
      confidence: 'low',
      totalScrapsCount: 0,
      totalAreaCm2: 0,
      reason: {
        en: 'Your pile is empty. Add a few scraps or tap a sample pile to get custom AI product suggestions.',
        hi: 'आपकी कतरन खाली है। कुछ टुकड़े जोड़ें या सैंपल कतरन चुनें।',
        te: 'మీ ముక్కల జాబితా ఖాళీగా ఉంది. కొన్ని ముక్కలను చేర్చండి.',
      }[lang] || 'Your pile is empty. Add a few scraps or tap a sample pile to get custom AI product suggestions.',
      recommendation: {
        en: 'Try loading the Neutral or Colourful sample pile to see what you can make!',
        hi: 'शुरुआत के लिए सैंपल कतरन लोड करके देखें!',
        te: 'నమూనా ముక్కలతో ప్రారంభించండి!',
      }[lang] || 'Try loading the Neutral or Colourful sample pile to see what you can make!',
    };
  }

  // Count fabric feel characteristics
  let sturdyCount = 0;
  let softCount = 0;
  for (const p of activePieces) {
    const feel = (p.fabricFeel || p.fabricType || '').toLowerCase();
    if (feel.includes('denim') || feel.includes('canvas') || feel.includes('sturdy') || feel.includes('heavy') || feel.includes('cotton')) {
      sturdyCount += (Number(p.quantity) || 1);
    } else if (feel.includes('silk') || feel.includes('viscose') || feel.includes('soft') || feel.includes('light') || feel.includes('chiffon')) {
      softCount += (Number(p.quantity) || 1);
    }
  }

  // Suggestion rule heuristics
  let chosenId = 'pouch';
  let reasoningEn = '';
  let reasoningHi = '';
  let reasoningTe = '';

  if (totalAreaCm2 >= 4500 && totalScrapsCount >= 8) {
    if (sturdyCount >= softCount) {
      chosenId = 'tote_bag';
      reasoningEn = `You have ${totalScrapsCount} sturdy scraps (${Math.round(totalAreaCm2)} cm²). Ideal for a Quilted Tote Bag with strong patchwork panels.`;
      reasoningHi = `आपके पास ${totalScrapsCount} मजबूत कतरनें हैं। यह क्विल्टेड टोट बैग बनाने के लिए सबसे उपयुक्त है।`;
      reasoningTe = `మీ వద్ద ${totalScrapsCount} గట్టి ముక్కలు ఉన్నాయి. క్విల్టెడ్ టోట్ బ్యాగ్‌కు ఇది సరైనది.`;
    } else {
      chosenId = 'cushion_cover';
      reasoningEn = `You have ${totalScrapsCount} soft fabric scraps (${Math.round(totalAreaCm2)} cm²). Great fit for a cozy Patchwork Cushion Cover.`;
      reasoningHi = `आपके पास ${totalScrapsCount} मुलायम कतरनें हैं। यह पैचवर्क कुशन कवर के लिए उत्तम है।`;
      reasoningTe = `మీ వద్ద ${totalScrapsCount} మృదువైన ముక్కలు ఉన్నాయి. ప్యాచ్‌వర్క్ కుషన్ కవర్‌కు సరిపోతుంది.`;
    }
  } else if (totalAreaCm2 >= 2000 && totalScrapsCount >= 4) {
    chosenId = 'pouch';
    reasoningEn = `You have ${totalScrapsCount} medium-sized scraps (${Math.round(totalAreaCm2)} cm²). A Zippered Utility Pouch makes high-utility use of this fabric.`;
    reasoningHi = `आपके पास ${totalScrapsCount} मध्यम कतरनें हैं। यह ज़िपर पाउच के लिए बहुत उपयोगी रहेगा।`;
    reasoningTe = `మీ వద్ద ${totalScrapsCount} ముక్కలు ఉన్నాయి. జిప్పర్ పౌచ్ చేయడానికి ఇది అనువైనది.`;
  } else if (totalAreaCm2 >= 1000) {
    chosenId = 'pot_holder';
    reasoningEn = `Compact pile with ${totalScrapsCount} pieces (${Math.round(totalAreaCm2)} cm²). Perfect for a durable Kitchen Pot Holder.`;
    reasoningHi = `आपके पास ${totalScrapsCount} छोटे टुकड़े हैं। यह किचन पॉट होल्डर बनाने के लिए बढ़िया है।`;
    reasoningTe = `చిన్న ముక్కలతో వంటింటి పాట్ హోల్డర్ సులభంగా తయారు చేయవచ్చు.`;
  } else {
    chosenId = 'scrunchie';
    reasoningEn = `Small leftover pile (${totalScrapsCount} pieces, ${Math.round(totalAreaCm2)} cm²). Zero-waste recommendation: Ruffled Hair Scrunchie.`;
    reasoningHi = `कम कतरनों के लिए सुझाव: सुंदर हेयर स्क्रंची बनाएं जिसमें शून्य बर्बादी होगी।`;
    reasoningTe = `మిగిలిన చిన్న ముక్కలతో హెయిర్ స్క్రంచీని సులభంగా కుట్టవచ్చు.`;
  }

  const template = PRODUCT_TEMPLATES[chosenId] || PRODUCT_TEMPLATES.pouch;
  const productName = template.name || chosenId.replace(/_/g, ' ');

  return {
    productId: chosenId,
    productName,
    label: AI_SUGGESTION_LABEL,
    confidence: totalScrapsCount >= 6 ? 'high' : 'medium',
    totalScrapsCount,
    totalAreaCm2: Math.round(totalAreaCm2),
    reason: {
      en: reasoningEn,
      hi: reasoningHi,
      te: reasoningTe,
    }[lang] || reasoningEn,
    recommendation: {
      en: 'Review the design with your tailor to confirm fit and seam allowances.',
      hi: 'दर्जी के साथ नाप और सिलाई की पुष्टि अवश्य करें।',
      te: 'కొలతలు మరియు కుట్టు కోసం టైలర్‌ను సంప్రదించండి.',
    }[lang] || 'Review the design with your tailor to confirm fit and seam allowances.',
  };
}
