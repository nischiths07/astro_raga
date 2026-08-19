/**
 * Security & Input Sanitization Utilities for AstroRaga
 * ----------------------------------------------------
 * Hardens the platform against:
 * 1. Prompt Injections & Jailbreaks
 * 2. Cross-Site Scripting (XSS)
 * 3. SQL / Parameter Injection
 * 4. Memory Exhaustion / Payload Inflation
 * 5. SSRF / Malicious Parameter Tampering
 */

/**
 * Strips dangerous HTML tags and script elements
 */
export function sanitizeText(input: unknown, maxLength: number = 500): string {
  if (typeof input !== 'string') return '';

  let sanitized = input
    // Trim whitespace
    .trim()
    // Remove control characters (except standard newlines)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Strip HTML tags
    .replace(/<[^>]*>?/gm, '')
    // Escape common injection tokens
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '');

  // Clamp string length to prevent memory / token exhaustion attacks
  return sanitized.slice(0, maxLength);
}

/**
 * Defends AI prompts against Jailbreak and Prompt Injection patterns
 */
export function sanitizeForAIPrompt(userInput: unknown, maxLength: number = 600): string {
  let text = sanitizeText(userInput, maxLength);

  // Common prompt injection attack patterns & system prompt override attempts
  const dangerousPatterns = [
    /<\|im_start\|>/gi,
    /<\|im_end\|>/gi,
    /<\|system\|>/gi,
    /<\|assistant\|>/gi,
    /<\|user\|>/gi,
    /\[SYSTEM_PROMPT\]/gi,
    /\[INST\]/gi,
    /\[\/INST\]/gi,
    /ignore all previous instructions/gi,
    /disregard all previous instructions/gi,
    /ignore the above instructions/gi,
    /system override/gi,
    /developer mode enabled/gi
  ];

  for (const pattern of dangerousPatterns) {
    text = text.replace(pattern, '[filtered]');
  }

  return text;
}

/**
 * Validates email with strict RFC regex and max length
 */
export function isValidEmail(email: unknown): boolean {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length > 254 || trimmed.length < 5) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

/**
 * Validates allowed Rashi / Nakshatra values
 */
const ALLOWED_RASHIS = new Set([
  'mesha', 'vrishabha', 'mithuna', 'karka', 'simha', 'kanya', 'tula', 'vrishchika', 'dhanu', 'makara', 'kumbha', 'meena',
  'ಮೇಷ', 'ವೃಷಭ', 'ಮಿಥುನ', 'ಕರ್ಕ', 'ಸಿಂಹ', 'ಕನ್ಯಾ', 'ತುಲಾ', 'ವೃಶ್ಚಿಕ', 'ಧನುಸ್ಸು', 'ಮಕರ', 'ಕುಂಭ', 'ಮೀನ'
]);

const ALLOWED_NAKSHATRAS = new Set([
  'ashwini', 'bharani', 'krittika', 'rohini', 'mrigashira', 'ardra', 'punarvasu', 'pushya', 'ashlesha',
  'magha', 'p.phalguni', 'u.phalguni', 'hasta', 'chitra', 'swati', 'vishakha', 'anuradha', 'jyeshtha',
  'mula', 'p.ashadha', 'u.ashadha', 'shravana', 'dhanishta', 'shatabhisha', 'p.bhadrapada', 'u.bhadrapada', 'revati',
  'ಅಶ್ವಿನಿ', 'ಭರಣಿ', 'ಕೃತಿಕಾ', 'ರೋಹಿಣಿ', 'ಮೃಗಶಿರ', 'ಆರ್ದ್ರಾ', 'ಪುನರ್ವಸು', 'ಪುಷ್ಯ', 'ಆಶ್ಲೇಷ',
  'ಮಘಾ', 'ಪೂ.ಫಲ್ಗುಣಿ', 'ಉ.ಫಲ್ಗುಣಿ', 'ಹಸ್ತ', 'ಚಿತ್ತಾ', 'ಸ್ವಾತಿ', 'ವಿಶಾಖ', 'ಅನುರಾಧ', 'ಜ್ಯೇಷ್ಠ',
  'ಮೂಲಾ', 'ಪೂ.ಆಷಾಢ', 'ಉ.ಆಷಾಢ', 'ಶ್ರವಣ', 'ಧನಿಷ್ಠ', 'ಶತಭಿಷ', 'ಪೂ.ಭಾದ್ರಪದ', 'ಉ.ಭಾದ್ರಪದ', 'ರೇವತಿ'
]);

export function sanitizeRashi(input: unknown): string {
  const sanitized = sanitizeText(input, 30);
  if (ALLOWED_RASHIS.has(sanitized.toLowerCase())) {
    return sanitized;
  }
  return 'Mesha';
}

export function sanitizeNakshatra(input: unknown): string {
  const sanitized = sanitizeText(input, 30);
  if (ALLOWED_NAKSHATRAS.has(sanitized.toLowerCase())) {
    return sanitized;
  }
  return 'Ashwini';
}

export function sanitizePada(input: unknown): string {
  const val = String(input || '').trim();
  if (['1', '2', '3', '4'].includes(val)) {
    return val;
  }
  return '1';
}
