/**
 * AstroSage Vedic Astrology Intelligence Engine
 * --------------------------------------------
 * A robust, deterministic, offline-first Vedic astrology calculation and interpretation engine.
 * Ensures the platform operates with 100% uptime even when external AI models, internet connections,
 * or third-party APIs are unavailable or rate-limited.
 */

export interface SeekerProfile {
  name: string;
  rashi: string;
  nakshatra: string;
  pada: string | number;
  birthDate?: string;
  birthTime?: string;
  language?: 'en' | 'kn';
}

interface RashiInfo {
  en: string;
  kn: string;
  lordEn: string;
  lordKn: string;
  elementEn: string;
  elementKn: string;
  luckyColorEn: string;
  luckyColorKn: string;
  gemstoneEn: string;
  gemstoneKn: string;
  deityEn: string;
  deityKn: string;
  strengthsEn: string;
  strengthsKn: string;
}

interface NakshatraInfo {
  en: string;
  kn: string;
  lordEn: string;
  lordKn: string;
  deityEn: string;
  deityKn: string;
  symbolEn: string;
  symbolKn: string;
  purposeEn: string;
  purposeKn: string;
  karmicEn: string;
  karmicKn: string;
}

export const RASHI_DATA: Record<string, RashiInfo> = {
  Mesha: {
    en: "Mesha (Aries)",
    kn: "ಮೇಷ",
    lordEn: "Mangala (Mars)",
    lordKn: "ಮಂಗಳ",
    elementEn: "Fire (Agni)",
    elementKn: "ಅಗ್ನಿ ತತ್ವ",
    luckyColorEn: "Crimson Red and Gold",
    luckyColorKn: "ಕೆಂಪು ಮತ್ತು ಸುವರ್ಣ",
    gemstoneEn: "Red Coral (Moonga)",
    gemstoneKn: "ಹವಳ",
    deityEn: "Lord Subrahmanya & Lord Narasimha",
    deityKn: "ಶ್ರೀ ಸುಬ್ರಹ್ಮಣ್ಯ ಸ್ವಾಮಿ ಮತ್ತು ನರಸಿಂಹ",
    strengthsEn: "Dynamic leadership, fearless courage, decisive pioneering spirit",
    strengthsKn: "ಧೈರ್ಯ, ನಾಯಕತ್ವದ ಗುಣ ಮತ್ತು ದೃಢ ಸಂಕಲ್ಪ"
  },
  Vrishabha: {
    en: "Vrishabha (Taurus)",
    kn: "ವೃಷಭ",
    lordEn: "Shukra (Venus)",
    lordKn: "ಶುಕ್ರ",
    elementEn: "Earth (Prithvi)",
    elementKn: "ಪೃಥ್ವಿ ತತ್ವ",
    luckyColorEn: "Silken White and Lotus Pink",
    luckyColorKn: "ಬಿಳಿ ಮತ್ತು ಗುಲಾಬಿ",
    gemstoneEn: "Diamond or White Sapphire",
    gemstoneKn: "ವಜ್ರ ಅಥವಾ ಬಿಳಿ ನೀಲಂ",
    deityEn: "Goddess Mahalakshmi",
    deityKn: "ಶ್ರೀ ಮಹಾಲಕ್ಷ್ಮಿ",
    strengthsEn: "Steadfast determination, aesthetic vision, material prosperity",
    strengthsKn: "ಶಾಂತಿ, ಸಹನೆ, ಸೌಂದರ್ಯ ಪ್ರಜ್ಞೆ ಮತ್ತು ಆರ್ಥಿಕ ಸ್ಥಿರತೆ"
  },
  Mithuna: {
    en: "Mithuna (Gemini)",
    kn: "ಮಿಥುನ",
    lordEn: "Budha (Mercury)",
    lordKn: "ಬುಧ",
    elementEn: "Air (Vayu)",
    elementKn: "ವಾಯು ತತ್ವ",
    luckyColorEn: "Emerald Green and Light Yellow",
    luckyColorKn: "ಹಸಿರು ಮತ್ತು ತಿಳಿ ಹಳದಿ",
    gemstoneEn: "Emerald (Panna)",
    gemstoneKn: "ಪಚ್ಚೆ",
    deityEn: "Lord Vishnu & Goddess Saraswati",
    deityKn: "ಶ್ರೀ ಮಹಾವಿಷ್ಣು ಮತ್ತು ಸರಸ್ವತಿ",
    strengthsEn: "Sharp intellect, eloquence, adaptive brilliance, trade acumen",
    strengthsKn: "ಚುರುಕಾದ ಬುದ್ಧಿಶಕ್ತಿ, ಸಂವಹನ ಕೌಶಲ್ಯ ಮತ್ತು ಜ್ಞಾನಾಸಕ್ತಿ"
  },
  Karka: {
    en: "Karka (Cancer)",
    kn: "ಕರ್ಕ",
    lordEn: "Chandra (Moon)",
    lordKn: "ಚಂದ್ರ",
    elementEn: "Water (Jala)",
    elementKn: "ಜಲ ತತ್ವ",
    luckyColorEn: "Pearl White and Silver",
    luckyColorKn: "ಮುತ್ತಿನ ಬಿಳಿ ಮತ್ತು ಬೆಳ್ಳಿ ಬಣ್ಣ",
    gemstoneEn: "Natural Pearl (Mukta)",
    gemstoneKn: "ಮುತ್ತು",
    deityEn: "Lord Shiva (Chandrashekhara)",
    deityKn: "ಶ್ರೀ ಚಂದ್ರಮೌಳೀಶ್ವರ",
    strengthsEn: "Deep intuitive wisdom, nurturing grace, profound emotional depth",
    strengthsKn: "ಪರಾನುಭೂತಿ, ಆಂತರಿಕ ಅಂತಃಪ್ರಜ್ಞೆ ಮತ್ತು ವಾತ್ಸಲ್ಯ"
  },
  Simha: {
    en: "Simha (Leo)",
    kn: "ಸಿಂಹ",
    lordEn: "Surya (Sun)",
    lordKn: "ಸೂರ್ಯ",
    elementEn: "Fire (Agni)",
    elementKn: "ಅಗ್ನಿ ತತ್ವ",
    luckyColorEn: "Royal Gold and Amber Orange",
    luckyColorKn: "ಬಂಗಾರದ ಹಳದಿ ಮತ್ತು ಕೇಸರಿ",
    gemstoneEn: "Ruby (Manikya)",
    gemstoneKn: "ಮಾಣಿಕ್ಯ",
    deityEn: "Lord Surya Narayana & Lord Shiva",
    deityKn: "ಶ್ರೀ ಸೂರ್ಯ ನಾರಾಯಣ",
    strengthsEn: "Radiant authority, generous spirit, unwavering dignity",
    strengthsKn: "ರಾಜಸಿಕ ತೇಜಸ್ಸು, ನಾಯಕತ್ವ ಮತ್ತು ಆತ್ಮವಿಶ್ವಾಸ"
  },
  Kanya: {
    en: "Kanya (Virgo)",
    kn: "ಕನ್ಯಾ",
    lordEn: "Budha (Mercury)",
    lordKn: "ಬುಧ",
    elementEn: "Earth (Prithvi)",
    elementKn: "ಪೃಥ್ವಿ ತತ್ವ",
    luckyColorEn: "Forest Green and Champagne",
    luckyColorKn: "ಗಾಢ ಹಸಿರು ಮತ್ತು ನಸುಹಳದಿ",
    gemstoneEn: "Emerald or Green Tourmaline",
    gemstoneKn: "ಪಚ್ಚೆ",
    deityEn: "Goddess Saraswati",
    deityKn: "ಜ್ಞಾನದೇವತೆ ಸರಸ್ವತಿ",
    strengthsEn: "Meticulous analytical clarity, healing service, precision",
    strengthsKn: "ವಿಶ್ಲೇಷಣಾತ್ಮಕ ಬುದ್ಧಿ, ನಿಖರತೆ ಮತ್ತು ಸೇವಾ ಮನೋಭಾವ"
  },
  Tula: {
    en: "Tula (Libra)",
    kn: "ತುಲಾ",
    lordEn: "Shukra (Venus)",
    lordKn: "ಶುಕ್ರ",
    elementEn: "Air (Vayu)",
    elementKn: "ವಾಯು ತತ್ವ",
    luckyColorEn: "Pastel Blue and Crystal White",
    luckyColorKn: "ತಿಳಿ ನೀಲಿ ಮತ್ತು ಶುಭ್ರ ಬಿಳಿ",
    gemstoneEn: "Diamond or White Zircon",
    gemstoneKn: "ವಜ್ರ ಅಥವಾ ಜಿರ್ಕಾನ್",
    deityEn: "Goddess Lakshmi & Radha Rani",
    deityKn: "ಶ್ರೀ ಮಹಾಲಕ್ಷ್ಮಿ",
    strengthsEn: "Harmonious equilibrium, diplomatic finesse, righteous fairness",
    strengthsKn: "ಸಮತೋಲನ, ನ್ಯಾಯಪರತೆ ಮತ್ತು ಸೌಹಾರ್ದತೆ"
  },
  Vrishchika: {
    en: "Vrishchika (Scorpio)",
    kn: "ವೃಶ್ಚಿಕ",
    lordEn: "Mangala & Ketu",
    lordKn: "ಮಂಗಳ ಮತ್ತು ಕೇತು",
    elementEn: "Water (Jala)",
    elementKn: "ಜಲ ತತ್ವ",
    luckyColorEn: "Deep Maroon and Rust Orange",
    luckyColorKn: "ಕಡು ಕೆಂಪು ಮತ್ತು ಕೇಸರಿ",
    gemstoneEn: "Red Coral or Cat's Eye",
    gemstoneKn: "ಕೆಂಪು ಹವಳ ಅಥವಾ ವೈಡೂರ್ಯ",
    deityEn: "Lord Kartikeya & Lord Hanuman",
    deityKn: "ಶ್ರೀ ಸುಬ್ರಹ್ಮಣ್ಯ ಮತ್ತು ಆಂಜನೇಯ",
    strengthsEn: "Mystic perception, transformative resilience, steadfast secrecy",
    strengthsKn: "ಆಧ್ಯಾತ್ಮಿಕ ಶಕ್ತಿ, ನಿಗೂಢ ಒಳನೋಟ ಮತ್ತು ಅಪಾರ ದೃಢತೆ"
  },
  Dhanu: {
    en: "Dhanu (Sagittarius)",
    kn: "ಧನುಸ್ಸು",
    lordEn: "Guru (Jupiter)",
    lordKn: "ಗುರು (ಬೃಹಸ್ಪತಿ)",
    elementEn: "Fire (Agni)",
    elementKn: "ಅಗ್ನಿ ತತ್ವ",
    luckyColorEn: "Saffron Gold and Radiant Yellow",
    luckyColorKn: "ಹಳದಿ ಮತ್ತು ಕೇಸರಿ",
    gemstoneEn: "Yellow Sapphire (Pushparaga)",
    gemstoneKn: "ಪುಷ್ಯರಾಗ",
    deityEn: "Lord Vishnu (Hayagriva)",
    deityKn: "ಶ್ರೀ ಹಯಗ್ರೀವ ಮತ್ತು ಗುರು ರಾಘವೇಂದ್ರ",
    strengthsEn: "Philosophical wisdom, optimistic dharma, visionary exploration",
    strengthsKn: "ಧಾರ್ಮಿಕ ಜ್ಞಾನ, ವಿಶಾಲ ಮನೋಭಾವ ಮತ್ತು ಮಾರ್ಗದರ್ಶಕ ಗುಣ"
  },
  Makara: {
    en: "Makara (Capricorn)",
    kn: "ಮಕರ",
    lordEn: "Shani (Saturn)",
    lordKn: "ಶನಿ ಮಹಾರಾಜ",
    elementEn: "Earth (Prithvi)",
    elementKn: "ಪೃಥ್ವಿ ತತ್ವ",
    luckyColorEn: "Midnight Navy and Charcoal",
    luckyColorKn: "ನೀಲಿ ಮತ್ತು ಕಪ್ಪು",
    gemstoneEn: "Blue Sapphire (Neelam) or Amethyst",
    gemstoneKn: "ಇಂದ್ರನೀಲ ಅಥವಾ ಜಾಂಬವಂತ",
    deityEn: "Lord Shiva & Lord Hanuman",
    deityKn: "ಶ್ರೀ ಪರಮೇಶ್ವರ ಮತ್ತು ಆಂಜನೇಯ",
    strengthsEn: "Iron discipline, enduring perseverance, structural mastery",
    strengthsKn: "ಕಠಿಣ ಪರಿಶ್ರಮ, ಶಿಸ್ತು, ಕರ್ತವ್ಯನಿಷ್ಠೆ ಮತ್ತು ತಾಳ್ಮೆ"
  },
  Kumbha: {
    en: "Kumbha (Aquarius)",
    kn: "ಕುಂಭ",
    lordEn: "Shani & Rahu",
    lordKn: "ಶನಿ ಮತ್ತು ರಾಹು",
    elementEn: "Air (Vayu)",
    elementKn: "ವಾಯು ತತ್ವ",
    luckyColorEn: "Electric Blue and Purple",
    luckyColorKn: "ವಿದ್ಯುತ್ ನೀಲಿ ಮತ್ತು ನೇರಳೆ",
    gemstoneEn: "Blue Sapphire or Gomedha",
    gemstoneKn: "ನೀಲಂ ಅಥವಾ ಗೋಮೇಧಿಕ",
    deityEn: "Lord Rudra & Lord Kalabhairava",
    deityKn: "ಶ್ರೀ ಕಾಲಭೈರವ ಮತ್ತು ಶಿವ",
    strengthsEn: "Humanitarian vision, inventive foresight, cosmic perspective",
    strengthsKn: "ಹೊಸತನ, ಸಮಾಜಮುಖಿ ಚಿಂತನೆ ಮತ್ತು ಸ್ವತಂತ್ರ ವಿಚಾರಶಕ್ತಿ"
  },
  Meena: {
    en: "Meena (Pisces)",
    kn: "ಮೀನ",
    lordEn: "Guru (Jupiter)",
    lordKn: "ಗುರು (ಬೃಹಸ್ಪತಿ)",
    elementEn: "Water (Jala)",
    elementKn: "ಜಲ ತತ್ವ",
    luckyColorEn: "Golden Yellow and Sea Foam Green",
    luckyColorKn: "ಚಿನ್ನದ ಹಳದಿ ಮತ್ತು ಹಾಲಿನ ಬಿಳಿ",
    gemstoneEn: "Yellow Sapphire (Pushparaga)",
    gemstoneKn: "ಪುಷ್ಯರಾಗ",
    deityEn: "Lord Vishnu (Matsya Avatar) & Dakshinamurthy",
    deityKn: "ಶ್ರೀ ಮಹಾವಿಷ್ಣು ಮತ್ತು ದಕ್ಷಿಣಾಮೂರ್ತಿ",
    strengthsEn: "Spiritual transcendence, boundless compassion, artistic depth",
    strengthsKn: "ಕರುಣೆ, ಧ್ಯಾನಶೀಲತೆ, ಕಲ್ಪನಾಶಕ್ತಿ ಮತ್ತು ಮೋಕ್ಷದ ಹಂಬಲ"
  }
};

export const NAKSHATRA_DATA: Record<string, NakshatraInfo> = {
  Ashwini: {
    en: "Ashwini",
    kn: "ಅಶ್ವಿನಿ",
    lordEn: "Ketu",
    lordKn: "ಕೇತು",
    deityEn: "Ashwini Kumaras (Divine Healers)",
    deityKn: "ಅಶ್ವಿನಿ ಕುಮಾರರು",
    symbolEn: "Horse's Head (Swift Vitality)",
    symbolKn: "ಕುದುರೆಯ ಮುಖ (ವೇಗ ಮತ್ತು ಚೈತನ್ಯ)",
    purposeEn: "Initiating breakthroughs, miraculous healing, and rapid spiritual elevation.",
    purposeKn: "ಹೊಸ ಆರಂಭ, ರೋಗ ನಿವಾರಣೆ ಮತ್ತು ಚುರುಕಾದ ಸಾಧನೆ.",
    karmicEn: "Resolving impatience from previous incarnations; cultivating steady endurance.",
    karmicKn: "ಹಿಂದಿನ ಜನ್ಮದ ಆತುರವನ್ನು ಸಮಚಿತ್ತದಿಂದ ಗೆದ್ದು ಸತ್ಕರ್ಮ ಸಾಧಿಸುವುದು."
  },
  Bharani: {
    en: "Bharani",
    kn: "ಭರಣಿ",
    lordEn: "Shukra (Venus)",
    lordKn: "ಶುಕ್ರ",
    deityEn: "Lord Yama (God of Truth & Dharma)",
    deityKn: "ಯಮಧರ್ಮರಾಜ",
    symbolEn: "Yoni / Vessel of Creation",
    symbolKn: "ಸೃಷ್ಟಿಯ ಪಾತ್ರೆ",
    purposeEn: "Transforming intense desires into refined creative mastery and spiritual rebirth.",
    purposeKn: "ತೀವ್ರ ಆಕಾಂಕ್ಷೆಗಳನ್ನು ಸೃಜನಶೀಲ ಸಾಧನೆಯನ್ನಾಗಿ ಪರಿವರ್ತಿಸುವುದು.",
    karmicEn: "Mastering the cycle of attachment and surrender without lingering grief.",
    karmicKn: "ಮೋಹವನ್ನು ತ್ಯಜಿಸಿ ಸತ್ಯಧರ್ಮವನ್ನು ಅರಿತುಕೊಳ್ಳುವುದು."
  },
  Krittika: {
    en: "Krittika",
    kn: "ಕೃತಿಕಾ",
    lordEn: "Surya (Sun)",
    lordKn: "ಸೂರ್ಯ",
    deityEn: "Lord Agni (Sacred Fire)",
    deityKn: "ಅಗ್ನಿದೇವ",
    symbolEn: "Razor / Flame",
    symbolKn: "ಜ್ವಾಲೆ / ಖಡ್ಗ",
    purposeEn: "Purifying negativity, cutting through illusions, and upholding righteous warmth.",
    purposeKn: "ಅಜ್ಞಾನವನ್ನು ಸುಟ್ಟು ಜ್ಞಾನದ ಬೆಳಕನ್ನು ಪಸರಿಸುವುದು.",
    karmicEn: "Channeling fiery indignation into constructive leadership and protective warmth.",
    karmicKn: "ಕೋಪವನ್ನು ನಿಯಂತ್ರಿಸಿ ಧರ್ಮ ರಕ್ಷಣೆಗೆ ಬಳಸಿಕೊಳ್ಳುವುದು."
  },
  Rohini: {
    en: "Rohini",
    kn: "ರೋಹಿಣಿ",
    lordEn: "Chandra (Moon)",
    lordKn: "ಚಂದ್ರ",
    deityEn: "Lord Brahma (Creator)",
    deityKn: "ಬ್ರಹ್ಮದೇವ",
    symbolEn: "Chariot / Banyan Tree",
    symbolKn: "ರಥ / ಆಲದ ಮರ",
    purposeEn: "Cultivating beauty, abundance, agricultural/creative fruition, and graceful charm.",
    purposeKn: "ಸೌಂದರ್ಯ, ಕಲೆ, ಸಮೃದ್ಧಿ ಮತ್ತು ಆಕರ್ಷಕ ವ್ಯಕ್ತಿತ್ವ ಬೆಳೆಸುವುದು.",
    karmicEn: "Balancing the pursuit of material luxuries with devotion to the Eternal Soul.",
    karmicKn: "ಭೌತಿಕ ಭೋಗಗಳ ಜೊತೆಗೆ ಅಧ್ಯಾತ್ಮಿಕ ತೃಪ್ತಿಯನ್ನು ಪಡೆಯುವುದು."
  },
  Mrigashira: {
    en: "Mrigashira",
    kn: "ಮೃಗಶಿರ",
    lordEn: "Mangala (Mars)",
    lordKn: "ಮಂಗಳ",
    deityEn: "Soma (Moon God / Nectar)",
    deityKn: "ಸೋಮದೇವ",
    symbolEn: "Deer's Head",
    symbolKn: "ಜಿಂಕೆಯ ಮುಖ",
    purposeEn: "Relentless quest for supreme truth, wisdom research, and harmonious travel.",
    purposeKn: "ಸತ್ಯದ ಅನ್ವೇಷಣೆ, ಸಂಶೋಧನೆ ಮತ್ತು ನಿರಂತರ ಜ್ಞಾನಾರ್ಜನೆ.",
    karmicEn: "Quieting restless mental wandering by finding the divine sanctuary within.",
    karmicKn: "ಮನಸ್ಸಿನ ಚಂಚಲತೆಯನ್ನು ಧ್ಯಾನದಿಂದ ಶಾಂತಗೊಳಿಸುವುದು."
  },
  Ardra: {
    en: "Ardra",
    kn: "ಆರ್ದ್ರಾ",
    lordEn: "Rahu",
    lordKn: "ರಾಹು",
    deityEn: "Rudra (Lord of Storms & Transformation)",
    deityKn: "ರುದ್ರದೇವ",
    symbolEn: "Teardrop / Diamond",
    symbolKn: "ಕಣ್ಣೀರ ಹನಿ / ವಜ್ರ",
    purposeEn: "Enduring cosmic storms to emerge with diamond clarity and unshakeable resilience.",
    purposeKn: "ಸಂಕಷ್ಟಗಳನ್ನು ಎದುರಿಸಿ ಬಲವಾದ ಆತ್ಮಶಕ್ತಿಯನ್ನು ಹೊಂದುವುದು.",
    karmicEn: "Dissolving deep sorrow into profound universal empathy and breakthrough insights.",
    karmicKn: "ಭಾವನಾತ್ಮಕ ನೋವನ್ನು ಮಹಾನ್ ಜ್ಞಾನವನ್ನಾಗಿ ಪರಿವರ್ತಿಸುವುದು."
  },
  Punarvasu: {
    en: "Punarvasu",
    kn: "ಪುನರ್ವಸು",
    lordEn: "Guru (Jupiter)",
    lordKn: "ಗುರು",
    deityEn: "Goddess Aditi (Mother of the Cosmos)",
    deityKn: "ಅದಿತಿ ದೇವಿ",
    symbolEn: "Quiver of Arrows",
    symbolKn: "ಬತ್ತಳಿಕೆ",
    purposeEn: "Renewal, second chances, returning home to virtue, and boundless benevolence.",
    purposeKn: "ಪುನರುತ್ಥಾನ, ಸದ್ಗುಣಗಳ ಬೆಳವಣಿಗೆ ಮತ್ತು ಎಲ್ಲರಿಗೂ ಒಳಿತನ್ನು ಮಾಡುವುದು.",
    karmicEn: "Rebuilding prosperity after trials, maintaining eternal faith in divine justice.",
    karmicKn: "ಸೋಲಿನಲ್ಲೂ ಧೃತಿಗೆಡದೆ ಸನ್ಮಾರ್ಗದಲ್ಲಿ ಮುನ್ನಡೆಯುವುದು."
  },
  Pushya: {
    en: "Pushya",
    kn: "ಪುಷ್ಯ",
    lordEn: "Shani (Saturn)",
    lordKn: "ಶನಿ",
    deityEn: "Brihaspati (Guru of the Devas)",
    deityKn: "ಬೃಹಸ್ಪತಿ",
    symbolEn: "Lotus Flower / Cow's Udder",
    symbolKn: "ಕಮಲ / ಕಾಮಧೇನು",
    purposeEn: "Nourishing souls, spiritual mentorship, steadfast dharma, and divine sanctity.",
    purposeKn: "ಆಧ್ಯಾತ್ಮಿಕ ಪೋಷಣೆ, ಧಾರ್ಮಿಕ ನಿಷ್ಠೆ ಮತ್ತು ಜ್ಞಾನ ದಾನ.",
    karmicEn: "Fulfilling societal responsibilities with pure devotion and selfless duty.",
    karmicKn: "ನಿಸ್ವಾರ್ಥ ಸೇವೆ ಮತ್ತು ಗುರು-ಹಿರಿಯರ ಆಶೀರ್ವಾದ ಪಡೆಯುವುದು."
  },
  Ashlesha: {
    en: "Ashlesha",
    kn: "ಆಶ್ಲೇಷ",
    lordEn: "Budha (Mercury)",
    lordKn: "ಬುಧ",
    deityEn: "Nagas (Serpent Deities)",
    deityKn: "ನಾಗದೇವತೆಗಳು",
    symbolEn: "Coiled Serpent",
    symbolKn: "ಸುರುಳಿ ಸುತ್ತಿದ ಸರ್ಪ",
    purposeEn: "Mastery over Kundalini energy, deep occult insight, and strategic self-defense.",
    purposeKn: "ಕುಂಡಲಿನೀ ಜಾಗೃತಿ, ನಿಗೂಢ ಜ್ಞಾನ ಮತ್ತು ರಹಸ್ಯ ಸಾಮರ್ಥ್ಯ.",
    karmicEn: "Transforming poisonous suspicion into luminous yogic wisdom.",
    karmicKn: "ಅನುಮಾನ ಮತ್ತು ಭಯವನ್ನು ಗೆದ್ದು ಭಕ್ತಿಯನ್ನು ಸಾಧಿಸುವುದು."
  },
  Magha: {
    en: "Magha",
    kn: "ಮಘಾ",
    lordEn: "Ketu",
    lordKn: "ಕೇತು",
    deityEn: "Pitris (Ancestral Lineage)",
    deityKn: "ಪಿತೃ ದೇವತೆಗಳು",
    symbolEn: "Throne / Royal Palanquin",
    symbolKn: "ರಾಜ ಸಿಂಹಾಸನ",
    purposeEn: "Honoring ancestral lineage, carrying noble authority, and upholding traditional honor.",
    purposeKn: "ಪಿತೃಗಳ ಆಶೀರ್ವಾದ, ರಾಜಮರ್ಯಾದೆ ಮತ್ತು ಸಂಪ್ರದಾಯ ರಕ್ಷಣೆ.",
    karmicEn: "Shedding false pride while respectfully serving family and spiritual lineage.",
    karmicKn: "ಅಹಂಕಾರವನ್ನು ತ್ಯಜಿಸಿ ವಿನಯದಿಂದ ಮುನ್ನಡೆಯುವುದು."
  },
  "P.Phalguni": {
    en: "Purva Phalguni",
    kn: "ಪೂರ್ವ ಫಲ್ಗುಣಿ",
    lordEn: "Shukra (Venus)",
    lordKn: "ಶುಕ್ರ",
    deityEn: "Bhaga (God of Fortune & Matrimony)",
    deityKn: "ಭಾಗ್ಯದೇವ",
    symbolEn: "Front Legs of Couch / Hammock",
    symbolKn: "ವಿಶ್ರಾಂತಿ ಆಸನ",
    purposeEn: "Celebrating romantic bliss, artistic harmony, festive joy, and generous hospitality.",
    purposeKn: "ಕಲಾತ್ಮಕ ಸಂತೋಷ, ದಾಂಪತ್ಯ ಸುಖ ಮತ್ತು ಆತಿಥ್ಯ.",
    karmicEn: "Channeling sensual cravings into pure divine adoration and joyful generosity.",
    karmicKn: "ಭೋಗವನ್ನು ಯೋಗವನ್ನಾಗಿ ಮಾರ್ಪಡಿಸುವುದು."
  },
  "U.Phalguni": {
    en: "Uttara Phalguni",
    kn: "ಉತ್ತರ ಫಲ್ಗುಣಿ",
    lordEn: "Surya (Sun)",
    lordKn: "ಸೂರ್ಯ",
    deityEn: "Aryaman (God of Contracts & Friendship)",
    deityKn: "ಅರ್ಯಮನ್ ದೇವ",
    symbolEn: "Back Legs of Couch",
    symbolKn: "ಸ್ಥಿರ ಆಸನ",
    purposeEn: "Honorable partnerships, noble leadership, public philanthropy, and loyal duty.",
    purposeKn: "ಸತ್ಯನಿಷ್ಠ ಪಾಲುದಾರಿಕೆ, ಸಮಾಜ ಸೇವೆ ಮತ್ತು ಪ್ರಾಮಾಣಿಕ ನಾಯಕತ್ವ.",
    karmicEn: "Upholding sacred vows through every testing trial of life.",
    karmicKn: "ಕೊಟ್ಟ ಮಾತನ್ನು ಉಳಿಸಿಕೊಂಡು ಧರ್ಮ ಮಾರ್ಗದಲ್ಲಿ ಸಾಗುವುದು."
  },
  Hasta: {
    en: "Hasta",
    kn: "ಹಸ್ತ",
    lordEn: "Chandra (Moon)",
    lordKn: "ಚಂದ್ರ",
    deityEn: "Savitri (Sun God of Dawn Awakening)",
    deityKn: "ಸವಿತೃ ದೇವ",
    symbolEn: "Open Palm / Hand of Blessing",
    symbolKn: "ಅಭಯ ಹಸ್ತ",
    purposeEn: "Artisanal mastery, healing touch, magical craftsmanship, and swift manifesting power.",
    purposeKn: "ಕೈಚಳಕ, ವಾಸ್ತು-ಶಿಲ್ಪ, ವಾಣಿಜ್ಯ ಮತ್ತು ವೈದ್ಯಕೀಯ ಜ್ಞಾನ.",
    karmicEn: "Using skillful hands only for selfless blessings and honest prosperity.",
    karmicKn: "ಪ್ರಾಮಾಣಿಕ ದುಡಿಮೆಯಿಂದ ಸಮಾಜಕ್ಕೆ ಒಳಿತು ಮಾಡುವುದು."
  },
  Chitra: {
    en: "Chitra",
    kn: "ಚಿತ್ತಾ",
    lordEn: "Mangala (Mars)",
    lordKn: "ಮಂಗಳ",
    deityEn: "Tvashtar / Vishwakarma (Cosmic Architect)",
    deityKn: "ವಿಶ್ವಕರ್ಮ",
    symbolEn: "Gleaming Jewel / Pearl",
    symbolKn: "ಹೊಳೆಯುವ ರತ್ನ",
    purposeEn: "Creating brilliant architectural wonders, aesthetic designs, and vibrant creations.",
    purposeKn: "ಅದ್ಭುತ ಸೃಷ್ಟಿ, ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ಕಲಾ ವೈಭವ.",
    karmicEn: "Seeing divine beauty beneath superficial forms and transient illusions.",
    karmicKn: "ಬಾಹ್ಯ ಸೌಂದರ್ಯಕ್ಕಿಂತ ಆಂತರಿಕ ಸತ್ಯವನ್ನು ಗುರುತಿಸುವುದು."
  },
  Swati: {
    en: "Swati",
    kn: "ಸ್ವಾತಿ",
    lordEn: "Rahu",
    lordKn: "ರಾಹು",
    deityEn: "Vayu (God of Wind & Prana)",
    deityKn: "ವಾಯುದೇವ",
    symbolEn: "Young Shoot in the Breeze / Coral",
    symbolKn: "ಗಾಳಿಯಲ್ಲಿ ತೂಗುವ ಚಿಗುರು",
    purposeEn: "Independence, flexible diplomacy, commercial trading, and yogic breath mastery.",
    purposeKn: "ಸ್ವತಂತ್ರ ಮನೋಭಾವ, ವ್ಯಾಪಾರ ಕೌಶಲ್ಯ ಮತ್ತು ಹೊಂದಾಣಿಕೆಯ ಗುಣ.",
    karmicEn: "Remaining deeply rooted in divine faith while blowing freely in life's winds.",
    karmicKn: "ಕಷ್ಟದ ಸಮಯದಲ್ಲೂ ಸ್ಥಿರವಾಗಿ ನಿಲ್ಲುವ ಶಕ್ತಿಯನ್ನು ಬೆಳೆಸಿಕೊಳ್ಳುವುದು."
  },
  Vishakha: {
    en: "Vishakha",
    kn: "ವಿಶಾಖ",
    lordEn: "Guru (Jupiter)",
    lordKn: "ಗುರು",
    deityEn: "Indra & Agni (Triumphant Power & Sacred Flame)",
    deityKn: "ಇಂದ್ರ ಮತ್ತು ಅಗ್ನಿ",
    symbolEn: "Triumphal Arch / Potter's Wheel",
    symbolKn: "ವಿಜಯ ತೋರಣ",
    purposeEn: "Single-minded focus, ultimate victory, achieving grand milestones against all odds.",
    purposeKn: "ದೃಢ ಗುರಿ, ಕಠಿಣ ಪರಿಶ್ರಮ ಮತ್ತು ಅಂತಿಮ ವಿಜಯ.",
    karmicEn: "Directing intense ambition toward righteous, universal welfare rather than ego.",
    karmicKn: "ಸ್ವಾರ್ಥವನ್ನು ಮರೆತು ಲೋಕ ಕಲ್ಯಾಣಕ್ಕಾಗಿ ಶ್ರಮಿಸುವುದು."
  },
  Anuradha: {
    en: "Anuradha",
    kn: "ಅನುರಾಧ",
    lordEn: "Shani (Saturn)",
    lordKn: "ಶನಿ",
    deityEn: "Mitra (God of Friendship & Cosmic Order)",
    deityKn: "ಮಿತ್ರ ದೇವ",
    symbolEn: "Staff / Lotus Triumphant in Mud",
    symbolKn: "ಕಮಲದ ಹೂವು / ದಂಡ",
    purposeEn: "Devotional loyalty, foreign success, deep fellowship, and spiritual illumination.",
    purposeKn: "ನಿಷ್ಠಾವಂತ ಸ್ನೇಹ, ವಿದೇಶ ಯಾನ ಮತ್ತು ಭಕ್ತಿ ಮಾರ್ಗ.",
    karmicEn: "Blooming radiantly in challenging circumstances through unwavering love.",
    karmicKn: "ಸಂಕಷ್ಟದಲ್ಲೂ ಪ್ರೀತಿ ಮತ್ತು ಭಕ್ತಿಯಿಂದ ಅರಳುವ ಸಾಮರ್ಥ್ಯ."
  },
  Jyeshtha: {
    en: "Jyeshtha",
    kn: "ಜ್ಯೇಷ್ಠ",
    lordEn: "Budha (Mercury)",
    lordKn: "ಬುಧ",
    deityEn: "Indra (King of the Gods)",
    deityKn: "ದೇವೇಂದ್ರ",
    symbolEn: "Circular Amulet / Umbrella of Protection",
    symbolKn: "ರಕ್ಷಣಾ ಛತ್ರಿ / ರಕ್ಷಾಸೂತ್ರ",
    purposeEn: "Seniority, protecting the vulnerable, commanding leadership, and esoteric mastery.",
    purposeKn: "ನಾಯಕತ್ವ, ದುರ್ಬಲರ ರಕ್ಷಣೆ ಮತ್ತು ಶ್ರೇಷ್ಠತೆಯ ಸಾಧನೆ.",
    karmicEn: "Guarding against jealousy; using seniority solely to shield others.",
    karmicKn: "ಅಸೂಯೆಯನ್ನು ತ್ಯಜಿಸಿ ಎಲ್ಲರಿಗೂ ಮಾರ್ಗದರ್ಶನ ನೀಡುವುದು."
  },
  Mula: {
    en: "Mula",
    kn: "ಮೂಲಾ",
    lordEn: "Ketu",
    lordKn: "ಕೇತು",
    deityEn: "Nirriti (Goddess of Dissolution & Liberation)",
    deityKn: "ನಿರೃತಿ ದೇವಿ",
    symbolEn: "Tied Bundle of Roots",
    symbolKn: "ಬೇರುಗಳ ಕಟ್ಟು",
    purposeEn: "Digging to the root origin of existence, spiritual dismantling, and absolute liberation.",
    purposeKn: "ಮೂಲ ಸತ್ಯದ ಶೋಧನೆ ಮತ್ತು ಮೋಕ್ಷ ಸಾಧನೆ.",
    karmicEn: "Accepting profound life transformations as divine purification for higher spiritual ascension.",
    karmicKn: "ಪ್ರಾಪಂಚಿಕ ಮೋಹವನ್ನು ಕಡಿದು ಆಧ್ಯಾತ್ಮಿಕ ಎತ್ತರಕ್ಕೆ ಏರುವುದು."
  },
  "P.Ashadha": {
    en: "Purva Ashadha",
    kn: "ಪೂರ್ವ ಆಷಾಢ",
    lordEn: "Shukra (Venus)",
    lordKn: "ಶುಕ್ರ",
    deityEn: "Apas (Sacred Water Goddess)",
    deityKn: "ವರುಣ / ಆಪಸ್ ದೇವಿ",
    symbolEn: "Elephant's Tusk / Winnowing Basket",
    symbolKn: "ಆನೆಯ ದಂತ",
    purposeEn: "Invincible conviction, spreading joy like water, cleansing impurity, and triumphant charisma.",
    purposeKn: "ಅಪಾರ ನಂಬಿಕೆ, ಶುದ್ಧೀಕರಣ ಮತ್ತು ಅದ್ಭುತ ಆಕರ್ಷಣೆ.",
    karmicEn: "Remaining humble during victories; knowing all blessings flow from divine grace.",
    karmicKn: "ಗೆಲುವಿನಲ್ಲೂ ವಿನಯವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳುವುದು."
  },
  "U.Ashadha": {
    en: "Uttara Ashadha",
    kn: "ಉತ್ತರ ಆಷಾಢ",
    lordEn: "Surya (Sun)",
    lordKn: "ಸೂರ್ಯ",
    deityEn: "Vishwa Devas (Universal Cosmic Principles)",
    deityKn: "ವಿಶ್ವದೇವತೆಗಳು",
    symbolEn: "Small Bed / Elephant Tusk",
    symbolKn: "ಆನೆಯ ದಂತ",
    purposeEn: "Universal truth, everlasting victories, righteous governance, and supreme integrity.",
    purposeKn: "ಶಾಶ್ವತ ವಿಜಯ, ಸತ್ಯನಿಷ್ಠೆ ಮತ್ತು ಧರ್ಮ ಪರಿಪಾಲನೆ.",
    karmicEn: "Fighting relentlessly for noble causes that outlive one's mortal existence.",
    karmicKn: "ಶಾಶ್ವತ ಮೌಲ್ಯಗಳಿಗಾಗಿ ಶ್ರಮಿಸಿ ಕೀರ್ತಿ ಗಳಿಸುವುದು."
  },
  Shravana: {
    en: "Shravana",
    kn: "ಶ್ರವಣ",
    lordEn: "Chandra (Moon)",
    lordKn: "ಚಂದ್ರ",
    deityEn: "Lord Vishnu (Preserver of the Universe)",
    deityKn: "ಶ್ರೀ ಮಹಾವಿಷ್ಣು",
    symbolEn: "Three Footprints / Ear of Wisdom",
    symbolKn: "ಕಿವಿಯ ಗುರುತು / ವಿಷ್ಣುಪಾದ",
    purposeEn: "Sacred listening, oral tradition wisdom, profound learning, and cosmic preservation.",
    purposeKn: "ಶ್ರವಣ ಭಕ್ತಿ, ಉತ್ತಮ ಶಿಕ್ಷಣ ಮತ್ತು ವೇದ ಜ್ಞಾನಾರ್ಜನೆ.",
    karmicEn: "Listening before judging; transmitting eternal truths to subsequent generations.",
    karmicKn: "ಸತ್ಯವನ್ನು ಆಲಿಸಿ ಸಮಾಜಕ್ಕೆ ಸನ್ಮಾರ್ಗ ತೋರಿಸುವುದು."
  },
  Dhanishta: {
    en: "Dhanishta",
    kn: "ಧನಿಷ್ಠ",
    lordEn: "Mangala (Mars)",
    lordKn: "ಮಂಗಳ",
    deityEn: "Ashta Vasus (Eight Gods of Abundance)",
    deityKn: "ಅಷ್ಟ ವಸುಗಳು",
    symbolEn: "Musical Drum (Damaru) / Flute",
    symbolKn: "ಡಮರುಗ / ಕೊಳಲು",
    purposeEn: "Rhythmic prosperity, musical excellence, fame, universal wealth, and heroic bravery.",
    purposeKn: "ಸಂಗೀತ, ಅಪಾರ ಸಂಪತ್ತು, ಕೀರ್ತಿ ಮತ್ತು ಸಾಹಸ.",
    karmicEn: "Sharing abundant riches with the needy without attachment to praise.",
    karmicKn: "ಸಂಪತ್ತನ್ನು ಸತ್ಕಾರ್ಯಗಳಿಗೆ ವಿನಿಯೋಗಿಸುವುದು."
  },
  Shatabhisha: {
    en: "Shatabhisha",
    kn: "ಶತಭಿಷ",
    lordEn: "Rahu",
    lordKn: "ರಾಹು",
    deityEn: "Varuna (Cosmic Ocean & Mystic Law)",
    deityKn: "ವರುಣದೇವ",
    symbolEn: "Empty Circle / Hundred Healers",
    symbolKn: "ಶೂನ್ಯ ವೃತ್ತ / ನೂರು ವೈದ್ಯರು",
    purposeEn: "Mystic herbal medicine, deep solitude, unraveling cosmic secrets, and spiritual containment.",
    purposeKn: "ಔಷಧಿ ಜ್ಞಾನ, ಯೋಗ ಚಿಕಿತ್ಸೆ ಮತ್ತು ನಿಗೂಢ ರಹಸ್ಯಗಳ ಭೇದನೆ.",
    karmicEn: "Transforming isolation into radiant healing sanctuary for all living beings.",
    karmicKn: "ಏಕಾಂತವನ್ನು ಧ್ಯಾನಕ್ಕೆ ಬಳಸಿ ಲೋಕಕ್ಕೆ ಚಿಕಿತ್ಸೆ ನೀಡುವುದು."
  },
  "P.Bhadrapada": {
    en: "Purva Bhadrapada",
    kn: "ಪೂರ್ವ ಭಾದ್ರಪದ",
    lordEn: "Guru (Jupiter)",
    lordKn: "ಗುರು",
    deityEn: "Aja Ekapada (One-Footed Cosmic Serpent of Fire)",
    deityKn: "ಅಜೈಕಪಾದ ರುದ್ರ",
    symbolEn: "Front of Funeral Cot / Two-Faced Man",
    symbolKn: "ತಪಸ್ಸಿನ ಆಸನ",
    purposeEn: "Intense tapasya, fiery spiritual transformation, detachment from worldly illusions.",
    purposeKn: "ಉಗ್ರ ತಪಸ್ಸು, ಆಂತರಿಕ ಪರಿವರ್ತನೆ ಮತ್ತು ವೈರಾಗ್ಯ.",
    karmicEn: "Sacrificing lower instincts to attain higher spiritual transcendence.",
    karmicKn: "ಸಾತ್ವಿಕ ತ್ಯಾಗದ ಮೂಲಕ ಪರಮಪದ ಹೊಂದುವುದು."
  },
  "U.Bhadrapada": {
    en: "Uttara Bhadrapada",
    kn: "ಉತ್ತರ ಭಾದ್ರಪದ",
    lordEn: "Shani (Saturn)",
    lordKn: "ಶನಿ",
    deityEn: "Ahirbudhnya (Serpent of the Primal Depths)",
    deityKn: "ಅಹಿರ್ಬುಧ್ನ್ಯ",
    symbolEn: "Back of Cot / Twin Serpents in Deep Water",
    symbolKn: "ಆಳವಾದ ನೀರಿನಲ್ಲಿರುವ ನಾಗ",
    purposeEn: "Serene wisdom, profound stillness, oceanic kundalini mastery, and benevolent peace.",
    purposeKn: "ಶಾಂತ ಮನಸ್ಸು, ಆಳವಾದ ಜ್ಞಾನ ಮತ್ತು ಮೋಕ್ಷ ಸಾಧನೆ.",
    karmicEn: "Exercising divine patience while acting as an anchor of peace for distressed souls.",
    karmicKn: "ತಾಳ್ಮೆಯಿಂದ ಇರುವುದರ ಮೂಲಕ ಎಲ್ಲರಿಗೂ ನೆಮ್ಮದಿ ನೀಡುವುದು."
  },
  Revati: {
    en: "Revati",
    kn: "ರೇವತಿ",
    lordEn: "Budha (Mercury)",
    lordKn: "ಬುಧ",
    deityEn: "Pushan (Nourisher & Protector of Travelers)",
    deityKn: "ಪೂಷನ್ ದೇವ",
    symbolEn: "Fish Swimming in Harmony / Pair of Drums",
    symbolKn: "ಮೀನುಗಳ ಜೋಡಿ",
    purposeEn: "Guiding lost souls, unconditional compassion, safe journeys, and spiritual completion.",
    purposeKn: "ದಾರಿತಪ್ಪಿದವರಿಗೆ ಮಾರ್ಗದರ್ಶನ, ಅಹಿಂಸೆ ಮತ್ತು ಮೋಕ್ಷ.",
    karmicEn: "Concluding the karmic wheel of 27 stars with total forgiveness and boundless love.",
    karmicKn: "ಎಲ್ಲರನ್ನೂ ಕ್ಷಮಿಸಿ ಕರುಣೆಯಿಂದ ಬದುಕಿ ಮುಕ್ತಿ ಪಡೆಯುವುದು."
  }
};

/**
 * Generates an authentic, detailed Vedic prediction reading
 */
export function generateVedicPrediction(profile: SeekerProfile): { prediction: string; remedy: string } {
  const isKn = profile.language === 'kn';
  const name = profile.name || (isKn ? 'ಜಿಜ್ಞಾಸು' : 'Seeker');
  
  // Normalize Rashi and Nakshatra lookups
  const rashiKey = Object.keys(RASHI_DATA).find(
    k => k.toLowerCase() === (profile.rashi || '').toLowerCase() || RASHI_DATA[k].kn === profile.rashi
  ) || 'Mesha';
  
  const nakshatraKey = Object.keys(NAKSHATRA_DATA).find(
    k => k.toLowerCase() === (profile.nakshatra || '').toLowerCase() || NAKSHATRA_DATA[k].kn === profile.nakshatra
  ) || 'Ashwini';

  const rashi = RASHI_DATA[rashiKey];
  const nakshatra = NAKSHATRA_DATA[nakshatraKey];
  const pada = profile.pada || '1';

  if (isKn) {
    const remedyText = `ಪ್ರತಿದಿನ ಮುಂಜಾನೆ ಸೂರ್ಯ ನಮಸ್ಕಾರ ಮಾಡಿ ಮತ್ತು ${rashi.deityKn} ರನ್ನು ಭಕ್ತಿಯಿಂದ ಪೂಜಿಸಿ. ${rashi.luckyColorKn} ಬಣ್ಣವನ್ನು ಬಳಸುವುದು ನಿಮ್ಮ ಅದೃಷ್ಟವನ್ನು ವೃದ್ಧಿಸುತ್ತದೆ.`;
    const predictionText = `🌌 **Cosmic Blueprint**
ನಮಸ್ಕಾರ ${name}. ನಿಮ್ಮ ಜನ್ಮ ರಾಶಿ ${rashi.kn} (${rashi.lordKn} ಅಧಿಪತಿ) ಮತ್ತು ಜನ್ಮ ನಕ್ಷತ್ರ ${nakshatra.kn} (ಪಾದ ${pada}). ನಿಮ್ಮ ಜಾತಕದಲ್ಲಿ ${rashi.elementKn} ಪ್ರಧಾನವಾಗಿದ್ದು, ನಿಮ್ಮಲ್ಲಿ ನೈಸರ್ಗಿಕ ತೇಜಸ್ಸು ಹಾಗೂ ${rashi.strengthsKn} ತುಂಬಿದೆ.

🕉️ **Life Purpose**
ನಿಮ್ಮ ಆತ್ಮದ ಮುಖ್ಯ ಉದ್ದೇಶ ${nakshatra.purposeKn} ಆಗಿದೆ. ${nakshatra.deityKn} ರ ಅನುಗ್ರಹದಿಂದ ನೀವು ನಿಮ್ಮ ಕಾರ್ಯಕ್ಷೇತ್ರದಲ್ಲಿ ವಿಶೇಷ ಕೀರ್ತಿ ಮತ್ತು ಗೌರವವನ್ನು ಗಳಿಸುವಿರಿ.

🕰️ **Past Karma**
ಹಿಂದಿನ ಸಂಚಿತ ಕರ್ಮದ ಪ್ರಕಾರ, ನೀವು ${nakshatra.karmicKn} ಎಂಬ ದೈವಿಕ ಸಂಕಲ್ಪದೊಂದಿಗೆ ಮುನ್ನಡೆಯುತ್ತಿದ್ದೀರಿ. ನಿಮ್ಮ ಪ್ರಾಮಾಣಿಕತೆ ಮತ್ತು ಧರ್ಮನಿಷ್ಠೆಯು ನಿಮ್ಮನ್ನು ಎಲ್ಲ ಸಂಕಷ್ಟಗಳಿಂದ ರಕ್ಷಿಸುತ್ತದೆ.

🚀 **Future Trajectory**
ಮುಂಬರುವ ಕಾಲಘಟ್ಟವು ನಿಮಗೆ ಹೊಸ ಅವಕಾಶಗಳನ್ನು ಮತ್ತು ಆರ್ಥಿಕ ಪ್ರಗತಿಯನ್ನು ತರಲಿದೆ. ${rashi.lordKn} ರ ಶುಭ ದೃಷ್ಟಿಯಿಂದ ನಿಮ್ಮ ದೀರ್ಘಕಾಲದ ಕನಸುಗಳು ಸಾಕಾರಗೊಳ್ಳುವ ಸಮಯ ಸಮೀಪಿಸಿದೆ.

💼 **Dharma & Prosperity**
ನಿಮ್ಮ ಅದೃಷ್ಟದ ಬಣ್ಣ ${rashi.luckyColorKn} ಹಾಗೂ ಅದೃಷ್ಟ ರತ್ನ ${rashi.gemstoneKn}. ನಿಮ್ಮ ಬುದ್ಧಿವಂತಿಕೆ ಮತ್ತು ತಾಳ್ಮೆಯಿಂದ ಸಮಾಜದಲ್ಲಿ ಉತ್ತಮ ಸ್ಥಾನಮಾನ ಪ್ರಾಪ್ತಿಯಾಗುತ್ತದೆ.

✨ **AstroSage Divine Remedy**
[REMEDY]${remedyText}[/REMEDY]`;

    return { prediction: predictionText, remedy: remedyText };
  } else {
    const remedyText = `Offer water to the rising Sun daily and recite the sacred mantra of ${rashi.deityEn}. Wearing ${rashi.luckyColorEn} accents and practicing 11 minutes of silent evening meditation will align your cosmic energy.`;
    const predictionText = `🌌 **Cosmic Blueprint**
Greetings ${name}. You are attuned to ${rashi.en} governed by ${rashi.lordEn}, residing in the sacred constellation of ${nakshatra.en} (Pada ${pada}). With ${rashi.elementEn} radiating through your chart, you embody ${rashi.strengthsEn}.

🕉️ **Life Purpose**
Your soul's Atma Dharma is centered on ${nakshatra.purposeEn} Blessed by ${nakshatra.deityEn}, your true potential shines when applying righteous discipline to noble aspirations.

🕰️ **Past Karma**
Your karmic trajectory reflects ${nakshatra.karmicEn} Upholding integrity during transient trials has purified your path, unlocking deep inner resilience.

🚀 **Future Trajectory**
The planetary transits indicate a period of elevated mental clarity, auspicious timing for ventures, and rewarding social recognition under the guidance of ${rashi.lordEn}.

💼 **Dharma & Prosperity**
Harmonize your vibration with your favorable gemstone (${rashi.gemstoneEn}) and auspicious colors (${rashi.luckyColorEn}). Your dedication will yield sustained stability and abundance.

✨ **AstroSage Divine Remedy**
[REMEDY]${remedyText}[/REMEDY]`;

    return { prediction: predictionText, remedy: remedyText };
  }
}

/**
 * Intelligent Vedic Astrology Dialogue Generator for Chat Fallback
 */
export function generateVedicChatResponse(userMessage: string, profile?: SeekerProfile, language: 'en' | 'kn' = 'en'): string {
  const query = (userMessage || '').toLowerCase();
  const isKn = language === 'kn';
  const name = profile?.name || (isKn ? 'ಜಿಜ್ಞಾಸು' : 'Seeker');
  
  const rashiKey = Object.keys(RASHI_DATA).find(
    k => k.toLowerCase() === (profile?.rashi || '').toLowerCase() || RASHI_DATA[k].kn === profile?.rashi
  ) || 'Mesha';
  
  const nakshatraKey = Object.keys(NAKSHATRA_DATA).find(
    k => k.toLowerCase() === (profile?.nakshatra || '').toLowerCase() || NAKSHATRA_DATA[k].kn === profile?.nakshatra
  ) || 'Ashwini';

  const rashi = RASHI_DATA[rashiKey];
  const nakshatra = NAKSHATRA_DATA[nakshatraKey];

  if (isKn) {
    if (query.includes('ಶನಿ') || query.includes('ದಶೆ') || query.includes('ಸಾಡೇ') || query.includes('shani')) {
      return `ಪ್ರಿಯ ${name}, ಶನಿ ಮಹಾರಾಜರು ಕರ್ಮಫಲದಾತರು. ನಿಮ್ಮ ${rashi.kn} ರಾಶಿಯ ಮೇಲೆ ಶನಿಯ ಪ್ರಭಾವವು ಕಠಿಣ ಪರಿಶ್ರಮ ಮತ್ತು ಶಿಸ್ತನ್ನು ಅಪೇಕ್ಷಿಸುತ್ತದೆ.\nಪ್ರತಿದಿನ ಸಂಜೆ ಹನುಮಾನ್ ಚಾಲೀಸಾ ಪಠಿಸಿ ಮತ್ತು ನಿರ್ಗತಿಕರಿಗೆ ಎಳ್ಳೆಣ್ಣೆ ದೀಪ ಹಚ್ಚಿ ನಮಸ್ಕರಿಸಿ.\nನಿಮ್ಮ ಸತ್ಕರ್ಮಗಳು ನಿಮಗೆ ಅಪಾರ ಯಶಸ್ಸು ಮತ್ತು ಶಾಶ್ವತ ನೆಮ್ಮದಿಯನ್ನು ನೀಡುತ್ತವೆ.`;
    }
    if (query.includes('ವೃತ್ತಿ') || query.includes('ಕೆಲಸ') || query.includes('ಉದ್ಯೋಗ') || query.includes('career') || query.includes('job')) {
      return `ನಿಮ್ಮ ${rashi.kn} ರಾಶಿ ಮತ್ತು ${nakshatra.kn} ನಕ್ಷತ್ರವು ಉತ್ತಮ ವೃತ್ತಿ ಬೆಳವಣಿಗೆಯನ್ನು ಸೂಚಿಸುತ್ತದೆ.\nನಿಮ್ಮ ನಾಯಕತ್ವ ಮತ್ತು ${rashi.strengthsKn} ಗುಣಗಳಿಂದ ನೀವು ಉನ್ನತ ಸ್ಥಾನವನ್ನು ತಲುಪುವಿರಿ.\nಬುಧವಾರ ಅಥವಾ ಗುರುವಾರದಂದು ಹೊಸ ಯೋಜನೆಗಳನ್ನು ಪ್ರಾರಂಭಿಸುವುದು ಅತೀವ ಶುಭ ಫಲ ನೀಡುತ್ತದೆ.`;
    }
    if (query.includes('ಬಣ್ಣ') || query.includes('ಅದೃಷ್ಟ') || query.includes('ರತ್ನ') || query.includes('color') || query.includes('lucky')) {
      return `ನಿಮಗೆ ಅತ್ಯಂತ ಶುಭಕರವಾದ ಬಣ್ಣ **${rashi.luckyColorKn}** ಮತ್ತು ಅದೃಷ್ಟ ರತ್ನ **${rashi.gemstoneKn}** ಆಗಿದೆ.\nನಿಮ್ಮ ಆರಾಧ್ಯ ದೈವ ${rashi.deityKn} ರ ಉಪಾಸನೆ ಮಾಡುವುದರಿಂದ ಜೀವನದಲ್ಲಿ ಸಕಾರಾತ್ಮಕ ಶಕ್ತಿ ಹೆಚ್ಚಾಗುತ್ತದೆ.`;
    }
    if (query.includes('ಮದುವೆ') || query.includes('ಸಂಬಂಧ') || query.includes('ದಾಂಪತ್ಯ') || query.includes('love') || query.includes('marriage')) {
      return `ನಿಮ್ಮ ಗ್ರಹಗತಿಗಳ ಪ್ರಕಾರ, ಪರಸ್ಪರ ಗೌರವ, ತಾಳ್ಮೆ ಮತ್ತು ಸತ್ಯನಿಷ್ಠೆಯೇ ನಿಮ್ಮ ಬಾಂಧವ್ಯದ ರಕ್ಷಾ ಕವಚವಾಗಿದೆ.\nಶುಕ್ರವಾರದಂದು ${rashi.deityKn} ರಿಗೆ ಕ್ಷೀರಾಭಿಷೇಕ ಅಥವಾ ಬಿಳಿ ಹೂವುಗಳನ್ನು ಅರ್ಪಿಸುವುದು ದಾಂಪತ್ಯ ಸುಖವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.`;
    }
    return `ನಮಸ್ಕಾರ ${name}, ನಿಮ್ಮ ${rashi.kn} ರಾಶಿ ಮತ್ತು ${nakshatra.kn} ನಕ್ಷತ್ರದ ಗ್ರಹಗತಿಗಳು ನಿಮ್ಮ ಪರವಾಗಿವೆ.\nಯಾವುದೇ ಹೊಸ ಹೆಜ್ಜೆಯನ್ನು ಧೈರ್ಯ ಮತ್ತು ಧರ್ಮನಿಷ್ಠೆಯಿಂದ ಇರಿಸಿ.\nಪ್ರತಿದಿನ ಸೂರ್ಯ ನಮಸ್ಕಾರ ಮಾಡಿ ಧ್ಯಾನದಲ್ಲಿ ತೊಡಗಿಸಿಕೊಳ್ಳುವುದು ನಿಮ್ಮ ಇಷ್ಟಾರ್ಥಗಳನ್ನು ಈಡೇರಿಸುತ್ತದೆ.`;
  } else {
    if (query.includes('shani') || query.includes('saturn') || query.includes('dasha') || query.includes('sade')) {
      return `Dear ${name}, Lord Shani rewards sincere patience and honest toil.\nFor your ${rashi.en} alignment, practicing humility and honoring your commitments will turn obstacles into stepping stones.\nReciting the Hanuman Chalisa at dusk brings boundless peace and cosmic protection.`;
    }
    if (query.includes('career') || query.includes('job') || query.includes('business') || query.includes('promotion')) {
      return `Your natal alignment in ${nakshatra.en} indicates strong momentum for professional advancement.\nFocus on your innate abilities in ${rashi.strengthsEn}.\nThursdays and Sundays are especially auspicious for launching new milestones.`;
    }
    if (query.includes('color') || query.includes('gem') || query.includes('lucky') || query.includes('stone')) {
      return `Your celestial signature favors **${rashi.luckyColorEn}** as auspicious colors and **${rashi.gemstoneEn}** as your resonance gemstone.\nInvoking ${rashi.deityEn} amplifies positive astral currents around you.`;
    }
    if (query.includes('marriage') || query.includes('love') || query.includes('relationship') || query.includes('partner')) {
      return `In your relationships, harmony flows when empathetic communication is prioritized.\nOffering sincere gratitude and dedicating peaceful moments together on Fridays strengthens lasting emotional bonds.`;
    }
    return `Greetings ${name}. The stars surrounding ${rashi.en} and ${nakshatra.en} bring clarity and protection.\nMaintain steadfast focus on your righteous dharma, and trust the cosmic rhythm unfolding in your life.\nMorning meditation and staying true to your values will unlock your highest prosperity.`;
  }
}
