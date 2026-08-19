import { NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { sanitizeText } from '@/lib/security';

const ALLOWED_LANGUAGES = new Set(['kn', 'en', 'hi', 'kn-in', 'en-in', 'en-us', 'en-gb']);

export async function GET(request: Request) {
  try {
    // 1. Rate Limiting Protection (Anti-Proxy Abuse)
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(`tts:${clientIp}`, { windowSeconds: 60, maxRequests: 60 });
    if (!rateLimit.allowed) {
      return new NextResponse('Too many audio requests. Please wait a moment.', { 
        status: 429,
        headers: { 'Retry-After': String(rateLimit.resetInSeconds) }
      });
    }

    const { searchParams } = new URL(request.url);
    const rawText = searchParams.get('text') || '';
    const rawLang = searchParams.get('lang') || 'kn';

    if (!rawText || !rawText.trim()) {
      return new NextResponse('Text parameter is required', { status: 400 });
    }

    // 2. Strict Parameter Validation
    const langNormalized = rawLang.trim().toLowerCase();
    const lang = ALLOWED_LANGUAGES.has(langNormalized) ? langNormalized : 'kn';
    const cleanText = sanitizeText(rawText, 150);

    if (!cleanText) {
      return new NextResponse('Invalid text input', { status: 400 });
    }
    
    // Multiple client endpoints for robustness
    const urls = [
      `https://translate.google.com/translate_tts?ie=UTF-8&tl=${encodeURIComponent(lang)}&client=gtx&q=${encodeURIComponent(cleanText)}`,
      `https://translate.google.com/translate_tts?ie=UTF-8&tl=${encodeURIComponent(lang)}&client=tw-ob&q=${encodeURIComponent(cleanText)}`
    ];

    let lastStatus = 500;

    for (const ttsUrl of urls) {
      try {
        const response = await fetch(ttsUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'audio/mpeg,audio/*;q=0.9,*/*;q=0.8',
            'Referer': 'https://translate.google.com/'
          }
        });

        if (response.ok) {
          const data = await response.arrayBuffer();
          return new NextResponse(data, {
            headers: {
              'Content-Type': 'audio/mpeg',
              'Cache-Control': 'public, max-age=86400, s-maxage=86400',
              'X-Content-Type-Options': 'nosniff'
            }
          });
        }
        lastStatus = response.status;
      } catch (e) {
        // Try fallback endpoint
      }
    }

    return new NextResponse('Audio synthesis unavailable', { status: lastStatus });
  } catch (error) {
    return new NextResponse('Internal server error', { status: 500 });
  }
}
