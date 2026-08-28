/**
 * AstroSage Vedic Astrology Intelligence Engine
 * --------------------------------------------
 * A robust, deterministic, offline-first Vedic astrology calculation and interpretation engine.
 * Unveils both divine cosmic blueprints AND raw, unvarnished karmic shadows, blind spots,
 * turning ages, and precise Vedic remedies.
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
  shadowEn: string;
  shadowKn: string;
  healthVulnEn: string;
  healthVulnKn: string;
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
  shadowEn: string;
  shadowKn: string;
  turningAges: string;
  karmicWarningEn: string;
  karmicWarningKn: string;
}

export const RASHI_DATA: Record<string, RashiInfo> = {
  Mesha: {
    en: "Mesha (Aries)",
    kn: "ಮೇಷ",
    lordEn: "Mangala (Mars)",
    lordKn: "ಮಂಗಳ",
    elementEn: "Fiery Cardinal (Agni)",
    elementKn: "ಅಗ್ನಿ ತತ್ವ (ಚರ ರಾಶಿ)",
    luckyColorEn: "Crimson Red & Copper Gold",
    luckyColorKn: "ಕಡು ಕೆಂಪು ಮತ್ತು ತಾಮ್ರ ಸುವರ್ಣ",
    gemstoneEn: "Red Coral (Moonga)",
    gemstoneKn: "ಹವಳ",
    deityEn: "Lord Kartikeya & Lord Narasimha",
    deityKn: "ಶ್ರೀ ಸುಬ್ರಹ್ಮಣ್ಯ ಸ್ವಾಮಿ ಮತ್ತು ಉಗ್ರ ನರಸಿಂಹ",
    strengthsEn: "Pioneering audacity, fearless command, decisive executive will",
    strengthsKn: "ನಿರ್ಭೀತ ನಾಯಕತ್ವ, ಕ್ಷಿಪ್ರ ನಿರ್ಧಾರ ಮತ್ತು ಅಪ್ರತಿಮ ಧೈರ್ಯ",
    shadowEn: "Explosive temper, rash impulsiveness, burning bridges before victory is secured",
    shadowKn: "ಅತಿಯಾದ ಆತುರ, ಕ್ಷಣಿಕ ಕೋಪದಿಂದ ಸಂಬಂಧಗಳನ್ನು ಕಡಿದುಕೊಳ್ಳುವುದು",
    healthVulnEn: "Headaches, elevated blood pressure, eye strain, digestive fire/pitta excess",
    healthVulnKn: "ತಲೆನೋವು, ರಕ್ತದೊತ್ತಡ, ಕಣ್ಣಿನ ಉರಿ ಮತ್ತು ಪಿತ್ತ ವಿಕಾರ"
  },
  Vrishabha: {
    en: "Vrishabha (Taurus)",
    kn: "ವೃಷಭ",
    lordEn: "Shukra (Venus)",
    lordKn: "ಶುಕ್ರ",
    elementEn: "Fixed Earth (Prithvi)",
    elementKn: "ಪೃಥ್ವಿ ತತ್ವ (ಸ್ಥಿರ ರಾಶಿ)",
    luckyColorEn: "Silken Opal White & Lotus Pink",
    luckyColorKn: "ರೇಷ್ಮೆ ಬಿಳಿ ಮತ್ತು ನಸು ಗುಲಾಬಿ",
    gemstoneEn: "Diamond or White Sapphire",
    gemstoneKn: "ವಜ್ರ ಅಥವಾ ಬಿಳಿ ನೀಲಂ",
    deityEn: "Goddess Mahalakshmi & Annapoorneshwari",
    deityKn: "ಶ್ರೀ ಮಹಾಲಕ್ಷ್ಮಿ ಮತ್ತು ಅನ್ನಪೂರ್ಣೇಶ್ವರಿ",
    strengthsEn: "Unshakable stamina, aesthetic genius, wealth compounding discipline",
    strengthsKn: "ಸ್ಥಿರ ಪರಿಶ್ರಮ, ಅಪಾರ ತಾಳ್ಮೆ, ಸಂಪತ್ತು ವೃದ್ಧಿಸುವ ಕಲೆ",
    shadowEn: "Stubborn territorial possessiveness, hoarding comfort, resisting inevitable change",
    shadowKn: "ಹಟಮಾರಿ ಸ್ವಭಾವ, ಬದಲಾವಣೆಯನ್ನು ವಿರೋಧಿಸುವುದು, ಅತಿಯಾದ ಭೋಗಾಸಕ್ತಿ",
    healthVulnEn: "Throat/vocal strain, thyroid imbalances, sugar metabolism sensitivity",
    healthVulnKn: "ಗಂಟಲು ಬಾಧೆ, ಥೈರಾಯ್ಡ್ ಮತ್ತು ಮಧುಮೇಹ ಸಂವೇದನೆ"
  },
  Mithuna: {
    en: "Mithuna (Gemini)",
    kn: "ಮಿಥುನ",
    lordEn: "Budha (Mercury)",
    lordKn: "ಬುಧ",
    elementEn: "Dual Air (Vayu)",
    elementKn: "ವಾಯು ತತ್ವ (ದ್ವಿಸ್ವಭಾವ ರಾಶಿ)",
    luckyColorEn: "Emerald Green & Lemon Yellow",
    luckyColorKn: "ಪಚ್ಚೆ ಹಸಿರು ಮತ್ತು ತಿಳಿ ಹಳದಿ",
    gemstoneEn: "Natural Emerald (Panna)",
    gemstoneKn: "ಪಚ್ಚೆ",
    deityEn: "Lord Maha Vishnu & Goddess Saraswati",
    deityKn: "ಶ್ರೀ ಮಹಾವಿಷ್ಣು ಮತ್ತು ಸರಸ್ವತಿ",
    strengthsEn: "Razor intellect, linguistic mastery, swift commercial arbitrage",
    strengthsKn: "ಬುದ್ಧಿ ಚಾತುರ್ಯ, ಮಾತುಗಾರಿಕೆ ಮತ್ತು ವ್ಯಾಪಾರ ಜ್ಞಾನ",
    shadowEn: "Restless duality, superficial distractions, nervous energy draining stamina",
    shadowKn: "ಮನಸ್ಸಿನ ಅಸ್ಥಿರತೆ, ಒಂದೇ ಕೆಲಸದಲ್ಲಿ ನಿಲ್ಲದಿರುವುದು, ಅತಿಯಾದ ಯೋಚನೆ",
    healthVulnEn: "Nervous exhaustion, respiratory allergies, insomnia from overthinking",
    healthVulnKn: "ನರಗಳ ದೌರ್ಬಲ್ಯ, ಉಸಿರಾಟದ ತೊಂದರೆ ಮತ್ತು ನಿದ್ರಾಹೀನತೆ"
  },
  Karka: {
    en: "Karka (Cancer)",
    kn: "ಕರ್ಕ",
    lordEn: "Chandra (Moon)",
    lordKn: "ಚಂದ್ರ",
    elementEn: "Cardinal Water (Jala)",
    elementKn: "ಜಲ ತತ್ವ (ಚರ ರಾಶಿ)",
    luckyColorEn: "Radiant Pearl & Moonlit Silver",
    luckyColorKn: "ಶುಭ್ರ ಮುತ್ತಿನ ಬಿಳಿ ಮತ್ತು ಬೆಳ್ಳಿ",
    gemstoneEn: "Natural South Sea Pearl (Mukta)",
    gemstoneKn: "ನೈಸರ್ಗಿಕ ಮುತ್ತು",
    deityEn: "Lord Shiva (Chandrashekhara) & Goddess Parvati",
    deityKn: "ಶ್ರೀ ಚಂದ್ರಮೌಳೀಶ್ವರ ಮತ್ತು ಪಾರ್ವತಿ ದೇವಿ",
    strengthsEn: "Profound psychic intuition, deep emotional memory, protective nurturing",
    strengthsKn: "ಅಂತಃಪ್ರಜ್ಞೆ, ಅಪಾರ ವಾತ್ಸಲ್ಯ, ರಕ್ಷಣಾತ್ಮಕ ಶಕ್ತಿ",
    shadowEn: "Holding ancient emotional grudges, emotional manipulation, retreating into shell",
    shadowKn: "ಹಳೆಯ ನೋವುಗಳನ್ನು ಹಿಡಿದಿಟ್ಟುಕೊಳ್ಳುವುದು, ಅತಿಯಾದ ಭಾವುಕತೆ ಮತ್ತು ಒಂಟಿತನ",
    healthVulnEn: "Gastric sensitivity, chest congestion, fluid retention during full moon",
    healthVulnKn: "ಜೀರ್ಣಾಂಗ ದೋಷ, ಎದೆಬಡಿತದ ಏರಿಳಿತ ಮತ್ತು ಪಿತ್ತ ಶೀತ"
  },
  Simha: {
    en: "Simha (Leo)",
    kn: "ಸಿಂಹ",
    lordEn: "Surya (Sun)",
    lordKn: "ಸೂರ್ಯ",
    elementEn: "Fixed Fire (Agni)",
    elementKn: "ಅಗ್ನಿ ತತ್ವ (ಸ್ಥಿರ ರಾಶಿ)",
    luckyColorEn: "Imperial Gold & Deep Saffron",
    luckyColorKn: "ರಾಜಸಿಕ ಸುವರ್ಣ ಮತ್ತು ಕೇಸರಿ",
    gemstoneEn: "Burmese Ruby (Manikya)",
    gemstoneKn: "ಮಾಣಿಕ್ಯ",
    deityEn: "Lord Surya Narayana & Lord Shiva",
    deityKn: "ಶ್ರೀ ಸೂರ್ಯ ನಾರಾಯಣ ಮತ್ತು ಶಿವ",
    strengthsEn: "Solar radiance, magnetic royalty, fearless patronage of dependents",
    strengthsKn: "ರಾಜತೇಜಸ್ಸು, ಪ್ರಭಾವಶಾಲಿ ನಾಯಕತ್ವ, ಉದಾರ ವ್ಯಕ್ತಿತ್ವ",
    shadowEn: "Fragile ego wounding, intolerance of criticism, blind entitlement",
    shadowKn: "ಅಹಂಕಾರದ ಪೆಟ್ಟು, ಇತರರ ಸಲಹೆ ತಿರಸ್ಕರಿಸುವುದು, ಮುಖಸ್ತುತಿಗೆ ಮರುಳಾಗುವುದು",
    healthVulnEn: "Cardiovascular stress, spinal tension, upper back stiffness",
    healthVulnKn: "ಹೃದಯ ಸಂವೇದನೆ, ಬೆನ್ನುಹುರಿ ನೋವು ಮತ್ತು ಉಷ್ಣ ಬಾಧೆ"
  },
  Kanya: {
    en: "Kanya (Virgo)",
    kn: "ಕನ್ಯಾ",
    lordEn: "Budha (Mercury)",
    lordKn: "ಬುಧ",
    elementEn: "Dual Earth (Prithvi)",
    elementKn: "ಪೃಥ್ವಿ ತತ್ವ (ದ್ವಿಸ್ವಭಾವ ರಾಶಿ)",
    luckyColorEn: "Forest Jade & Champagne Green",
    luckyColorKn: "ಗಾಢ ಹಸಿರು ಮತ್ತು ನಸುಹಳದಿ",
    gemstoneEn: "Fine Emerald or Peridot",
    gemstoneKn: "ಪಚ್ಚೆ ಅಥವಾ ಪೆರಿಡಾಟ್",
    deityEn: "Goddess Saraswati & Lord Dhanvantari",
    deityKn: "ಶ್ರೀ ಸರಸ್ವತಿ ಮತ್ತು ಧನ್ವಂತರಿ",
    strengthsEn: "Hyper-critical precision, diagnostic genius, unmatched organizational mastery",
    strengthsKn: "ವಿಶ್ಲೇಷಣಾತ್ಮಕ ನಿಖರತೆ, ರೋಗ/ಸಮಸ್ಯೆ ಪತ್ತೆಹಚ್ಚುವ ಸಾಮರ್ಥ್ಯ",
    shadowEn: "Crippling perfectionism, chronic worry, fault-finding that alienates loved ones",
    shadowKn: "ಅತಿಯಾದ ತಪ್ಪು ಹುಡುಕುವಿಕೆ, ಚಿಂತೆ, ಅತಿಯಾದ ಆತ್ಮವಿಮರ್ಶೆ",
    healthVulnEn: "Digestive intestinal spasms, nervous bowel, autoimmune sensitivities",
    healthVulnKn: "ಜಠರ ಕರುಳಿನ ದೋಷ, ನರಗಳ ಆತಂಕ ಮತ್ತು ಹೊಟ್ಟೆಯುರಿ"
  },
  Tula: {
    en: "Tula (Libra)",
    kn: "ತುಲಾ",
    lordEn: "Shukra (Venus)",
    lordKn: "ಶುಕ್ರ",
    elementEn: "Cardinal Air (Vayu)",
    elementKn: "ವಾಯು ತತ್ವ (ಚರ ರಾಶಿ)",
    luckyColorEn: "Cerulean Blue & Pure Diamond White",
    luckyColorKn: "ತಿಳಿ ನೀಲಿ ಮತ್ತು ಶುಭ್ರ ಬಿಳಿ",
    gemstoneEn: "Diamond or White Zircon",
    gemstoneKn: "ವಜ್ರ ಅಥವಾ ಶ್ವೇತ ಜಿರ್ಕಾನ್",
    deityEn: "Goddess Mahalakshmi & Radha Rani",
    deityKn: "ಶ್ರೀ ಮಹಾಲಕ್ಷ್ಮಿ ಮತ್ತು ರಾಧಾ ರಾಣಿ",
    strengthsEn: "Diplomatic equilibrium, supreme aesthetic balance, judicial fairness",
    strengthsKn: "ಸಮಚಿತ್ತ ನ್ಯಾಯಪರತೆ, ಸೌಂದರ್ಯ ದೃಷ್ಟಿ, ಮಧುರ ಸಂವಹನ",
    shadowEn: "Agonizing indecision, compromising principles for false peace, co-dependency",
    shadowKn: "ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳಲಾಗದ ಅನಿಶ್ಚಿತತೆ, ಅತಿಯಾದ ಹೊಂದಾಣಿಕೆ",
    healthVulnEn: "Kidney filtration, lower back lumbar strain, skin hydration issues",
    healthVulnKn: "ಮೂತ್ರಪಿಂಡ ದೋಷ, ಸೊಂಟ ನೋವು ಮತ್ತು ಚರ್ಮದ ಶುಷ್ಕತೆ"
  },
  Vrishchika: {
    en: "Vrishchika (Scorpio)",
    kn: "ವೃಶ್ಚಿಕ",
    lordEn: "Mangala & Ketu",
    lordKn: "ಮಂಗಳ ಮತ್ತು ಕೇತು",
    elementEn: "Fixed Water (Jala)",
    elementKn: "ಜಲ ತತ್ವ (ಸ್ಥಿರ ರಾಶಿ)",
    luckyColorEn: "Oxblood Maroon & Rust Amber",
    luckyColorKn: "ಕಡು ಕೆಂಪು ಮತ್ತು ತಾಮ್ರ ವರ್ಣ",
    gemstoneEn: "Red Coral or Cat's Eye",
    gemstoneKn: "ಕೆಂಪು ಹವಳ ಅಥವಾ ವೈಡೂರ್ಯ",
    deityEn: "Lord Subrahmanya & Lord Kalabhairava",
    deityKn: "ಶ್ರೀ ಸುಬ್ರಹ್ಮಣ್ಯ ಸ್ವಾಮಿ ಮತ್ತು ಕಾಲಭೈರವ",
    strengthsEn: "Occult depth, unbreakable survival tenacity, laser psychical insight",
    strengthsKn: "ನಿಗೂಢ ಗ್ರಹಿಕೆ, ಅಸಾಧಾರಣ ಸಹಿಷ್ಣುತೆ ಮತ್ತು ಸಂಕಷ್ಟ ಗೆಲ್ಲುವ ಛಲ",
    shadowEn: "Toxic vindictiveness, obsessive paranoia, destroying bonds before being betrayed",
    shadowKn: "ಹಗೆತನ ಸಾಧಿಸುವುದು, ಅತಿಯಾದ ಅನುಮಾನ, ದ್ವೇಷ ಹಿಡಿದಿಡುವುದು",
    healthVulnEn: "Excretory/reproductive heat, pelvic tension, blood toxin buildup",
    healthVulnKn: "ಗುಪ್ತಾಂಗ ಬಾಧೆ, ಮೂಲವ್ಯಾಧಿ ಮತ್ತು ರಕ್ತದೋಷ"
  },
  Dhanu: {
    en: "Dhanu (Sagittarius)",
    kn: "ಧನುಸ್ಸು",
    lordEn: "Guru (Jupiter)",
    lordKn: "ಗುರು (ಬೃಹಸ್ಪತಿ)",
    elementEn: "Dual Fire (Agni)",
    elementKn: "ಅಗ್ನಿ ತತ್ವ (ದ್ವಿಸ್ವಭಾವ ರಾಶಿ)",
    luckyColorEn: "Turmeric Yellow & Royal Saffron",
    luckyColorKn: "ಅರಿಶಿನ ಹಳದಿ ಮತ್ತು ರಾಜ ಕೇಸರಿ",
    gemstoneEn: "Yellow Sapphire (Pushparaga)",
    gemstoneKn: "ಪುಷ್ಯರಾಗ",
    deityEn: "Lord Hayagriva & Lord Dattatreya",
    deityKn: "ಶ್ರೀ ಹಯಗ್ರೀವ ಮತ್ತು ದತ್ತಾತ್ರೇಯ",
    strengthsEn: "Expansive dharmic vision, fearless philosophical truth, inspirational optimism",
    strengthsKn: "ಧಾರ್ಮಿಕ ದೂರದೃಷ್ಟಿ, ನಿಷ್ಠುರ ಸತ್ಯವಂತಿಕೆ, ಮಹಾನ್ ಮಾರ್ಗದರ್ಶನ",
    shadowEn: "Dogmatic preachiness, blind financial over-optimism, blunt tactlessness",
    shadowKn: "ಅತಿಯಾದ ಉಪದೇಶ, ಅತಿ ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಹಣ ಕಳೆದುಕೊಳ್ಳುವುದು",
    healthVulnEn: "Liver sluggishness, hips/thigh sciatica, excess arterial lipid accumulation",
    healthVulnKn: "ಪಿತ್ತಜನಕಾಂಗ, ತೊಡೆ/ಸೊಂಟದ ಸಿಯಾಟಿಕಾ ಮತ್ತು ಕೊಲೆಸ್ಟ್ರಾಲ್"
  },
  Makara: {
    en: "Makara (Capricorn)",
    kn: "ಮಕರ",
    lordEn: "Shani (Saturn)",
    lordKn: "ಶನಿ ಮಹಾರಾಜ",
    elementEn: "Cardinal Earth (Prithvi)",
    elementKn: "ಪೃಥ್ವಿ ತತ್ವ (ಚರ ರಾಶಿ)",
    luckyColorEn: "Midnight Navy & Smoky Charcoal",
    luckyColorKn: "ಕಡು ನೀಲಿ ಮತ್ತು ಕಪ್ಪು",
    gemstoneEn: "Blue Sapphire (Neelam) or Amethyst",
    gemstoneKn: "ಇಂದ್ರನೀಲ ಅಥವಾ ಜಾಂಬವಂತ",
    deityEn: "Lord Shiva & Lord Hanuman",
    deityKn: "ಶ್ರೀ ಪರಮೇಶ್ವರ ಮತ್ತು ಆಂಜನೇಯ",
    strengthsEn: "Iron discipline, architectural empire-building, relentless perseverance",
    strengthsKn: "ಉಕ್ಕಿನ ಶಿಸ್ತು, ಅಚಲ ತಾಳ್ಮೆ ಮತ್ತು ಕಠಿಣ ಪರಿಶ್ರಮದಿಂದ ಯಶಸ್ಸು",
    shadowEn: "Cold cynicism, emotional calcification, treating human relationships like contracts",
    shadowKn: "ಭಾವನಾರಹಿತ ಕಠಿಣತೆ, ಒಂಟಿತನದ ಹತಾಶೆ, ಅತಿಯಾದ ಕಟ್ಟುನಿಟ್ಟು",
    healthVulnEn: "Knee joints, skeletal bone density, calcium depletion, melancholy",
    healthVulnKn: "ಮೊಣಕಾಲು ಕೀಲು ನೋವು, ಮೂಳೆ ಸವೆತ ಮತ್ತು ವಾತ ಬಾಧೆ"
  },
  Kumbha: {
    en: "Kumbha (Aquarius)",
    kn: "ಕುಂಭ",
    lordEn: "Shani & Rahu",
    lordKn: "ಶನಿ ಮತ್ತು ರಾಹು",
    elementEn: "Fixed Air (Vayu)",
    elementKn: "ವಾಯು ತತ್ವ (ಸ್ಥಿರ ರಾಶಿ)",
    luckyColorEn: "Electric Ultramarine & Dark Violet",
    luckyColorKn: "ವಿದ್ಯುತ್ ನೀಲಿ ಮತ್ತು ಗಾಢ ನೇರಳೆ",
    gemstoneEn: "Blue Sapphire or Hessonite (Gomed)",
    gemstoneKn: "ನೀಲಂ ಅಥವಾ ಗೋಮೇಧಿಕ",
    deityEn: "Lord Kalabhairava & Lord Shiva",
    deityKn: "ಶ್ರೀ ಕಾಲಭೈರವ ಮತ್ತು ರುದ್ರದೇವ",
    strengthsEn: "Visionary reformism, cosmic humanitarian intelligence, egalitarian mastery",
    strengthsKn: "ಕ್ರಾಂತಿಕಾರಿ ಚಿಂತನೆ, ಸಮಾಜ ಸುಧಾರಣೆ ಮತ್ತು ಸ್ವತಂತ್ರ ತೇಜಸ್ಸು",
    shadowEn: "Aloof emotional detachment, erratic rebelliousness, intellectual god-complex",
    shadowKn: "ಅಲಕ್ಷ್ಯ, ಸ್ವಂತ ಭಾವನೆಗಳನ್ನು ಅದುಮಿಟ್ಟು ವಿಚಿತ್ರವಾಗಿ ವರ್ತಿಸುವುದು",
    healthVulnEn: "Lower calves, ankle circulation, irregular cardiac electric rhythms",
    healthVulnKn: "ಹಿಮ್ಮಡಿ, ಕಾಲಿನ ನರಗಳು ಮತ್ತು ರಕ್ತಪರಿಚಲನೆ ಏರುಪೇರು"
  },
  Meena: {
    en: "Meena (Pisces)",
    kn: "ಮೀನ",
    lordEn: "Guru (Jupiter)",
    lordKn: "ಗುರು (ಬೃಹಸ್ಪತಿ)",
    elementEn: "Dual Water (Jala)",
    elementKn: "ಜಲ ತತ್ವ (ದ್ವಿಸ್ವಭಾವ ರಾಶಿ)",
    luckyColorEn: "Golden Ochre & Sea-Foam Aqua",
    luckyColorKn: "ಸುವರ್ಣ ಹಳದಿ ಮತ್ತು ಸಾಗರ ಬಿಳಿ",
    gemstoneEn: "Yellow Sapphire (Pushparaga)",
    gemstoneKn: "ಪುಷ್ಯರಾಗ",
    deityEn: "Lord Vishnu (Matsya Avatar) & Dakshinamurthy",
    deityKn: "ಶ್ರೀ ಮಹಾವಿಷ್ಣು ಮತ್ತು ದಕ್ಷಿಣಾಮೂರ್ತಿ",
    strengthsEn: "Spiritual transcendence, boundless empathy, mystic artistic portal",
    strengthsKn: "ಅಪಾರ ಕರುಣೆ, ಆಧ್ಯಾತ್ಮಿಕ ದರ್ಶನ ಮತ್ತು ಸಾತ್ವಿಕ ಭಕ್ತಿ",
    shadowEn: "Martyr complex, escapism into addictions or fantasy, chronic financial leakages",
    shadowKn: "ವಂಚನೆಗೆ ಒಳಗಾಗುವುದು, ಭ್ರಮಾಲೋಕದಲ್ಲಿ ತೇಲುವುದು, ಹಣ ಉಳಿಸಲಾಗದಿರುವುದು",
    healthVulnEn: "Lymphatic stagnation, feet/soles vulnerability, immune system volatility",
    healthVulnKn: "ಪಾದಗಳ ನೋವು, ರೋಗನಿರೋಧಕ ಶಕ್ತಿ ಕುಸಿತ ಮತ್ತು ಶೀತ ಕಫ"
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
    symbolKn: "ಕುದುರೆಯ ಮುಖ",
    purposeEn: "Lightning initiation, miraculous healing, breaking through entrenched stagnation.",
    purposeKn: "ಅದ್ಭುತ ಕ್ಷಿಪ್ರ ಆರಂಭ, ರೋಗ ನಿವಾರಣೆ ಮತ್ತು ಅಡೆತಡೆಗಳ ಭಂಗ.",
    karmicEn: "Resolving ancestral impatience; mastering the art of finishing what you ignite.",
    karmicKn: "ಆರಂಭಿಸಿದ ಕಾರ್ಯವನ್ನು ಅರ್ಧಕ್ಕೆ ಬಿಡದೆ ಕೊನೆಯವರೆಗೂ ಪೂರ್ಣಗೊಳಿಸುವುದು.",
    shadowEn: "Burning bridges out of haste; discarding valuable partners when bored.",
    shadowKn: "ಆತುರದಿಂದ ಉತ್ತಮ ಸ್ನೇಹಿತರನ್ನು ಕಳೆದುಕೊಳ್ಳುವುದು, ಸ್ಥಿರತೆಯ ಕೊರತೆ.",
    turningAges: "21, 28, 35, 42",
    karmicWarningEn: "Never sign financial or property contracts in a rush without third-party review.",
    karmicWarningKn: "ಆತುರದಲ್ಲಿ ಯಾವುದೇ ಆಸ್ತಿ ಅಥವಾ ಹಣಕಾಸಿನ ಒಪ್ಪಂದಕ್ಕೆ ಸಹಿ ಹಾಕಬೇಡಿ."
  },
  Bharani: {
    en: "Bharani",
    kn: "ಭರಣಿ",
    lordEn: "Shukra (Venus)",
    lordKn: "ಶುಕ್ರ",
    deityEn: "Lord Yama (God of Truth & Dharma)",
    deityKn: "ಯಮಧರ್ಮರಾಜ",
    symbolEn: "Vessel of Creation",
    symbolKn: "ಸೃಷ್ಟಿಯ ಪಾತ್ರೆ",
    purposeEn: "Enduring cosmic pressure to birth massive creative, artistic, or material empires.",
    purposeKn: "ತೀವ್ರ ಸಂಕಷ್ಟಗಳನ್ನು ಎದುರಿಸಿ ಬೃಹತ್ ಯಶಸ್ಸು ಮತ್ತು ಸಂಪತ್ತು ನಿರ್ಮಿಸುವುದು.",
    karmicEn: "Balancing intense worldly desire with radical detachment and forgiveness.",
    karmicKn: "ಅತಿಯಾದ ಮೋಹ ಮತ್ತು ಹಗೆತನವನ್ನು ತ್ಯಜಿಸಿ ಸತ್ಯಧರ್ಮ ಪಾಲಿಸುವುದು.",
    shadowEn: "Extreme possessiveness, holding grudges like poison, destructive jealousy.",
    shadowKn: "ಅಸೂಯೆ, ಹಳೆಯ ಸೇಡು ಹಿಡಿದಿಟ್ಟುಕೊಳ್ಳುವುದು ಮತ್ತು ದುರಾಸೆ.",
    turningAges: "24, 32, 40, 48",
    karmicWarningEn: "Beware of secret indiscretions or obsessive emotional attachments that consume your focus.",
    karmicWarningKn: "ಅತಿಯಾದ ವ್ಯಾಮೋಹ ಮತ್ತು ರಹಸ್ಯ ಸಂಬಂಧಗಳಿಂದ ದೂರವಿರಿ."
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
    purposeEn: "Incinerating mediocrity, fierce protective leadership, surgical purification.",
    purposeKn: "ಅಧರ್ಮವನ್ನು ಸುಟ್ಟು ಹಾಕುವುದು, ರಕ್ಷಣೆ ಮತ್ತು ಕಠಿಣ ನಾಯಕತ್ವ.",
    karmicEn: "Channeling destructive fury into luminous warmth that fosters life rather than burns it.",
    karmicKn: "ಕೋಪವನ್ನು ನಿಯಂತ್ರಿಸಿ ಜನರ ಕಲ್ಯಾಣಕ್ಕಾಗಿ ಆ ಶಕ್ತಿಯನ್ನು ಬಳಸುವುದು.",
    shadowEn: "Cutting tongue that leaves permanent psychological scars on family and subordinates.",
    shadowKn: "ಕಟು ಮಾತುಗಳಿಂದ ಹತ್ತಿರದವರ ಮನಸ್ಸನ್ನು ಶಾಶ್ವತವಾಗಿ ಘಾಸಿಗೊಳಿಸುವುದು.",
    turningAges: "21, 27, 36, 45",
    karmicWarningEn: "Do not let ego dictate arguments; pride before family leads to bitter isolation.",
    karmicWarningKn: "ಕುಟುಂಬದ ಮುಂದೆ ಅಹಂಕಾರ ಪ್ರದರ್ಶಿಸಬೇಡಿ, ಅದು ನಿಮ್ಮನ್ನು ಒಂಟಿಯನ್ನಾಗಿ ಮಾಡುತ್ತದೆ."
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
    purposeEn: "Manifesting sublime beauty, abundance, sensual arts, and agricultural fruition.",
    purposeKn: "ಸೌಂದರ್ಯ, ಕಲೆ, ಐಶ್ವರ್ಯ ಮತ್ತು ಅಪಾರ ಆಕರ್ಷಣೆ ಬೆಳೆಸುವುದು.",
    karmicEn: "Transcending the illusion that material elegance alone can satisfy the immortal soul.",
    karmicKn: "ಕೇವಲ ಬಾಹ್ಯ ಭೋಗಗಳಿಗೆ ಮರುಳಾಗದೆ ಆಂತರಿಕ ಶಾಂತಿಯನ್ನು ಕಂಡುಕೊಳ್ಳುವುದು.",
    shadowEn: "Narcissistic vanity, coveting what others own, emotional manipulation via charm.",
    shadowKn: "ಇತರರ ಸಂಪತ್ತನ್ನು ನೋಡಿ ಅಸೂಯೆ ಪಡುವುದು, ಆಕರ್ಷಣೆಯಿಂದ ಜನರನ್ನು ದುರುಪಯೋಗಪಡಿಸಿಕೊಳ್ಳುವುದು.",
    turningAges: "20, 29, 38, 47",
    karmicWarningEn: "Avoid financial overextension to maintain high societal appearances.",
    karmicWarningKn: "ಸಮಾಜದಲ್ಲಿ ಆಡಂಬರ ತೋರಿಸಲು ಸಾಲ ಮಾಡಿ ಆರ್ಥಿಕ ಸಂಕಷ್ಟಕ್ಕೆ ಸಿಲುಕಬೇಡಿ."
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
    purposeEn: "Relentless quest for hidden knowledge, investigative intellect, and mystical research.",
    purposeKn: "ನಿಗೂಢ ಸತ್ಯದ ಶೋಧನೆ, ಸಂಶೋಧನೆ ಮತ್ತು ಹೊಸ ಜ್ಞಾನಾರ್ಜನೆ.",
    karmicEn: "Finding the inner reservoir of peace instead of forever grazing in outside pastures.",
    karmicKn: "ಹೊರಗಿನ ಅಲೆದಾಟ ನಿಲ್ಲಿಸಿ ಆಂತರಿಕ ತೃಪ್ತಿಯನ್ನು ಕಂಡುಕೊಳ್ಳುವುದು.",
    shadowEn: "Chronic cynicism, inability to commit to one relationship or career path, nervous restlessness.",
    shadowKn: "ಯಾವುದರಲ್ಲೂ ತೃಪ್ತಿ ಸಿಗದಿರುವುದು, ನಿರಂತರ ಅನುಮಾನ ಮತ್ತು ಚಂಚಲತೆ.",
    turningAges: "23, 28, 37, 46",
    karmicWarningEn: "Constant suspicion of close allies will manifest the very disloyalty you dread.",
    karmicWarningKn: "ನಿಷ್ಠಾವಂತರನ್ನು ಅತಿಯಾಗಿ ಅನುಮಾನಿಸಿ ಅವರನ್ನು ದೂರ ಮಾಡಿಕೊಳ್ಳಬೇಡಿ."
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
    purposeEn: "Enduring severe karmic storms to emerge with diamond-hard spiritual clarity.",
    purposeKn: "ಭೀಕರ ಸಂಕಷ್ಟಗಳನ್ನು ಎದುರಿಸಿ ವಜ್ರದಂತಹ ದೃಢತೆಯನ್ನು ಹೊಂದುವುದು.",
    karmicEn: "Alchemizing deep sorrow into universal compassion rather than bitter resentment.",
    karmicKn: "ಜೀವನದ ಕಹಿಯನ್ನು ದ್ವೇಷವನ್ನಾಗಿಸದೆ ಮಹಾನ್ ಕರುಣೆಯನ್ನಾಗಿ ಪರಿವರ್ತಿಸುವುದು.",
    shadowEn: "Explosive self-sabotage, cruel outbursts during heartbreak, feeling cursed by destiny.",
    shadowKn: "ಸ್ವಯಂ ಹಾನಿ ಮಾಡಿಕೊಳ್ಳುವುದು, ನೋವಾದಾಗ ಎಲ್ಲರ ಮೇಲೂ ಕೆಂಡಕಾರುವುದು.",
    turningAges: "25, 33, 42, 51",
    karmicWarningEn: "Do not make major life or legal decisions in the heat of an emotional storm.",
    karmicWarningKn: "ತೀವ್ರ ಸಿಟ್ಟು ಅಥವಾ ದುಃಖದಲ್ಲಿದ್ದಾಗ ಯಾವುದೇ ಪ್ರಮುಖ ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳಬೇಡಿ."
  },
  Punarvasu: {
    en: "Punarvasu",
    kn: "ಪುನರ್ವಸು",
    lordEn: "Guru (Jupiter)",
    lordKn: "ಗುರು",
    deityEn: "Goddess Aditi (Cosmic Mother)",
    deityKn: "ಅದಿತಿ ದೇವಿ",
    symbolEn: "Quiver of Arrows",
    symbolKn: "ಬತ್ತಳಿಕೆ",
    purposeEn: "Rebounding from catastrophic loss, benevolent philanthropy, restoring lost virtue.",
    purposeKn: "ಸೋತರೂ ಮತ್ತೆ ಎದ್ದು ನಿಲ್ಲುವುದು, ದಾನಧರ್ಮ ಮತ್ತು ಧರ್ಮದ ಪುನರುತ್ಥಾನ.",
    karmicEn: "Learning that true victory is internal grace, not perpetual material accumulation.",
    karmicKn: "ಸೋಲಿನಲ್ಲೂ ದೈವನಂಬಿಕೆ ಬಿಡದೆ ಧರ್ಮ ಮಾರ್ಗದಲ್ಲೇ ಮುನ್ನಡೆಯುವುದು.",
    shadowEn: "Complacency after early wins, taking family loyalty for granted, excessive risk-taking.",
    shadowKn: "ಆರಂಭಿಕ ಗೆಲುವಿನಿಂದ ಮೈಮರೆಯುವುದು, ಕುಟುಂಬದವರನ್ನು ಕಡೆಗಣಿಸುವುದು.",
    turningAges: "24, 32, 41, 50",
    karmicWarningEn: "Guarding against complacency after major recoveries; protect your reserves.",
    karmicWarningKn: "ಚೇತರಿಸಿಕೊಂಡ ತಕ್ಷಣ ಮತ್ತೆ ಜೂಜು ಅಥವಾ ಅಪಾಯಕಾರಿ ಹೂಡಿಕೆಗೆ ಕೈಹಾಕಬೇಡಿ."
  },
  Pushya: {
    en: "Pushya",
    kn: "ಪುಷ್ಯ",
    lordEn: "Shani (Saturn)",
    lordKn: "ಶನಿ",
    deityEn: "Brihaspati (Guru of Devas)",
    deityKn: "ಬೃಹಸ್ಪತಿ",
    symbolEn: "Lotus / Cow's Udder",
    symbolKn: "ಕಮಲ / ಕಾಮಧೇನು",
    purposeEn: "Nourishing society, preserving sacred traditions, spiritual mentorship.",
    purposeKn: "ಸಮಾಜ ಪೋಷಣೆ, ಜ್ಞಾನ ದಾನ ಮತ್ತು ಸಾತ್ವಿಕ ಧರ್ಮ ರಕ್ಷಣೆ.",
    karmicEn: "Carrying immense collective burdens without developing a bitter martyr complex.",
    karmicKn: "ಎಲ್ಲರ ಹೊಣೆ ಹೊತ್ತು ಕೊನೆಗೆ ಯಾರೂ ನನ್ನನ್ನು ಗುರುತಿಸಲಿಲ್ಲ ಎಂದು ಕೊರಗದಿರುವುದು.",
    shadowEn: "Rigid dogmatism, over-sacrificing health for ungrateful recipients, emotional stifling.",
    shadowKn: "ಕೃತಘ್ನರಿಗಾಗಿ ತನ್ನ ಆರೋಗ್ಯ ಹಾಳುಮಾಡಿಕೊಳ್ಳುವುದು, ಅತಿಯಾದ ಕಟ್ಟುನಿಟ್ಟು.",
    turningAges: "28, 36, 44, 52",
    karmicWarningEn: "Set hard boundaries; do not allow emotional freeloaders to drain your vitality.",
    karmicWarningKn: "ಎಲ್ಲರಿಗೂ ಸಹಾಯ ಮಾಡಲು ಹೋಗಿ ನಿಮ್ಮ ಕುಟುಂಬ ಮತ್ತು ಆರೋಗ್ಯವನ್ನು ನಿರ್ಲಕ್ಷಿಸಬೇಡಿ."
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
    purposeEn: "Awakening primal Kundalini, deep esoteric strategy, mastering occult defense.",
    purposeKn: "ಕುಂಡಲಿನೀ ಶಕ್ತಿ, ನಿಗೂಢ ರಣತಂತ್ರ ಮತ್ತು ಶತ್ರು ಸಂಹಾರ ಸಾಮರ್ಥ್ಯ.",
    karmicEn: "Converting poisonous suspicion into transcendental yogic wisdom.",
    karmicKn: "ಅನುಮಾನ ಮತ್ತು ವಿಷಮಯ ಆಲೋಚನೆಗಳನ್ನು ಶುದ್ಧ ಆಧ್ಯಾತ್ಮಿಕ ಶಕ್ತಿಯನ್ನಾಗಿ ಮಾರ್ಪಡಿಸುವುದು.",
    shadowEn: "Treacherous betrayal when cornered, deep paranoia, clinging toxicity.",
    shadowKn: "ಅತಿಯಾದ ಕುತಂತ್ರ, ಯಾರನ್ನೂ ನಂಬದಿರುವುದು, ಸಂಬಂಧಗಳಲ್ಲಿ ಉಸಿರುಗಟ್ಟಿಸುವುದು.",
    turningAges: "22, 30, 41, 50",
    karmicWarningEn: "Never engage in covert manipulation; karmic payback on Ashlesha is swift and severe.",
    karmicWarningKn: "ಯಾರಿಗೂ ಬೆನ್ನಿಗೆ ಚೂರಿ ಹಾಕುವ ಕುತಂತ್ರ ಮಾಡಬೇಡಿ; ನಾಗದೋಷದ ಕರ್ಮಫಲ ತೀವ್ರವಾಗಿರುತ್ತದೆ."
  },
  Magha: {
    en: "Magha",
    kn: "ಮಘಾ",
    lordEn: "Ketu",
    lordKn: "ಕೇತು",
    deityEn: "Pitris (Ancestral Lineage)",
    deityKn: "ಪಿತೃ ದೇವತೆಗಳು",
    symbolEn: "Throne / Palanquin",
    symbolKn: "ರಾಜ ಸಿಂಹಾಸನ",
    purposeEn: "Commanding ancestral authority, preserving family legacy, royal governance.",
    purposeKn: "ಪಿತೃಗಳ ಆಶೀರ್ವಾದ, ರಾಜಮರ್ಯಾದೆ ಮತ್ತು ವಂಶದ ಕೀರ್ತಿ ಬೆಳೆಸುವುದು.",
    karmicEn: "Honoring great lineage while remaining humble as a servant of the divine.",
    karmicKn: "ವಂಶದ ಹೆಮ್ಮೆಯ ನಡುವೆಯೂ ಭಗವಂತನ ಮುಂದೆ ನಮ್ರನಾಗಿರುವುದು.",
    shadowEn: "Arrogant caste/class elitism, severe ancestral curses, inability to serve under others.",
    shadowKn: "ಅಹಂಕಾರ, ಬೇರೆಯವರ ಕೈಕೆಳಗೆ ಕೆಲಸ ಮಾಡಲು ಸಾಧ್ಯವಾಗದಿರುವುದು, ಪಿತೃ ಶಾಪ.",
    turningAges: "25, 34, 45, 54",
    karmicWarningEn: "Regularly perform Pitri Tarpana; unresolved ancestral debts block your promotions.",
    karmicWarningKn: "ಪಿತೃಗಳಿಗೆ ತಿಲತರ್ಪಣ ನೀಡಿ; ಪಿತೃದೋಷವು ನಿಮ್ಮ ಉದ್ಯೋಗ ಮತ್ತು ಸಂತಾನಕ್ಕೆ ಅಡ್ಡಿಯಾಗಬಹುದು."
  },
  "P.Phalguni": {
    en: "Purva Phalguni",
    kn: "ಪೂರ್ವ ಫಲ್ಗುಣಿ",
    lordEn: "Shukra (Venus)",
    lordKn: "ಶುಕ್ರ",
    deityEn: "Bhaga (God of Fortune)",
    deityKn: "ಭಾಗ್ಯದೇವ",
    symbolEn: "Hammock / Front Legs of Couch",
    symbolKn: "ವಿಶ್ರಾಂತಿ ಆಸನ",
    purposeEn: "Cultivating romantic passion, artistic ecstasy, and regal celebration.",
    purposeKn: "ದಾಂಪತ್ಯ ಸುಖ, ಕಲಾತ್ಮಕ ಆನಂದ ಮತ್ತು ರಾಜಭೋಗ ಅನುಭವಿಸುವುದು.",
    karmicEn: "Elevating worldly pleasure into devotion to the Divine Beloved.",
    karmicKn: "ಕಾಮವನ್ನು ಭಕ್ತಿಯನ್ನಾಗಿ ಪರಿವರ್ತಿಸಿ ಮೋಕ್ಷದ ಕಡೆಗೆ ಸಾಗುವುದು.",
    shadowEn: "Lazy hedonism, vanity, squandering wealth on luxury, neglecting difficult duties.",
    shadowKn: "ಸೋಮಾರಿತನ, ವಿಲಾಸಿ ಜೀವನಕ್ಕಾಗಿ ಹಣ ಪೋಲು ಮಾಡುವುದು, ಕರ್ತವ್ಯ ಮರೆಯುವುದು.",
    turningAges: "26, 33, 42, 51",
    karmicWarningEn: "Beware of debt accumulated solely to maintain a glamorous lifestyle.",
    karmicWarningKn: "ಶೋಕಿ ಜೀವನಕ್ಕಾಗಿ ಸಾಲ ಮಾಡಬೇಡಿ, ಅದು ನಿಮ್ಮನ್ನು ದಿವಾಳಿ ಮಾಡಬಹುದು."
  },
  "U.Phalguni": {
    en: "Uttara Phalguni",
    kn: "ಉತ್ತರ ಫಲ್ಗುಣಿ",
    lordEn: "Surya (Sun)",
    lordKn: "ಸೂರ್ಯ",
    deityEn: "Aryaman (God of Contracts)",
    deityKn: "ಅರ್ಯಮನ್ ದೇವ",
    symbolEn: "Back Legs of Couch",
    symbolKn: "ಸ್ಥಿರ ಆಸನ",
    purposeEn: "Righteous partnerships, unshakeable loyalty, structural benevolence.",
    purposeKn: "ಸತ್ಯನಿಷ್ಠ ಪಾಲುದಾರಿಕೆ, ಕೊಟ್ಟ ಮಾತು ಉಳಿಸಿಕೊಳ್ಳುವುದು ಮತ್ತು ಸಮಾಜ ಸೇವೆ.",
    karmicEn: "Upholding sacred vows even when the other party falters, anchored in cosmic truth.",
    karmicKn: "ಸಂಕಷ್ಟದಲ್ಲೂ ಸತ್ಯವನ್ನು ಬಿಡದೆ ಧರ್ಮ ಪರಿಪಾಲನೆ ಮಾಡುವುದು.",
    shadowEn: "Excessive stubbornness in bad alliances, social hypocrisy, rigid intolerance.",
    shadowKn: "ಕೆಟ್ಟ ಸಂಬಂಧಗಳಲ್ಲೂ ವ್ಯರ್ಥವಾಗಿ ಕಟ್ಟುಬೀಳುವುದು, ಅತಿಯಾದ ಕಠಿಣತೆ.",
    turningAges: "27, 35, 44, 53",
    karmicWarningEn: "Do not sacrifice your life's work to save an unrepentant, corrupt business partner.",
    karmicWarningKn: "ಮೋಸಗಾರ ಪಾಲುದಾರರನ್ನು ಉಳಿಸಲು ಹೋಗಿ ನಿಮ್ಮ ಆಸ್ತಿಯನ್ನು ಕಳೆದುಕೊಳ್ಳಬೇಡಿ."
  },
  Hasta: {
    en: "Hasta",
    kn: "ಹಸ್ತ",
    lordEn: "Chandra (Moon)",
    lordKn: "ಚಂದ್ರ",
    deityEn: "Savitri (Sun God of Dawn)",
    deityKn: "ಸವಿತೃ ದೇವ",
    symbolEn: "Open Hand / Clenched Fist",
    symbolKn: "ಅಭಯ ಹಸ್ತ",
    purposeEn: "Artisanal mastery, healing touch, rapid manifestations, trade genius.",
    purposeKn: "ಕೈಚಳಕ, ವಾಸ್ತು-ಶಿಲ್ಪ, ವ್ಯಾಪಾರ ಬುದ್ಧಿ ಮತ್ತು ಮಾಟ-ಮಂತ್ರಗಳ ನಿವಾರಣೆ.",
    karmicEn: "Using dexterous hands purely for divine service without deceit or cunning.",
    karmicKn: "ಕೈಚಳಕವನ್ನು ವಂಚನೆಗೆ ಬಳಸದೆ ಪ್ರಾಮಾಣಿಕ ದುಡಿಮೆಗೆ ಮಾತ್ರ ಬಳಸುವುದು.",
    shadowEn: "Clever thievery, trickery in commerce, mood swings tied to lunar tides.",
    shadowKn: "ವ್ಯಾಪಾರದಲ್ಲಿ ಮೋಸ, ಚಂಚಲ ಮನಸ್ಸು, ಮಾಟ-ಮಂತ್ರದ ಭಯ.",
    turningAges: "21, 29, 38, 47",
    karmicWarningEn: "Absolute transparency in financial bookkeeping is mandatory to avoid tax or legal traps.",
    karmicWarningKn: "ಲೆಕ್ಕಪತ್ರಗಳಲ್ಲಿ ಮೋಸ ಮಾಡಬೇಡಿ; ಕಾನೂನಿನ ಕಠಿಣ ಶಿಕ್ಷೆಗೆ ಗುರಿಯಾಗಬೇಕಾದೀತು."
  },
  Chitra: {
    en: "Chitra",
    kn: "ಚಿತ್ತಾ",
    lordEn: "Mangala (Mars)",
    lordKn: "ಮಂಗಳ",
    deityEn: "Vishwakarma (Cosmic Architect)",
    deityKn: "ವಿಶ್ವಕರ್ಮ",
    symbolEn: "Gleaming Jewel",
    symbolKn: "ಹೊಳೆಯುವ ರತ್ನ",
    purposeEn: "Architectural masterpiece creation, aesthetic design, cutting through illusion.",
    purposeKn: "ಅದ್ಭುತ ವಿನ್ಯಾಸ, ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ಕಲಾ ವೈಭವ ಸೃಷ್ಟಿಸುವುದು.",
    karmicEn: "Perceiving eternal spiritual beauty rather than being trapped by outer facades.",
    karmicKn: "ಬಾಹ್ಯ ಸೌಂದರ್ಯಕ್ಕಿಂತ ಆಂತರಿಕ ಸತ್ಯವನ್ನು ಪ್ರೀತಿಸುವುದು.",
    shadowEn: "Hyper-critical obsession with partner's flaws, vanity, arrogance over intellect.",
    shadowKn: "ಸಂಗಾತಿಯಲ್ಲಿ ಸದಾ ತಪ್ಪು ಹುಡುಕುವುದು, ಕಲಾ ಅಹಂಕಾರ.",
    turningAges: "27, 35, 42, 51",
    karmicWarningEn: "Do not destroy a solid marriage hunting for an impossible fantasy of perfection.",
    karmicWarningKn: "ಅತಿಯಾದ ಪರಿಪೂರ್ಣತೆಯ ನಿರೀಕ್ಷೆಯಿಂದ ಸುಖಿ ದಾಂಪತ್ಯವನ್ನು ಹಾಳುಮಾಡಿಕೊಳ್ಳಬೇಡಿ."
  },
  Swati: {
    en: "Swati",
    kn: "ಸ್ವಾತಿ",
    lordEn: "Rahu",
    lordKn: "ರಾಹು",
    deityEn: "Vayu (God of Wind & Prana)",
    deityKn: "ವಾಯುದೇವ",
    symbolEn: "Shoot in the Wind / Coral",
    symbolKn: "ಗಾಳಿಯಲ್ಲಿ ತೂಗುವ ಚಿಗುರು",
    purposeEn: "Extreme independence, market trading agility, diplomatic mastery.",
    purposeKn: "ಸ್ವತಂತ್ರ ಮನೋಭಾವ, ಷೇರು ಮಾರುಕಟ್ಟೆ ಚಾತುರ್ಯ ಮತ್ತು ಹೊಂದಾಣಿಕೆ.",
    karmicEn: "Staying rooted in spiritual devotion while bending flexibly with worldly winds.",
    karmicKn: "ಕಷ್ಟದ ಗಾಳಿ ಬೀಸಿದಾಗಲೂ ಭಗವದ್ಭಕ್ತಿಯಲ್ಲಿ ದೃಢವಾಗಿ ಬೇರೂರಿರುವುದು.",
    shadowEn: "Restless unfaithfulness, running away from heavy obligations, debt via speculation.",
    shadowKn: "ಹೊಣೆಗಾರಿಕೆಯಿಂದ ಓಡಿಹೋಗುವುದು, ಷೇರು ಜೂಜಿನಲ್ಲಿ ಸಾಲ ಮಾಡಿಕೊಳ್ಳುವುದು.",
    turningAges: "23, 31, 39, 48",
    karmicWarningEn: "Strictly avoid addictive stock market futures/crypto leverage; your Rahu nature attracts sudden ruin.",
    karmicWarningKn: "ಅತಿಯಾದ ಷೇರು ಮಾರುಕಟ್ಟೆ ಅಥವಾ ಕ್ರಿಪ್ಟೋ ಜೂಜಾಟದಲ್ಲಿ ತೊಡಗಬೇಡಿ; ದಿಢೀರ್ ನಷ್ಟ ಸಂಭವಿಸಬಹುದು."
  },
  Vishakha: {
    en: "Vishakha",
    kn: "ವಿಶಾಖ",
    lordEn: "Guru (Jupiter)",
    lordKn: "ಗುರು",
    deityEn: "Indra & Agni (Triumph & Sacred Fire)",
    deityKn: "ಇಂದ್ರ ಮತ್ತು ಅಗ್ನಿ",
    symbolEn: "Triumphal Arch / Potter's Wheel",
    symbolKn: "ವಿಜಯ ತೋರಣ",
    purposeEn: "Single-pointed target conquest, ruthless milestone attainment, triumphant breakthroughs.",
    purposeKn: "ಗುರಿ ಮುಟ್ಟುವುದು, ಅಪ್ರತಿಮ ಪರಿಶ್ರಮ ಮತ್ತು ಅಂತಿಮ ವಿಜಯ ಸಾಧನೆ.",
    karmicEn: "Channeling burning ambition toward uplifting humanity rather than selfish conquest.",
    karmicKn: "ಸ್ವಾರ್ಥವನ್ನು ಮರೆತು ಸಮಾಜದ ಕಲ್ಯಾಣಕ್ಕಾಗಿ ಆ ಶಕ್ತಿಯನ್ನು ಬಳಸುವುದು.",
    shadowEn: "Jealousy of rivals, scorched-earth competitiveness, abandoning friends once useful.",
    shadowKn: "ಇತರರ ಯಶಸ್ಸು ನೋಡಿ ಹೊಟ್ಟೆಕಿಚ್ಚು ಪಡುವುದು, ಕೆಲಸ ಮುಗಿದ ಮೇಲೆ ಜನರನ್ನು ಕಡೆಗಣಿಸುವುದು.",
    turningAges: "28, 36, 45, 54",
    karmicWarningEn: "Do not burn bridges with early mentors once you reach heights of power.",
    karmicWarningKn: "ಉನ್ನತ ಸ್ಥಾನ ತಲುಪಿದ ತಕ್ಷಣ ನಿಮ್ಮ ಆರಂಭಿಕ ಗುರುಗಳನ್ನು ಮತ್ತು ಹಿರಿಯರನ್ನು ಅವಮಾನಿಸಬೇಡಿ."
  },
  Anuradha: {
    en: "Anuradha",
    kn: "ಅನುರಾಧ",
    lordEn: "Shani (Saturn)",
    lordKn: "ಶನಿ",
    deityEn: "Mitra (God of Friendship)",
    deityKn: "ಮಿತ್ರ ದೇವ",
    symbolEn: "Lotus in the Mud / Staff",
    symbolKn: "ಕೆಸರಿನಲ್ಲಿ ಅರಳಿದ ಕಮಲ",
    purposeEn: "Devotional loyalty, foreign success, deep fellowship, blooming through darkness.",
    purposeKn: "ನಿಷ್ಠಾವಂತ ಸ್ನೇಹ, ವಿದೇಶ ಯಾನ ಮತ್ತು ಕಷ್ಟಗಳ ನಡುವೆಯೇ ಕಮಲದಂತೆ ಅರಳುವುದು.",
    karmicEn: "Radiating unconditional love even when betrayed in unfamiliar foreign lands.",
    karmicKn: "ವಂಚನೆಗೆ ಒಳಗಾದರೂ ಪ್ರೀತಿ ಮತ್ತು ಭಕ್ತಿಯಿಂದ ಶಾಂತಿ ಕಾಪಾಡುವುದು.",
    shadowEn: "Melancholy depression, suppressed rage, feeling chronically excluded by close circles.",
    shadowKn: "ಖಿನ್ನತೆ, ಅಂತರಂಗದ ಅಸಮಾಧಾನ ಮತ್ತು ಎಲ್ಲರೂ ನನ್ನನ್ನು ದೂರವಿಟ್ಟಿದ್ದಾರೆ ಎಂಬ ಭಾವನೆ.",
    turningAges: "26, 34, 43, 52",
    karmicWarningEn: "Do not bottle up resentment until it turns into physical chronic ailments.",
    karmicWarningKn: "ಮನಸ್ಸಿನ ಸಿಟ್ಟನ್ನು ಅದುಮಿಟ್ಟುಕೊಳ್ಳಬೇಡಿ; ಅದು ಕಾಯಿಲೆಗೆ ಕಾರಣವಾಗಬಹುದು."
  },
  Jyeshtha: {
    en: "Jyeshtha",
    kn: "ಜ್ಯೇಷ್ಠ",
    lordEn: "Budha (Mercury)",
    lordKn: "ಬುಧ",
    deityEn: "Indra (King of Gods)",
    deityKn: "ದೇವೇಂದ್ರ",
    symbolEn: "Circular Protective Amulet",
    symbolKn: "ರಕ್ಷಣಾ ಛತ್ರಿ",
    purposeEn: "Senior executive command, occult protection of family, supreme authority.",
    purposeKn: "ಹಿರಿಯ ನಾಯಕತ್ವ, ಕುಟುಂಬದ ರಕ್ಷಣೆ ಮತ್ತು ಶ್ರೇಷ್ಠತೆಯ ಮೆರೆದಾಟ.",
    karmicEn: "Using seniority to protect the weak without demanding slavish submission.",
    karmicKn: "ಅಧಿಕಾರವನ್ನು ದುರ್ಬಲರ ರಕ್ಷಣೆಗೆ ಬಳಸುವುದು, ಅಹಂಕಾರದಿಂದ ಮೆರೆಯದಿರುವುದು.",
    shadowEn: "Secret superiority complex, paranoia about losing crown, hypocritical morality.",
    shadowKn: "ಸ್ಥಾನ ಕಳೆದುಕೊಳ್ಳುವ ಭಯ, ಅಸೂಯೆ ಮತ್ತು ಒಂಟಿತನ.",
    turningAges: "26, 36, 48, 55",
    karmicWarningEn: "Jealousy toward younger competitors will catalyze your own downfall.",
    karmicWarningKn: "ಕಿರಿಯರ ಬೆಳವಣಿಗೆಯನ್ನು ನೋಡಿ ಅಸೂಯೆ ಪಡಬೇಡಿ; ಅದು ನಿಮ್ಮ ಅವನತಿಗೆ ದಾರಿಯಾಗುತ್ತದೆ."
  },
  Mula: {
    en: "Mula",
    kn: "ಮೂಲಾ",
    lordEn: "Ketu",
    lordKn: "ಕೇತು",
    deityEn: "Nirriti (Goddess of Dissolution)",
    deityKn: "ನಿರೃತಿ ದೇವಿ",
    symbolEn: "Tied Bundle of Roots",
    symbolKn: "ಬೇರುಗಳ ಕಟ್ಟು",
    purposeEn: "Root extraction, dismantling corrupt structures, absolute spiritual liberation.",
    purposeKn: "ಮೂಲ ಸತ್ಯದ ಶೋಧನೆ, ಅನ್ಯಾಯದ ಬೇರುಗಳನ್ನು ಕಿತ್ತು ಹಾಕುವುದು, ಮೋಕ್ಷ.",
    karmicEn: "Surrendering all attachment as destiny uproots worldly comforts for cosmic awakening.",
    karmicKn: "ಸಂಕಷ್ಟಗಳನ್ನು ದೈವಿಕ ಶುದ್ಧೀಕರಣವೆಂದು ಒಪ್ಪಿಕೊಂಡು ಮುನ್ನಡೆಯುವುದು.",
    shadowEn: "Self-destructive explosions, tearing down family wealth, bitter nihilism.",
    shadowKn: "ಸ್ವಯಂ ವಿನಾಶಕಾರಿ ವರ್ತನೆ, ವಂಶದ ಆಸ್ತಿ ಹಾಳುಮಾಡುವುದು, ಹತಾಶೆ.",
    turningAges: "24, 32, 44, 56",
    karmicWarningEn: "Do not burn your own house down to kill a small insect; think before demolishing.",
    karmicWarningKn: "ಚಿಕ್ಕ ವಿಷಯಕ್ಕಾಗಿ ದೊಡ್ಡ ಸಂಬಂಧಗಳನ್ನು ಅಥವಾ ವ್ಯವಹಾರವನ್ನು ನಾಶಮಾಡಿಕೊಳ್ಳಬೇಡಿ."
  },
  "P.Ashadha": {
    en: "Purva Ashadha",
    kn: "ಪೂರ್ವ ಆಷಾಢ",
    lordEn: "Shukra (Venus)",
    lordKn: "ಶುಕ್ರ",
    deityEn: "Apas (Sacred Waters)",
    deityKn: "ವರುಣ / ಆಪಸ್ ದೇವಿ",
    symbolEn: "Elephant's Tusk",
    symbolKn: "ಆನೆಯ ದಂತ",
    purposeEn: "Invincible conviction, charismatic persuasion, spreading joy like water.",
    purposeKn: "ಅಪಾರ ನಂಬಿಕೆ, ಮಾತುಗಾರಿಕೆ ಮತ್ತು ವಿಜಯದ ಆಕರ್ಷಣೆ.",
    karmicEn: "Remaining modest during peak glory; remembering all victory belongs to the supreme lord.",
    karmicKn: "ಗೆಲುವಿನ ಉತ್ತುಂಗದಲ್ಲೂ ವಿನಯ ಮರೆಯದಿರುವುದು.",
    shadowEn: "Overbearing stubbornness, dismissing wise counsel, blindness to obvious traps.",
    shadowKn: "ಹಟಮಾರಿ ಸ್ವಭಾವ, ಹಿರಿಯರ ಎಚ್ಚರಿಕೆ ಧಿಕ್ಕರಿಸುವುದು.",
    turningAges: "28, 36, 45, 54",
    karmicWarningEn: "Arrogance in debates will turn valuable allies into bitter lifetime adversaries.",
    karmicWarningKn: "ವಾದದಲ್ಲಿ ಗೆಲ್ಲಲು ಹೋಗಿ ಉತ್ತಮ ಮಿತ್ರರನ್ನು ಕಳೆದುಕೊಳ್ಳಬೇಡಿ."
  },
  "U.Ashadha": {
    en: "Uttara Ashadha",
    kn: "ಉತ್ತರ ಆಷಾಢ",
    lordEn: "Surya (Sun)",
    lordKn: "ಸೂರ್ಯ",
    deityEn: "Vishwa Devas (Universal Principles)",
    deityKn: "ವಿಶ್ವದೇವತೆಗಳು",
    symbolEn: "Elephant Tusk / Small Cot",
    symbolKn: "ಆನೆಯ ದಂತ",
    purposeEn: "Everlasting victory through righteousness, unmatched integrity, enduring governance.",
    purposeKn: "ಶಾಶ್ವತ ಧರ್ಮ ವಿಜಯ, ಅಪಾರ ಸತ್ಯನಿಷ್ಠೆ ಮತ್ತು ಸಮಾಜ ಸುಧಾರಣೆ.",
    karmicEn: "Fighting relentlessly for noble eternal causes without expectation of fame.",
    karmicKn: "ಯಾವುದೇ ಫಲದಾಸೆಯಿಲ್ಲದೆ ಲೋಕ ಕಲ್ಯಾಣಕ್ಕಾಗಿ ಶ್ರಮಿಸುವುದು.",
    shadowEn: "Cold emotional aloofness, perfectionist intolerance of human frailties.",
    shadowKn: "ಅತಿಯಾದ ಗಾಂಭೀರ್ಯ, ಜನರ ಸಣ್ಣ ತಪ್ಪುಗಳನ್ನೂ ಸಹಿಸದಿರುವುದು.",
    turningAges: "31, 38, 46, 55",
    karmicWarningEn: "Do not isolate yourself behind high walls of moral superiority.",
    karmicWarningKn: "ಅತಿಯಾದ ಸತ್ಯವಂತಿಕೆಯ ನೆಪದಲ್ಲಿ ಎಲ್ಲರನ್ನೂ ದೂರವಿಟ್ಟು ಒಂಟಿಯಾಗಬೇಡಿ."
  },
  Shravana: {
    en: "Shravana",
    kn: "ಶ್ರವಣ",
    lordEn: "Chandra (Moon)",
    lordKn: "ಚಂದ್ರ",
    deityEn: "Lord Vishnu (Preserver of Cosmos)",
    deityKn: "ಶ್ರೀ ಮಹಾವಿಷ್ಣು",
    symbolEn: "Three Footprints / Sacred Ear",
    symbolKn: "ಕಿವಿಯ ಗುರುತು / ವಿಷ್ಣುಪಾದ",
    purposeEn: "Profound sacred listening, scholarly wisdom preservation, universal service.",
    purposeKn: "ಶ್ರವಣ ಭಕ್ತಿ, ವೇದ ಜ್ಞಾನ ಮತ್ತು ಸಮಾಜ ರಕ್ಷಣೆ.",
    karmicEn: "Listening before speaking; transmitting timeless wisdom to the next generation.",
    karmicKn: "ಸತ್ಯವನ್ನು ಸಮಾಧಾನದಿಂದ ಆಲಿಸಿ ಸನ್ಮಾರ್ಗದಲ್ಲಿ ಮುನ್ನಡೆಯುವುದು.",
    shadowEn: "Hypersensitivity to gossip, vindictive memory of insults, rigid skepticism.",
    shadowKn: "ಜನರ ಚಾಡಿ ಮಾತುಗಳಿಗೆ ತಲೆಕೆಡಿಸಿಕೊಳ್ಳುವುದು, ಹಳೆಯ ಅವಮಾನ ನೆನಪಿನಲ್ಲಿಡುವುದು.",
    turningAges: "22, 30, 39, 48",
    karmicWarningEn: "Do not let baseless slander from fools destabilize your sacred spiritual focus.",
    karmicWarningKn: "ದುರ್ಜನರ ಅಪಪ್ರಚಾರಕ್ಕೆ ಕಿವಿಗೊಟ್ಟು ನಿಮ್ಮ ಶಾಂತಿಯನ್ನು ಹಾಳುಮಾಡಿಕೊಳ್ಳಬೇಡಿ."
  },
  Dhanishta: {
    en: "Dhanishta",
    kn: "ಧನಿಷ್ಠ",
    lordEn: "Mangala (Mars)",
    lordKn: "ಮಂಗಳ",
    deityEn: "Ashta Vasus (Gods of Abundance)",
    deityKn: "ಅಷ್ಟ ವಸುಗಳು",
    symbolEn: "Damaru Drum / Flute",
    symbolKn: "ಡಮರುಗ / ಕೊಳಲು",
    purposeEn: "Rhythmic prosperity, musical genius, immense wealth manifestation, martial valor.",
    purposeKn: "ಸಂಗೀತ, ಅಪಾರ ಸಂಪತ್ತು, ಕೀರ್ತಿ ಮತ್ತು ನಾಯಕತ್ವ.",
    karmicEn: "Sharing cosmic wealth with the destitute without expectation of royal tribute.",
    karmicKn: "ಸಂಪತ್ತನ್ನು ಅಹಂಕಾರಕ್ಕೆ ಬಳಸದೆ ಬಡವರ ಕಲ್ಯಾಣಕ್ಕೆ ವಿನಿಯೋಗಿಸುವುದು.",
    shadowEn: "Greed, harsh materialism, marital discord due to domineering ego.",
    shadowKn: "ದುರಾಸೆ, ದಾಂಪತ್ಯದಲ್ಲಿ ಅತಿಯಾದ ಅಧಿಕಾರ ಚಲಾಯಿಸುವುದು.",
    turningAges: "24, 32, 40, 49",
    karmicWarningEn: "Keep financial dominance out of the bedroom; power struggles ruin your marriage.",
    karmicWarningKn: "ದಾಂಪತ್ಯ ಜೀವನದಲ್ಲಿ ಹಣ ಮತ್ತು ಅಧಿಕಾರದ ದರ್ಪ ತೋರಿಸಬೇಡಿ."
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
    purposeEn: "Mystic herbal medicine, penetrating cosmic secrets, spiritual solitude.",
    purposeKn: "ಆಯುರ್ವೇದ, ಯೋಗ ಚಿಕಿತ್ಸೆ ಮತ್ತು ನಿಗೂಢ ರಹಸ್ಯಗಳ ಭೇದನೆ.",
    karmicEn: "Transforming deep solitude into a healing sanctuary for wounded souls.",
    karmicKn: "ಏಕಾಂತವನ್ನು ಧ್ಯಾನಕ್ಕೆ ಬಳಸಿ ರೋಗಿಗಳಿಗೆ ಮತ್ತು ದುಃಖಿತರಿಗೆ ಚಿಕಿತ್ಸೆ ನೀಡುವುದು.",
    shadowEn: "Cynical misanthropy, severe emotional isolation, secretive addiction tendencies.",
    shadowKn: "ಜನರ ಮೇಲೆ ದ್ವೇಷ, ಅತಿಯಾದ ಒಂಟಿತನ, ದುಶ್ಚಟಗಳ ದಾಸನಾಗುವುದು.",
    turningAges: "28, 38, 50, 58",
    karmicWarningEn: "Do not bury your emotional grief in intoxicants or secretive destructive habits.",
    karmicWarningKn: "ದುಃಖ ಮರೆಯಲು ಯಾವುದೇ ದುಶ್ಚಟಗಳಿಗೆ ದಾಸರಾಗಬೇಡಿ."
  },
  "P.Bhadrapada": {
    en: "Purva Bhadrapada",
    kn: "ಪೂರ್ವ ಭಾದ್ರಪದ",
    lordEn: "Guru (Jupiter)",
    lordKn: "ಗುರು",
    deityEn: "Aja Ekapada (Serpent of Fire)",
    deityKn: "ಅಜೈಕಪಾದ ರುದ್ರ",
    symbolEn: "Two-Faced Man / Penance Seat",
    symbolKn: "ತಪಸ್ಸಿನ ಆಸನ",
    purposeEn: "Intense tapasya, fiery destruction of illusion, radical spiritual awakening.",
    purposeKn: "ಉಗ್ರ ತಪಸ್ಸು, ಮಾಯೆಯನ್ನು ಕಡಿದು ಹಾಕುವುದು ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಜಾಗೃತಿ.",
    karmicEn: "Sacrificing lower earthly desires to merge with supreme cosmic consciousness.",
    karmicKn: "ಸಾತ್ವಿಕ ತ್ಯಾಗದ ಮೂಲಕ ಪರಮಪದ ಹೊಂದುವುದು.",
    shadowEn: "Dark cynicism, cruel sudden ruthlessness, double life / split personality.",
    shadowKn: "ದ್ವಿಮುಖ ವ್ಯಕ್ತಿತ್ವ, ಕ್ರೂರ ನಿರ್ಧಾರಗಳು ಮತ್ತು ಅತಿಯಾದ ಸಿಟ್ಟು.",
    turningAges: "27, 36, 45, 54",
    karmicWarningEn: "Beware of secret double-standards; hypocrisy will explode into public scandal.",
    karmicWarningKn: "ರಹಸ್ಯ ದ್ವಿಮುಖ ಜೀವನ ನಡೆಸಬೇಡಿ; ಅದು ಸಮಾಜದಲ್ಲಿ ಮರ್ಯಾದೆ ಕಳೆಯಬಹುದು."
  },
  "U.Bhadrapada": {
    en: "Uttara Bhadrapada",
    kn: "ಉತ್ತರ ಭಾದ್ರಪದ",
    lordEn: "Shani (Saturn)",
    lordKn: "ಶನಿ",
    deityEn: "Ahirbudhnya (Serpent of Depths)",
    deityKn: "ಅಹಿರ್ಬುಧ್ನ್ಯ",
    symbolEn: "Twin Serpents in Deep Water",
    symbolKn: "ಆಳ ನೀರಿನಲ್ಲಿರುವ ನಾಗ",
    purposeEn: "Serene oceanic wisdom, kundalini containment, profound spiritual peace.",
    purposeKn: "ಶಾಂತ ಮನಸ್ಸು, ಆಳವಾದ ಜ್ಞಾನ ಮತ್ತು ಮೋಕ್ಷ ಸಾಧನೆ.",
    karmicEn: "Remaining an unshakeable anchor of peace while surrounded by chaotic worldly storms.",
    karmicKn: "ಸಂಕಷ್ಟದಲ್ಲೂ ಶಾಂತವಾಗಿ ಎಲ್ಲರಿಗೂ ಆಸರೆಯಾಗಿ ನಿಲ್ಲುವುದು.",
    shadowEn: "Lazy escapism into sleep, chronic procrastination under the guise of patience.",
    shadowKn: "ಸೋಮಾರಿತನ, ತಾಳ್ಮೆಯ ನೆಪದಲ್ಲಿ ಕೆಲಸ ಮುಂದೂಡುವುದು.",
    turningAges: "28, 37, 46, 55",
    karmicWarningEn: "Do not confuse spiritual patience with cowardly avoidance of necessary action.",
    karmicWarningKn: "ಅಗತ್ಯ ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳದೆ ಕೇವಲ ತಾಳ್ಮೆಯ ನೆಪವೊಡ್ಡಿ ಸೋಲಬೇಡಿ."
  },
  Revati: {
    en: "Revati",
    kn: "ರೇವತಿ",
    lordEn: "Budha (Mercury)",
    lordKn: "ಬುಧ",
    deityEn: "Pushan (Nourisher of Travelers)",
    deityKn: "ಪೂಷನ್ ದೇವ",
    symbolEn: "Pair of Swimming Fish",
    symbolKn: "ಮೀನುಗಳ ಜೋಡಿ",
    purposeEn: "Guiding lost souls, unconditional cosmic compassion, final spiritual completion.",
    purposeKn: "ದಾರಿತಪ್ಪಿದವರಿಗೆ ಮಾರ್ಗದರ್ಶನ, ಅಹಿಂಸೆ ಮತ್ತು ಮೋಕ್ಷ.",
    karmicEn: "Concluding the karmic wheel of 27 stars with total forgiveness and boundless love.",
    karmicKn: "ಎಲ್ಲರನ್ನೂ ಕ್ಷಮಿಸಿ ಕರುಣೆಯಿಂದ ಬದುಕಿ ಮುಕ್ತಿ ಪಡೆಯುವುದು.",
    shadowEn: "Naive savior complex, getting exploited by con artists, financial boundary erosion.",
    shadowKn: "ಮೋಸಗಾರರಿಗೆ ಬಲಿಯಾಗುವುದು, ಹಣಕಾಸಿನಲ್ಲಿ ಅತಿಯಾದ ಉದಾರತೆ ತೋರಿ ಮೋಸಹೋಗುವುದು.",
    turningAges: "22, 30, 42, 51",
    karmicWarningEn: "Never loan money without legal collateral; your naive pity invites predatory vultures.",
    karmicWarningKn: "ದಾಖಲೆ ಇಲ್ಲದೆ ಯಾರಿಗೂ ಸಾಲ ಕೊಡಬೇಡಿ; ನಿಮ್ಮ ಕರುಣೆಯನ್ನೇ ದುರುಪಯೋಗಪಡಿಸಿಕೊಳ್ಳುತ್ತಾರೆ."
  }
};

/**
 * Generates an incisive, razor-sharp Vedic prediction reading
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
    const remedyText = `ಪ್ರತಿದಿನ ಸಂಜೆ 11 ಬಾರಿ ಓಂ ನಮಃ ಶಿವಾಯ ಅಥವಾ ${rashi.lordKn} ಬೀಜಮಂತ್ರ ಜಪಿಸಿ. ${rashi.luckyColorKn} ವಸ್ತ್ರ ಧರಿಸಿ, ಪ್ರತಿ ಶನಿವಾರ ಪಕ್ಷಿಗಳಿಗೆ ಅಥವಾ ನಿರ್ಗತಿಕರಿಗೆ ಆಹಾರ ದಾನ ಮಾಡಿ.`;
    const predictionText = `🌌 **Cosmic Blueprint**
${name}, ನಿಮ್ಮ ಜನ್ಮ ಲಗ್ನ/ರಾಶಿ ${rashi.kn} (${rashi.lordKn} ಅಧಿಪತಿ) ಹಾಗೂ ನಕ್ಷತ್ರ ${nakshatra.kn} (ಪಾದ ${pada}). ನಿಮ್ಮಲ್ಲಿ ${rashi.strengthsKn} ಸಹಜವಾಗಿಯೇ ಇದೆ. ಆದರೆ ${rashi.shadowKn} ಎಂಬ ಆಂತರಿಕ ಸವಾಲನ್ನು ಎದುರಿಸುತ್ತಿದ್ದೀರಿ.

🕉️ **Life Purpose & Atma Dharma**
ನಿಮ್ಮ ಆತ್ಮದ ಮುಖ್ಯ ಗುರಿ ${nakshatra.purposeKn} ${nakshatra.turningAges} ನೇ ವಯಸ್ಸಿನಲ್ಲಿ ನಿಮ್ಮ ಜೀವನದ ಬಹುಮುಖ್ಯ ತಿರುವುಗಳು ಸಂಭವಿಸುತ್ತವೆ.

🕰️ **Karmic Shadow & Vulnerability (ಆಂತರಿಕ ದೋಷ)**
⚠️ **ಎಚ್ಚರಿಕೆ:** ${nakshatra.karmicWarningKn} ನಿಮ್ಮ ಆರೋಗ್ಯದಲ್ಲಿ ${rashi.healthVulnKn} ಬಾಧಿಸದಂತೆ ಎಚ್ಚರ ವಹಿಸಿ.

🚀 **Planetary Trajectory**
${rashi.lordKn} ರ ಪ್ರಭಾವದಿಂದ ಮುಂಬರುವ ದಿನಗಳಲ್ಲಿ ನಿಮ್ಮ ಹಳೆಯ ಪರಿಶ್ರಮಕ್ಕೆ ಫಲ ಸಿಗಲಿದೆ. ಆದರೆ ಆತುರದ ನಿರ್ಧಾರ ಮತ್ತು ಬೇರೆಯವರನ್ನು ಕುರುಡಾಗಿ ನಂಬುವುದನ್ನು ನಿಲ್ಲಿಸಬೇಕು.

💼 **Dharma & Prosperity Key**
ಅದೃಷ್ಟ ರತ್ನ: **${rashi.gemstoneKn}** | ಶುಭ ವರ್ಣ: **${rashi.luckyColorKn}** | ಆರಾಧ್ಯ ದೈವ: **${rashi.deityKn}**.

✨ **AstroSage Divine Remedy**
[REMEDY]${remedyText}[/REMEDY]`;

    return { prediction: predictionText, remedy: remedyText };
  } else {
    const remedyText = `Recite the sacred Kavach of ${rashi.deityEn} at dusk. Feed stray animals or black sesame to birds on Saturdays, and wear ${rashi.luckyColorEn} on key negotiations.`;
    const predictionText = `🌌 **Cosmic Blueprint**
${name}, you operate under ${rashi.en} ruled by ${rashi.lordEn}, centered in ${nakshatra.en} (Pada ${pada}). While endowed with ${rashi.strengthsEn}, your greatest internal adversary is ${rashi.shadowEn}.

🕉️ **Life Purpose & Atma Dharma**
Your core trajectory demands ${nakshatra.purposeEn} Major catalytic shifts crystallize around ages **${nakshatra.turningAges}**.

🕰️ **Karmic Shadow & Vulnerability**
⚠️ **Crucial Karmic Trap:** ${nakshatra.karmicWarningEn} Pay close attention to physiological vulnerabilities in **${rashi.healthVulnEn}**.

🚀 **Planetary Trajectory**
As ${rashi.lordEn} transitions, long-suppressed endeavors gain traction. Stop leaking vital energy to unappreciative dependents and seize your sovereign boundaries.

💼 **Dharma & Prosperity Key**
Resonance Gemstone: **${rashi.gemstoneEn}** | Power Colors: **${rashi.luckyColorEn}** | Deity: **${rashi.deityEn}**.

✨ **AstroSage Divine Remedy**
[REMEDY]${remedyText}[/REMEDY]`;

    return { prediction: predictionText, remedy: remedyText };
  }
}

/**
 * Intelligent Incisive Vedic Astrology Dialogue Generator for Chat Fallback
 */
export function generateVedicChatResponse(userMessage: string, profile?: SeekerProfile, language: 'en' | 'kn' = 'en'): string {
  const query = (userMessage || '').toLowerCase().trim();
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
  const pada = profile?.pada || '1';

  // Deterministic seed based on query length and time for variation
  const queryHash = query.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variant = queryHash % 3;

  if (isKn) {
    // 1. Greetings
    if (query === 'hi' || query === 'hello' || query === 'namaste' || query === 'ನಮಸ್ಕಾರ' || query === 'ಹಲೋ') {
      return `ನಮಸ್ಕಾರ ${name}! ನಾನು ಆಸ್ಟ್ರೋಸೇಜ್ (AstroSage). ನಿಮ್ಮ ${rashi.kn} ರಾಶಿ ಮತ್ತು ${nakshatra.kn} ನಕ್ಷತ್ರದ ಗ್ರಹಗತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿದ್ದೇನೆ. ನಿಮ್ಮ ವೃತ್ತಿ, ಹಣಕಾಸು, ವಿವಾಹ ಅಥವಾ ಯಾವುದೇ ಆಧ್ಯಾತ್ಮಿಕ ಪ್ರಶ್ನೆಗಳನ್ನು ಮುಕ್ತವಾಗಿ ಕೇಳಿ.`;
    }

    // 2. Shani / Sade Sati / Dasha / Hardship
    if (query.includes('ಶನಿ') || query.includes('ದಶೆ') || query.includes('ಸಾಡೇ') || query.includes('ಕಷ್ಟ') || query.includes('ಶನಿವಾರ') || query.includes('shani')) {
      if (variant === 0) {
        return `${name}, ಶನಿ ಮಹಾರಾಜರು ಕಟು ಸತ್ಯವನ್ನು ಕಲಿಸುವ ಕರ್ಮಫಲದಾತರು. ನಿಮ್ಮ ${rashi.kn} ರಾಶಿಯ ಮೇಲೆ ಶನಿಯ ಸಂಚಾರವು ಸುಳ್ಳು ಭ್ರಮೆಗಳನ್ನು ಮತ್ತು ಸೋಮಾರಿತನವನ್ನು ಸುಟ್ಟು ಹಾಕುತ್ತದೆ.\n⚠️ ನಿಮ್ಮ ಪ್ರಮುಖ ಆಂತರಿಕ ದೋಷ: ${rashi.shadowKn}.\nಪರಿಹಾರ: ಪ್ರತಿ ಶನಿವಾರ ಸಂಜೆ ಹನುಮಾನ್ ಚಾಲೀಸಾ ಪಠಿಸಿ, ನಿರ್ಗತಿಕರಿಗೆ ಎಳ್ಳೆಣ್ಣೆ ದೀಪ ಹಚ್ಚಿ. ಶಿಸ್ತಿನಿಂದ ಕೆಲಸ ಮಾಡಿದರೆ ಶನಿಯೇ ಮಹಾನ್ ರಾಜಯೋಗ ಕರುಣಿಸುತ್ತಾನೆ.`;
      } else if (variant === 1) {
        return `ಶನಿ ದೇವನು ಕಷ್ಟ ನೀಡುತ್ತಿಲ್ಲ, ನಿಮ್ಮ ಕರ್ಮದ ಲೆಕ್ಕವನ್ನು ಚುಕ್ತಾ ಮಾಡುತ್ತಿದ್ದಾನೆ ${name}. ${rashi.kn} ರಾಶಿಗೆ ಶನಿಯ ಪಾಠ ಕಠಿಣವಾದರೂ, ನಿಮ್ಮ ಶಕ್ತಿ ${rashi.strengthsKn}.\nಪರಿಹಾರ: ಶನಿವಾರ ಕಪ್ಪು ಎಳ್ಳು ಅಥವಾ ಕಾಗೆಗಳಿಗೆ ಅನ್ನ ಹಾಕಿ. ಕಷ್ಟದ ಸಮಯದಲ್ಲೂ ನೀತಿ ಧರ್ಮವನ್ನು ಬಿಡಬೇಡಿ.`;
      } else {
        return `${name}, ಶನಿ ದಶಾ ಕಾಲದಲ್ಲಿ ಆತುರ ಮತ್ತು ಕೋಪ ನಿಮ್ಮ ದೊಡ್ಡ ಶತ್ರು. ${nakshatra.kn} ನಕ್ಷತ್ರದವರಿಗೆ ${nakshatra.karmicWarningKn}\nಪ್ರತಿದಿನ ಸಂಜೆ ರುದ್ರಾಕ್ಷಿ ಮಾಲೆಯಲ್ಲಿ "ಓಂ ಶಂ ಶನೈಶ್ಚರಾಯ ನಮಃ" 108 ಬಾರಿ ಜಪಿಸಿ.`;
      }
    }

    // 3. Career / Job / Promotion / Business / Money
    if (query.includes('ವೃತ್ತಿ') || query.includes('ಕೆಲಸ') || query.includes('ಉದ್ಯೋಗ') || query.includes('ಪ್ರಮೋಷನ್') || query.includes('ಹಣ') || query.includes('ಸಾಲ') || query.includes('ವ್ಯಾಪಾರ') || query.includes('business') || query.includes('career') || query.includes('job') || query.includes('money')) {
      if (variant === 0) {
        return `ನಿಮ್ಮ ${rashi.kn} ರಾಶಿ ಮತ್ತು ${nakshatra.kn} ನಕ್ಷತ್ರದ ಪ್ರಕಾರ, ನಿಮ್ಮ ವೃತ್ತಿಯಲ್ಲಿ ಯಶಸ್ಸಿಗೆ ಅಡ್ಡಿಯಾಗುತ್ತಿರುವುದು ನಿಮ್ಮ ${rashi.shadowKn}.\n⚠️ ಎಚ್ಚರಿಕೆ: ${nakshatra.karmicWarningKn}\nನಿಮಗೆ ${nakshatra.turningAges} ನೇ ವಯಸ್ಸಿನಲ್ಲಿ ಮಹಾನ್ ಆರ್ಥಿಕ ಪ್ರಗತಿ ಉಂಟಾಗುತ್ತದೆ. ಗುರುವಾರ ಅಥವಾ ಭಾನುವಾರ ಪ್ರಮುಖ ನಿರ್ಧಾರಗಳನ್ನು ಕೈಗೊಳ್ಳಿ.`;
      } else if (variant === 1) {
        return `${name}, ನಿಮ್ಮ ರಾಶ್ಯಾಧಿಪತಿ ${rashi.lordKn} ನಿಮ್ಮ ಕಠಿಣ ಪರಿಶ್ರಮವನ್ನು ಗಮನಿಸುತ್ತಿದ್ದಾನೆ. ಅನಗತ್ಯ ಖರ್ಚುಗಳನ್ನು ನಿಯಂತ್ರಿಸಿ.\nಶುಭ ರತ್ನ: **${rashi.gemstoneKn}** ಧರಿಸುವುದರಿಂದ ವೃತ್ತಿಯಲ್ಲಿ ಸ್ಥಿರತೆ ಮತ್ತು ಬಡ್ತಿ ಲಭಿಸುತ್ತದೆ.\nವ್ಯಾಪಾರದಲ್ಲಿ ನಂಬಿಕಸ್ಥರ ಜೊತೆ ಮಾತ್ರ ಒಪ್ಪಂದ ಮಾಡಿಕೊಳ್ಳಿ.`;
      } else {
        return `ಆರ್ಥಿಕ ಕ್ಷೇತ್ರದಲ್ಲಿ ${nakshatra.kn} ನಕ್ಷತ್ರದವರು ಅದ್ಭುತ ಸಾಧನೆ ಮಾಡಬಲ್ಲರು. ಆದರೆ ನಿಮ್ಮ ಹಣ ಸೋರಿಕೆಗೆ ಕಾರಣ: ${rashi.shadowKn}.\nಪರಿಹಾರ: ಲಕ್ಷ್ಮೀ ನಾರಾಯಣ ಹೃದಯ ಸ್ತೋತ್ರ ಪಠಿಸಿ ಮತ್ತು ${rashi.luckyColorKn} ವರ್ಣದ ವಸ್ತುಗಳನ್ನು ಬಳಸಿ.`;
      }
    }

    // 4. Marriage / Love / Relationship
    if (query.includes('ಮದುವೆ') || query.includes('ಸಂಬಂಧ') || query.includes('ದಾಂಪತ್ಯ') || query.includes('ಪ್ರೀತಿ') || query.includes('ಲವ್') || query.includes('marriage') || query.includes('love') || query.includes('divorce')) {
      if (variant === 0) {
        return `ನಿಮ್ಮ ಸಂಬಂಧದಲ್ಲಿ ಬಿರುಕು ಮೂಡಲು ಮುಖ್ಯ ಕಾರಣ: ನಿಮ್ಮ ಅತಿಯಾದ ನಿರೀಕ್ಷೆ ಮತ್ತು ${rashi.shadowKn}.\nಸಂಗಾತಿಯನ್ನು ಬದಲಾಯಿಸಲು ಪ್ರಯತ್ನಿಸಬೇಡಿ; ನಿಮ್ಮ ಸಿಟ್ಟನ್ನು ನಿಯಂತ್ರಿಸಿ.\nಶುಕ್ರವಾರದಂದು ${rashi.deityKn} ರನ್ನು ಪ್ರಾರ್ಥಿಸಿ ಮತ್ತು ಹಾಲಿನ ನೈವೇದ್ಯ ಅರ್ಪಿಸಿ.`;
      } else {
        return `${name}, ${rashi.kn} ರಾಶಿಯವರ ಪ್ರೇಮ ಜೀವನದಲ್ಲಿ ಅಹಂಕಾರ ಮತ್ತು ಸಂವಹನದ ಕೊರತೆ ಅಡ್ಡಿಯಾಗುತ್ತದೆ. ${nakshatra.kn} ಪಾದ ${pada} ದ ಶಕ್ತಿ ಶಾಂತಿಯನ್ನು ಬಯಸುತ್ತದೆ.\nಪರಿಹಾರ: ಶುಕ್ರವಾರ ಗೌರೀ-ಶಂಕರ ಪೂಜೆ ಮಾಡಿ. ಸಂಗಾತಿಯೊಂದಿಗೆ ತೆರೆದ ಮನಸ್ಸಿನಿಂದ ಮಾತನಾಡಿ.`;
      }
    }

    // 5. Health / Mental Peace / Anxiety
    if (query.includes('ಆರೋಗ್ಯ') || query.includes('ಮನಸ್ಸು') || query.includes('ನೆಮ್ಮದಿ') || query.includes('ಶಾಂತಿ') || query.includes('ಆತಂಕ') || query.includes('ಕಾಯಿಲೆ') || query.includes('health') || query.includes('peace') || query.includes('stress')) {
      return `${name}, ನಿಮ್ಮ ಜಾತಕದ ಪ್ರಕಾರ ಶಾರೀರಿಕ ದುರ್ಬಲತೆ: **${rashi.healthVulnKn}**.\nಅತಿಯಾದ ಮಾನಸಿಕ ಒತ್ತಡವು ನಿಮ್ಮ ರೋಗನಿರೋಧಕ ಶಕ್ತಿಯನ್ನು ಕುಂದಿಸುತ್ತದೆ.\nಪರಿಹಾರ: ಪ್ರತಿದಿನ ಬೆಳಿಗ್ಗೆ 15 ನಿಮಿಷ ಪ್ರಾಣಾಯಾಮ ಮಾಡಿ. ${rashi.deityKn} ರ ಧ್ಯಾನವು ನಿಮಗೆ ಅಗಾಧ ಮಾನಸಿಕ ನೆಮ್ಮದಿ ನೀಡುತ್ತದೆ.`;
    }

    // 6. Rahu / Ketu / Dosha / Evil Eye / Enemies
    if (query.includes('ರಾಹು') || query.includes('ಕೇತು') || query.includes('ದೋಷ') || query.includes('ದೃಷ್ಟಿ') || query.includes('ಶತ್ರು') || query.includes('ಮಾಟ') || query.includes('rahu') || query.includes('ketu') || query.includes('dosha')) {
      return `${name}, ನಿಮ್ಮ ನಕ್ಷತ್ರ ${nakshatra.kn} ನ ಅಧಿಪತಿ ${nakshatra.lordKn}. ಯಾವುದೇ ನಕಾರಾತ್ಮಕ ಶಕ್ತಿ ಅಥವಾ ದೃಷ್ಟಿದೋಷವನ್ನು ಹೋಗಲಾಡಿಸಲು ಸುದರ್ಶನ ಮಂತ್ರ ಅಥವಾ ದುರ್ಗಾ ಕವಚ ಪಠಿಸಿ.\nಶತ್ರುಗಳ ಕುತಂತ್ರಕ್ಕೆ ಹೆದರಬೇಡಿ; ನಿಮ್ಮ ಸತ್ಯ ಧರ್ಮವೇ ನಿಮ್ಮನ್ನು ರಕ್ಷಿಸುತ್ತದೆ.`;
    }

    // 7. Gemstone / Mantra / Lucky Color
    if (query.includes('ರತ್ನ') || query.includes('ಬಣ್ಣ') || query.includes('ಮಂತ್ರ') || query.includes('ಅದೃಷ್ಟ') || query.includes('gemstone') || query.includes('color') || query.includes('lucky')) {
      return `ನಿಮ್ಮ ${rashi.kn} (${nakshatra.kn}) ದೈವಿಕ ಅಂಶಗಳು:\n💎 ಅದೃಷ್ಟ ರತ್ನ: **${rashi.gemstoneKn}**\n🎨 ಶುಭ ವರ್ಣ: **${rashi.luckyColorKn}**\n🕉️ ಆರಾಧ್ಯ ದೈವ: **${rashi.deityKn}**\n✨ ಪ್ರಮುಖ ಬದಲಾವಣೆಯ ವಯಸ್ಸು: **${nakshatra.turningAges}**.`;
    }

    // 8. Spiritual / Purpose / Moksha
    if (query.includes('ಆಧ್ಯಾತ್ಮ') || query.includes('ಗುರಿ') || query.includes('ಮೋಕ್ಷ') || query.includes('ಧ್ಯಾನ') || query.includes('ದೇವರು') || query.includes('god') || query.includes('spiritual')) {
      return `${name}, ನಿಮ್ಮ ಆತ್ಮದ ಮುಖ್ಯ ಧ್ಯೇಯ: **${nakshatra.purposeKn}**\nನಿಮ್ಮ ಕರ್ಮ ಸಾಧನೆ: ${nakshatra.karmicKn}.\nದೈನಂದಿನ ಜೀವನದಲ್ಲಿ ಸತ್ಯ ಮತ್ತು ಪರೋಪಕಾರವನ್ನು ಆಚರಿಸುವುದೇ ಅತ್ಯುನ್ನತ ಪೂಜೆ.`;
    }

    // Default Incisive Insight
    return `${name}, ನಿಮ್ಮ ${rashi.kn} ರಾಶಿ ಹಾಗೂ ${nakshatra.kn} (ಪಾದ ${pada}) ನಕ್ಷತ್ರದ ಗ್ರಹಗತಿಗಳ ನಿಖರ ದರ್ಶನ:\n✨ ನಿಮ್ಮ ನೈಸರ್ಗಿಕ ಶಕ್ತಿ: ${rashi.strengthsKn}.\n⚠️ ನಿಮ್ಮ ಮುಖ್ಯ ಆಂತರಿಕ ದೋಷ: ${rashi.shadowKn}.\n${nakshatra.karmicWarningKn}\nನಿಮ್ಮ ಪ್ರಮುಖ ಜೀವನದ ತಿರುವುಗಳು ${nakshatra.turningAges} ನೇ ವಯಸ್ಸಿನಲ್ಲಿ ಆರಂಭವಾಗುತ್ತವೆ. ನಿಷ್ಠೆಯಿಂದ ಕರ್ತವ್ಯ ಮಾಡಿ!`;
  } else {
    // ENGLISH DIALOGUE LOGIC
    // 1. Greetings
    if (query === 'hi' || query === 'hello' || query === 'namaste' || query === 'hey' || query === 'greetings') {
      return `Greetings ${name}! I am AstroSage. The cosmic alignments for ${rashi.en} under the influence of ${nakshatra.en} (Pada ${pada}) are vivid. What specific dimension of your life—career, finance, relationships, or karmic path—shall we examine today?`;
    }

    // 2. Shani / Saturn / Sade Sati / Difficult Periods
    if (query.includes('shani') || query.includes('saturn') || query.includes('sade') || query.includes('dasha') || query.includes('struggle') || query.includes('suffering') || query.includes('hardship')) {
      if (variant === 0) {
        return `${name}, Lord Shani does not punish without divine intent; He strips away arrogance and illusions.\n⚠️ Your critical vulnerability under Saturn's gaze: **${rashi.shadowEn}**.\nRemedy: Recite the Hanuman Chalisa at twilight on Saturdays and feed black sesame seeds to crows or stray animals. Through disciplined work, Saturn turns hardships into an unshakeable empire.`;
      } else if (variant === 1) {
        return `Saturn's transit across ${rashi.en} demands ruthless accountability. You are being forced to refine your core strength: **${rashi.strengthsEn}**.\nDo not look for shortcuts or escape routes. Honor all ethical obligations and face your responsibilities directly.`;
      } else {
        return `${name}, during major Saturn periods, haste is your greatest poison. For ${nakshatra.en}, ${nakshatra.karmicWarningEn}\nChant "Om Sham Shanaishcharaya Namah" 108 times at dusk on Saturdays.`;
      }
    }

    // 3. Career / Business / Promotion / Wealth / Money
    if (query.includes('career') || query.includes('job') || query.includes('work') || query.includes('business') || query.includes('promotion') || query.includes('money') || query.includes('wealth') || query.includes('finance') || query.includes('debt') || query.includes('switch')) {
      if (variant === 0) {
        return `For your ${rashi.en} alignment in ${nakshatra.en}, career breakthroughs are obstructed by **${rashi.shadowEn}**.\n⚠️ Strategic Warning: ${nakshatra.karmicWarningEn}\nPivotal inflection ages occur around **${nakshatra.turningAges}**. Take decisive command on Thursdays and Sundays.`;
      } else if (variant === 1) {
        return `${name}, planetary ruler ${rashi.lordEn} dictates that your financial prosperity is tied to **${nakshatra.purposeEn}**.\nResonance Gemstone: **${rashi.gemstoneEn}** will protect your wealth pipeline.\nAvoid speculative high-risk gambles and focus on structured, long-term asset building.`;
      } else {
        return `Your nakshatra ${nakshatra.en} possesses unmatched potential for leadership. However, financial leaks occur when you succumb to **${rashi.shadowEn}**.\nRemedy: Offer white flowers or donate to students/scholars on Wednesdays to activate Mercury and Jupiter harmonics.`;
      }
    }

    // 4. Marriage / Love / Relationship
    if (query.includes('marriage') || query.includes('love') || query.includes('relationship') || query.includes('partner') || query.includes('spouse') || query.includes('divorce') || query.includes('breakup') || query.includes('soulmate')) {
      if (variant === 0) {
        return `Relationship friction in your chart stems directly from **${rashi.shadowEn}**.\nStop projecting impossible ideals onto mortal partners; cultivate open vulnerability.\nRemedy: Worship **${rashi.deityEn}** on Fridays and wear **${rashi.luckyColorEn}** accents to harmonize Venusian frequencies.`;
      } else {
        return `${name}, ${rashi.en} creates intense passions, but ${nakshatra.en} requires authentic spiritual friendship as the foundation of marriage.\nNever settle unresolved grievances in anger. Dedicate Friday twilight to silence and heart-centered communication.`;
      }
    }

    // 5. Health / Mental Peace / Stress / Anxiety
    if (query.includes('health') || query.includes('illness') || query.includes('peace') || query.includes('mental') || query.includes('stress') || query.includes('anxiety') || query.includes('depression') || query.includes('sleep')) {
      return `${name}, your Vedic constitution highlights physiological vulnerability in: **${rashi.healthVulnEn}**.\nChronic worry depletes your vital Ojas (life force).\nRemedy: Practice 15 minutes of Nadi Shodhana Pranayama at dawn. Meditate upon **${rashi.deityEn}** to restore neurological and cellular equilibrium.`;
    }

    // 6. Rahu / Ketu / Dosha / Protection / Evil Eye
    if (query.includes('rahu') || query.includes('ketu') || query.includes('dosha') || query.includes('evil') || query.includes('nazar') || query.includes('enemy') || query.includes('curse')) {
      return `${name}, your nakshatra ${nakshatra.en} is governed by **${nakshatra.lordEn}**. To dissolve psychic debris, jealousy, or shadow doshas, recite the Mahamrityunjaya Mantra 11 times daily.\nYour righteous integrity is an impenetrable cosmic shield.`;
    }

    // 7. Gemstone / Lucky Color / Numbers
    if (query.includes('gemstone') || query.includes('stone') || query.includes('color') || query.includes('lucky') || query.includes('number') || query.includes('mantra')) {
      return `Cosmic alignments for ${rashi.en} (${nakshatra.en} - Pada ${pada}):\n💎 Resonance Gemstone: **${rashi.gemstoneEn}**\n🎨 Harmonious Colors: **${rashi.luckyColorEn}**\n🕉️ Presiding Deity: **${rashi.deityEn}**\n🌟 Major Destiny Milestones: **Ages ${nakshatra.turningAges}**.`;
    }

    // 8. Spiritual Awakening / Purpose / Dharma
    if (query.includes('spiritual') || query.includes('purpose') || query.includes('dharma') || query.includes('moksha') || query.includes('god') || query.includes('meditation')) {
      return `${name}, your incarnation's supreme purpose is: **${nakshatra.purposeEn}**\nYour evolutionary lesson: **${nakshatra.karmicEn}**.\nAnchor yourself in daily selfless service and sacred devotion.`;
    }

    // Default Incisive Insight
    return `${name}, here is the incisive celestial diagnosis for ${rashi.en} (${nakshatra.en} - Pada ${pada}):\n✨ Core Gift: **${rashi.strengthsEn}**.\n⚠️ Unconscious Shadow Trap: **${rashi.shadowEn}**.\n${nakshatra.karmicWarningEn}\nTransformational life cycles activate powerfully around ages **${nakshatra.turningAges}**. Stay anchored in truth.`;
  }
}
