// Phonetic transliterator for Telugu (\u0C00-\u0C7F) and Devanagari / Hindi (\u0900-\u097F)
// Enables Indian English TTS voices (e.g. Microsoft Ravi, Microsoft Heera) to clearly pronounce
// Telugu and Hindi when the operating system lacks native Indic voice packs.

const TELUGU_MAP = {
  '\u0C05': 'a', '\u0C06': 'aa', '\u0C07': 'i', '\u0C08': 'ee', '\u0C09': 'u', '\u0C0A': 'oo',
  '\u0C0B': 'ru', '\u0C0E': 'e', '\u0C0F': 'ae', '\u0C10': 'ai', '\u0C12': 'o', '\u0C13': 'oo',
  '\u0C14': 'au', '\u0C02': 'm', '\u0C03': 'ha',
  '\u0C15': 'ka', '\u0C16': 'kha', '\u0C17': 'ga', '\u0C18': 'gha', '\u0C19': 'nga',
  '\u0C1A': 'cha', '\u0C1B': 'chha', '\u0C1C': 'ja', '\u0C1D': 'jha', '\u0C1E': 'nya',
  '\u0C1F': 'ta', '\u0C20': 'tha', '\u0C21': 'da', '\u0C22': 'dha', '\u0C23': 'na',
  '\u0C24': 'tha', '\u0C25': 'thha', '\u0C26': 'da', '\u0C27': 'dha', '\u0C28': 'na',
  '\u0C2A': 'pa', '\u0C2B': 'pha', '\u0C2C': 'ba', '\u0C2D': 'bha', '\u0C2E': 'ma',
  '\u0C2F': 'ya', '\u0C30': 'ra', '\u0C31': 'ra', '\u0C32': 'la', '\u0C33': 'la',
  '\u0C35': 'va', '\u0C36': 'sha', '\u0C37': 'sha', '\u0C38': 'sa', '\u0C39': 'ha',
  // Matras
  '\u0C3E': 'aa', '\u0C3F': 'i', '\u0C40': 'ee', '\u0C41': 'u', '\u0C42': 'oo',
  '\u0C43': 'ru', '\u0C46': 'e', '\u0C47': 'ae', '\u0C48': 'ai', '\u0C4A': 'o',
  '\u0C4B': 'oo', '\u0C4C': 'au', '\u0C4D': '', // Virama
};

const HINDI_MAP = {
  '\u0905': 'a', '\u0906': 'aa', '\u0907': 'i', '\u0908': 'ee', '\u0909': 'u', '\u090A': 'oo',
  '\u090B': 'ri', '\u090F': 'e', '\u0910': 'ai', '\u0913': 'o', '\u0914': 'au',
  '\u0902': 'n', '\u0901': 'n', '\u0903': 'ha',
  '\u0915': 'ka', '\u0916': 'kha', '\u0917': 'ga', '\u0918': 'gha', '\u0919': 'nga',
  '\u091A': 'cha', '\u091B': 'chha', '\u091C': 'ja', '\u091D': 'jha', '\u091E': 'nya',
  '\u091F': 'ta', '\u0920': 'tha', '\u0921': 'da', '\u0922': 'dha', '\u0923': 'na',
  '\u0924': 'ta', '\u0925': 'tha', '\u0926': 'da', '\u0927': 'dha', '\u0928': 'na',
  '\u092A': 'pa', '\u092B': 'pha', '\u092C': 'ba', '\u092D': 'bha', '\u092E': 'ma',
  '\u092F': 'ya', '\u0930': 'ra', '\u0932': 'la', '\u0933': 'la', '\u0935': 'va',
  '\u0936': 'sha', '\u0937': 'sha', '\u0938': 'sa', '\u0939': 'ha',
  // Matras
  '\u093E': 'aa', '\u093F': 'i', '\u0940': 'ee', '\u0941': 'u', '\u0942': 'oo',
  '\u0943': 'ri', '\u0947': 'e', '\u0948': 'ai', '\u094B': 'o', '\u094C': 'au',
  '\u094D': '', // Halant
};

// Known tailored dictionary for natural, smooth cadence
const PHRASE_DICTIONARY = {
  // Greetings & Announcements
  'రీవేర్ కి స్వాగతం! మిగిలిపోయిన బట్టల ముక్కలతో అందమైన వస్తువులు కుట్టండి.':
    'Telugu bhasha: ReWear ki swagatham! Migilina battala mukkalanu chupinchandi. Emi kuttavacho memu chupisthamu.',
  'రీవేర్ (ReWear)': 'ReWear',
  'రీవేర్': 'ReWear',
  'రీవేర్ కి స్వాగతం': 'ReWear ki swagatham',
  'మీ భాషను ఎంచుకోండి': 'Mee bhashanu enchukondi',
  'హోమ్': 'Home',
  'ముక్కలు జోడించు': 'Mukkalu jodinchu',
  'నా బట్టల పోగు': 'Naa battala pogu',
  'కుట్టు చిట్కాలు': 'Kuttu chitkaalu',
  'బట్టల వ్యర్థాల పునర్వినియోగం': 'Battala vyarthala punar-viniyogam',
  'బట్ట స్వభావం మరియు టైలర్ సలహాలు': 'Batta swabhaavam mariyu tailor salahaalu',
  'నా బట్టల పోగు (My Pile)': 'Naa battala pogu',
  'మీ మిగిలిన బట్టల ముక్కలను చూపించండి. ఏమి కుట్టవచ్చో, ఎలా కనిపిస్తుందో, కొలతలతో సహా ఎలా కుట్టాలో మేము చూపిస్తాము.':
    'Mee migilina battala mukkalanu chupinchandi. Emi kuttavacho, ela kanipisthundo, kolathalatho saha ela kuttalo memu chupisthamu.',

  // Hindi Phrases
  'रीवेयर में आपका स्वागत है! बची हुई कतरनों से सुंदर और उपयोगी चीज़ें बनाएं।':
    'Hindi bhasha: ReWear mein aapka swagat hai! Bachi hui katranon se sundar aur upyogi cheezen banayein.',
  'रीवेयर (ReWear)': 'ReWear',
  'रीवेयर': 'ReWear',
  'रीवेयर में आपका स्वागत है': 'ReWear mein aapka swagat hai',
  'अपनी भाषा चुनें': 'Apni bhasha chunein',
  'होम': 'Home',
  'कतरन जोड़ें': 'Katran jodein',
  'कतरन का ढेर': 'Katran ka dher',
  'सिलाई टिप्स': 'Silai tips',
  'कतरन से नई चीज़ें': 'Katran se nayi cheezen',
  'कपड़े का एहसास और दर्जी सलाह': 'Kapde ka ehsaas aur darzi salah',
  'कतरनों का ढेर (My Pile)': 'Katranon ka dher',
  'अपनी बची हुई कतरनें दिखाइए। हम बताएंगे क्या बनाना है, कैसा दिखेगा और नाप के साथ कैसे सिलना है।':
    'Apni bachi hui katranen dikhaiye. Hum batayenge kya banana hai, kaisa dikhega aur naap ke saath kaise silna hai.',
};

export function transliterateIndic(text, lang) {
  if (!text) return '';
  let trimmed = text.trim();
  if (PHRASE_DICTIONARY[trimmed]) {
    return PHRASE_DICTIONARY[trimmed];
  }

  // Check if known phrase substring exists
  for (const [key, val] of Object.entries(PHRASE_DICTIONARY)) {
    if (trimmed.includes(key)) {
      trimmed = trimmed.replace(key, val);
    }
  }

  // Character level fallback
  let result = '';
  const map = lang === 'te' ? TELUGU_MAP : HINDI_MAP;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = char.charCodeAt(0);

    // If Telugu or Devanagari character
    if ((code >= 0x0c00 && code <= 0x0c7f) || (code >= 0x0900 && code <= 0x097f)) {
      if (map[char] !== undefined) {
        // If next char is a vowel sign (matra), strip default 'a'
        const nextChar = text[i + 1];
        const nextIsMatra = nextChar && (
          (nextChar.charCodeAt(0) >= 0x0c3e && nextChar.charCodeAt(0) <= 0x0c4c) ||
          (nextChar.charCodeAt(0) >= 0x093e && nextChar.charCodeAt(0) <= 0x094c)
        );
        let phoneme = map[char];
        if (nextIsMatra && phoneme.endsWith('a')) {
          phoneme = phoneme.slice(0, -1);
        }
        result += phoneme;
      }
    } else {
      result += char;
    }
  }

  return result.replace(/\s+/g, ' ').trim();
}
