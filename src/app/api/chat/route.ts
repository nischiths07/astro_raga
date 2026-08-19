import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateVedicChatResponse } from "@/lib/vedicEngine";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { sanitizeText, sanitizeForAIPrompt, sanitizeRashi, sanitizeNakshatra, sanitizePada } from "@/lib/security";

function isCleanKannada(text: string): boolean {
  if (!text) return false;
  const kannadaChars = (text.match(/[\u0C80-\u0CFF]/g) || []).length;
  const foreignGarbled = (text.match(/[\u0600-\u06FF\u4E00-\u9FFF\u0400-\u04FF\uAC00-\uD7AF]/g) || []).length;
  if (foreignGarbled > 0) return false;
  return kannadaChars > 15;
}

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Protection
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(`chat:${clientIp}`, { windowSeconds: 60, maxRequests: 30 });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { content: "You have asked several questions rapidly. Please wait a moment before consulting the cosmos again." },
        { 
          status: 429,
          headers: { 'Retry-After': String(rateLimit.resetInSeconds) }
        }
      );
    }

    // 2. Input Sanitization & Payload Validation
    const body = await req.json();
    const rawMessages = Array.isArray(body.messages) ? body.messages : [];
    
    // Clamp history to last 8 messages and sanitize each message
    const sanitizedMessages = rawMessages
      .slice(-8)
      .map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: sanitizeForAIPrompt(m.content, 600)
      }))
      .filter((m: any) => m.content.length > 0);

    if (sanitizedMessages.length === 0) {
      return NextResponse.json({ content: "How may I assist your spiritual journey today?" });
    }

    const rawProfile = body.profile || {};
    const profile = {
      id: typeof rawProfile.id === 'string' ? sanitizeText(rawProfile.id, 64) : undefined,
      name: sanitizeText(rawProfile.name, 50) || 'Seeker',
      rashi: sanitizeRashi(rawProfile.rashi),
      nakshatra: sanitizeNakshatra(rawProfile.nakshatra),
      pada: sanitizePada(rawProfile.pada),
      birthDate: sanitizeText(rawProfile.birthDate, 20),
      birthTime: sanitizeText(rawProfile.birthTime, 20),
    };

    const isKn = body.language === 'kn';
    
    // Header Key Validation
    const customKeyHeader = req.headers.get("x-user-api-key") || "";
    const customKey = sanitizeText(customKeyHeader, 128);
    const geminiKey = customKey.startsWith("AIzaSy") ? customKey : process.env.GEMINI_API_KEY;
    const openRouterKey = customKey.startsWith("sk-or-") ? customKey : process.env.OPENROUTER_API_KEY;
    
    const systemPrompt = `You are "AstroSage", a Master AI Vedic Astrology Agent. 
    The user is ${profile.name}. 
    Vedic details of user:
    - Rashi: ${profile.rashi}
    - Nakshatra: ${profile.nakshatra}
    - Pada: ${profile.pada}
    - Birth Date: ${profile.birthDate || 'Unknown'}
    - Birth Time: ${profile.birthTime || 'Unknown'}

    CRITICAL: You already have the user's name, Rashi, Nakshatra, Pada, Birth Date, and Birth Time. Do NOT ask the user for their birth date, birth time, or birth place. Refer directly to the provided info above. You have deep expertise in Vedic Shastras. 
    
    TONE & STYLE GUIDELINES:
    - Respond with warmth, deep empathy, gentleness, and emotional sensitivity. Use polite, comforting, and kind words.
    - Treat all questions and beliefs with utmost reverence. Strictly avoid any harsh, blunt, critical, or dismissive language.
    - Never use any terms or statements that could hurt the feelings of the user or show disrespect to Hinduism, Vedic traditions, deities, and sacred culture.
    - Keep your insights positive, encouraging, and emotionally supportive.
    
    LANGUAGE PREFERENCE & LENGTH:
    ${isKn ? 'CRITICAL: Since the seeker prefers Kannada, you MUST provide your response ONLY in pure, fluent Kannada (ಕನ್ನಡ) without any English words or foreign characters. Format your response in 4 to 6 concise lines.' : 'Provide your response in English. Format your response to be concise (4 to 6 lines).'}

    CRITICAL: Answer the user's specific question directly, accurately, and concisely.`;

    let responseText = "";

    // 3. Try Gemini Native if key exists
    if (geminiKey) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash",
          systemInstruction: systemPrompt
        });
        const chat = model.startChat({
          history: sanitizedMessages.slice(0, -1).map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
          })),
          generationConfig: { maxOutputTokens: 600 },
        });
        const lastMsg = sanitizedMessages[sanitizedMessages.length - 1].content;
        const result = await chat.sendMessage(lastMsg);
        const text = result.response.text();
        if (text && (!isKn || isCleanKannada(text))) {
          responseText = text;
        }
      } catch (err) {
        console.warn("Chat Gemini error:", err);
      }
    }

    // 4. Try OpenRouter Verified Active Free Models
    if (!responseText && openRouterKey) {
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
              messages: [{ role: "system", content: systemPrompt }, ...sanitizedMessages],
              max_tokens: 600
            }),
          });

          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            const candidate = data.choices?.[0]?.message?.content;
            if (candidate && (!isKn || isCleanKannada(candidate))) {
              responseText = candidate;
              break;
            }
          }
        } catch (error) {
          // Model timeout or failure, proceed to next
        }
      }
    }

    // 5. Fallback to Built-in Vedic Engine (Zero Vulnerability Guarantee)
    if (!responseText || (isKn && !isCleanKannada(responseText))) {
      const lastUserMsg = sanitizedMessages[sanitizedMessages.length - 1]?.content || "";
      responseText = generateVedicChatResponse(lastUserMsg, profile, isKn ? 'kn' : 'en');
    }

    // Non-blocking background save to database
    if (profile.id) {
      const profileId = profile.id;
      (async () => {
        try {
          await prisma.user.upsert({
            where: { id: profileId },
            update: {},
            create: {
              id: profileId,
              name: profile.name.slice(0, 50),
              rashi: profile.rashi,
              nakshatra: profile.nakshatra,
              pada: profile.pada,
              birthDate: profile.birthDate || '',
              birthTime: profile.birthTime || '',
            },
          });

          const lastUserMessage = sanitizedMessages[sanitizedMessages.length - 1]?.content || "";
          await prisma.message.createMany({
            data: [
              { userId: profileId, role: 'user', content: lastUserMessage.slice(0, 500) },
              { userId: profileId, role: 'ai', content: responseText.slice(0, 1000) },
            ],
          });
        } catch (dbError) {
          console.error("Non-fatal: DB persistence notice:", dbError);
        }
      })();
    }

    return NextResponse.json({ content: responseText });
  } catch (error: any) {
    const fallbackResponse = generateVedicChatResponse("guidance", undefined, 'en');
    return NextResponse.json({ content: fallbackResponse });
  }
}
