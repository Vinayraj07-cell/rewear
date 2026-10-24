// src/i18n/galleryTranslations.js
// Stage 6 / Task A2: Translations for Inspiration Gallery Disclaimers and Palettes

export const GALLERY_TRANSLATIONS = {
  en: {
    inspirationDisclaimer: 'Inspiration example (AI-generated), not made from your scraps',
    inspirationTitle: 'Design Inspiration',
    inspirationSubtitle: 'Examples in color palettes similar to your fabric scraps',
    colourways: {
      earth: 'Earth',
      indigo: 'Indigo',
      festive: 'Festive',
      pastel: 'Pastel',
    },
  },
  hi: {
    inspirationDisclaimer: 'प्रेरणा उदाहरण (AI-निर्मित), आपके कपड़ों के टुकड़ों से नहीं बना है',
    inspirationTitle: 'डिज़ाइन प्रेरणा',
    inspirationSubtitle: 'आपके कपड़े के टुकड़ों से मिलते-जुलते रंगों के उदाहरण',
    colourways: {
      earth: 'मिट्टी',
      indigo: 'नील',
      festive: 'उत्सव',
      pastel: 'हल्के रंग',
    },
  },
  te: {
    inspirationDisclaimer: 'ప్రేరణ ఉదాహరణ (AI-రూపొందించినది), మీ గుడ్డ ముక్కలతో తయారు చేయబడలేదు',
    inspirationTitle: 'డిజైన్ ప్రేరణ',
    inspirationSubtitle: 'మీ గుడ్డ ముక్కలకు సరిపోయే రంగులలో ఉదాహరణలు',
    colourways: {
      earth: 'మట్టి రంగులు',
      indigo: 'నీలి రంగులు',
      festive: 'పండుగ రంగులు',
      pastel: 'లేత రంగులు',
    },
  },
};

/**
 * Returns localized inspiration disclaimer string.
 *
 * @param {'en'|'hi'|'te'} [lang='en']
 * @returns {string}
 */
export function getInspirationDisclaimer(lang = 'en') {
  return GALLERY_TRANSLATIONS[lang]?.inspirationDisclaimer || GALLERY_TRANSLATIONS.en.inspirationDisclaimer;
}

export default GALLERY_TRANSLATIONS;
