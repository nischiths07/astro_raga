import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text') || '';
    const lang = searchParams.get('lang') || 'kn';

    if (!text) {
      return new NextResponse('Text parameter is required', { status: 400 });
    }

    // Limit text to 200 characters per request for safety
    const cleanText = text.substring(0, 200);
    
    // Multiple client endpoints for robustness
    const urls = [
      `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=gtx&q=${encodeURIComponent(cleanText)}`,
      `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(cleanText)}`
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
              'Cache-Control': 'public, max-age=86400, s-maxage=86400'
            }
          });
        }
        lastStatus = response.status;
      } catch (e) {
        console.error('TTS endpoint fetch error:', e);
      }
    }

    return new NextResponse('Error fetching TTS from downstream source', { status: lastStatus });
  } catch (error) {
    console.error('TTS API error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
