import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateVedicPrediction } from "@/lib/vedicEngine";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { sanitizeText, sanitizeRashi, sanitizeNakshatra, sanitizePada } from "@/lib/security";

function isCleanKannada(text: string): boolean {
  if (!text) return false;
  const kannadaChars = (text.match(/[\u0C80-\u0CFF]/g) || []).length;
  const foreignGarbled = (text.match(/[\u0600-\u06FF\u4E00-\u9FFF\u0400-\u04FF\uAC00-\uD7AF]/g) || []).length;
  if (foreignGarbled > 0) return false;
  return kannadaChars > 30;
}

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Protection (Anti-DDoS / Token Scraping)
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(`predict:${clientIp}`, { windowSeconds: 60, maxRequests: 25 });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many cosmic inquiries. Please pause for a moment and try again." },
        { 
          status: 429,
          headers: { 'Retry-After': String(rateLimit.resetInSeconds) }
        }
      );
    }

    // 2. Input Sanitization & Payload Validation
    const body = await req.json();
    const rawName = sanitizeText(body.name, 60);
    const name = rawName || 'Seeker';
    const rashi = sanitizeRashi(body.rashi);
    const nakshatra = sanitizeNakshatra(body.nakshatra);
    const pada = sanitizePada(body.pada);
    const birthDate = sanitizeText(body.birthDate, 20);
    const birthTime = sanitizeText(body.birthTime, 20);
    const language = body.language === 'kn' ? 'kn' : 'en';
    const isKn = language === 'kn';
    const userId = typeof body.id === 'string' ? sanitizeText(body.id, 64) : null;
    
    // Header Key Validation (Strict prefix check)
    const customKeyHeader = req.headers.get("x-user-api-key") || "";
    const customKey = sanitizeText(customKeyHeader, 128);
    const geminiKey = customKey.startsWith("AIzaSy") ? customKey : process.env.GEMINI_API_KEY;
    const openRouterKey = customKey.startsWith("sk-or-") ? customKey : process.env.OPENROUTER_API_KEY;

    const systemPrompt = `You are "AstroSage", an ancient, deeply intuitive, razor-sharp Master Vedic Astrologer (Jyotishi).
    Seeker: ${name}
    Rashi: ${rashi}
    Nakshatra: ${nakshatra} (Pada ${pada})
    Birth Date: ${birthDate || 'Known'}
    Birth Time: ${birthTime || 'Known'}
    Language: ${isKn ? 'Pure Kannada (ಕನ್ನಡ)' : 'English'}

    CORE PERSONA & UNCOMPROMISING TRUTH:
    - DO NOT give generic platitudes, sugar-coated horoscopes, or polite corporate quotes. Authentic Vedic Jyotish is incisive, penetrating, psychologically profound, and direct.
    - Reveal both their divine gifts AND their raw, unfiltered Karmic Shadow (ಆಂತರಿಕ ದೋಷ / ಅಂಧಬಿಂದು): exact ego traps, emotional blind spots, relationship friction, temper triggers, and financial leaks of their nakshatra/rashi.
    - Include specific turning ages (e.g., ages 21, 28, 32, 36, 42) and precise planetary mechanics.
    - Prescribe concrete, authentic Vedic remedies (specific twilight timings, exact deities, charity targets, or dietary balance).

    ${isKn ? 'CRITICAL: Respond ONLY in pure, rich, classical Kannada (ಕನ್ನಡ) without any English or foreign words.' : 'Respond in eloquent, incisive English.'}

    Use these exact section headers:
    🌌 **Cosmic Blueprint**
    🕉️ **Life Purpose & Atma Dharma**
    🕰️ **Karmic Shadow & Vulnerability (ಆಂತರಿಕ ದೋಷ)**
    🚀 **Planetary Trajectory & Turning Ages**
    💼 **Dharma & Prosperity Key**
    ✨ **AstroSage Divine Remedy**

    IMPORTANT: Write the specific remedy at the very end enclosed inside [REMEDY]...[/REMEDY] tags.`;

    let prediction = "";

    // 3. Try Gemini with Safety Filter
    if (geminiKey) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash",
          systemInstruction: systemPrompt
        });
        const result = await model.generateContent(systemPrompt);
        const text = result.response.text();
        if (text && (!isKn || isCleanKannada(text))) {
          prediction = text;
        }
      } catch (err) {
        console.warn("Gemini predict error:", err);
      }
    } 
    
    // 4. Try OpenRouter Verified Free Models with Safe Timeouts
    if (!prediction && openRouterKey) {
      const activeFreeModels = [
        "openrouter/free",
        "liquid/lfm-2.5-2.6b:free",
        "nvidia/nemotron-3-nano-30b-a3b:free",
        "openai/gpt-oss-20b:free",
        "nvidia/nemotron-3.5-lightning:free"
      ];

      for (const modelId of activeFreeModels) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 6000);

          const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            signal: controller.signal,
            headers: {
              "Authorization": `Bearer ${openRouterKey}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "https://astroraga.vercel.app",
              "X-Title": "Astroraga",
            },
            body: JSON.stringify({
              model: modelId,
              messages: [
                { role: "system", content: "You are AstroSage, an expert Vedic Astrology Agent." },
                { role: "user", content: systemPrompt }
              ],
              max_tokens: 800
            }),
          });

          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            const candidate = data.choices?.[0]?.message?.content;
            if (candidate && (!isKn || isCleanKannada(candidate))) {
              prediction = candidate;
              break;
            }
          }
        } catch (error) {
          // Model timeout or failure, proceed to next
        }
      }
    }

    // 5. Offline Vedic Engine Fallback (Immune to External Vulnerabilities)
    if (!prediction || prediction.length < 50 || (isKn && !isCleanKannada(prediction))) {
      const fallbackResult = generateVedicPrediction({
        name,
        rashi,
        nakshatra,
        pada,
        birthDate,
        birthTime,
        language: isKn ? 'kn' : 'en'
      });
      prediction = fallbackResult.prediction;
    }

    // Extract remedy from [REMEDY]...[/REMEDY] tags
    let remedy = isKn ? "ಪ್ರತಿದಿನ ಮುಂಜಾನೆ ಸೂರ್ಯನಿಗೆ ನಮಸ್ಕರಿಸಿ ಧ್ಯಾನದಲ್ಲಿ ತೊಡಗಿಸಿಕೊಳ್ಳಿ." : "Embrace silence for 11 minutes at sunset and honor the divine.";
    const remedyMatch = prediction.match(/\[REMEDY\](.*?)\[\/REMEDY\]/i);
    if (remedyMatch && remedyMatch[1]) {
      remedy = remedyMatch[1].trim();
      prediction = prediction.replace(/\[REMEDY\].*?\[\/REMEDY\]/gi, '').trim();
    }

    prediction = prediction.replace(/✨ \*\*AstroSage Divine Remedy\*\*.*$/i, '').trim();

    // Secure asynchronous database save
    if (userId) {
      (async () => {
        try {
          await prisma.user.upsert({
            where: { id: userId },
            update: {},
            create: {
              id: userId,
              name: name.slice(0, 50),
              rashi,
              nakshatra,
              pada,
              birthDate,
              birthTime,
            },
          });

          await prisma.message.create({
            data: {
              userId,
              role: 'ai',
              content: `Full Analysis: ${prediction.substring(0, 500)}...`,
            },
          });
        } catch (dbError) {
          console.error("Non-fatal: DB persistence notice:", dbError);
        }
      })();
    }

    return NextResponse.json({ prediction, remedy });
  } catch (error: any) {
    const defaultData = generateVedicPrediction({
      name: 'Seeker',
      rashi: 'Mesha',
      nakshatra: 'Ashwini',
      pada: '1',
      language: 'en'
    });
    return NextResponse.json({ prediction: defaultData.prediction, remedy: defaultData.remedy });
  }
}
