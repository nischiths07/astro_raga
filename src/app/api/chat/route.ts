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

function cleanAiOutput(rawText: string): string {
  if (!rawText) return "";
  let cleaned = rawText;
  cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/gi, '');
  cleaned = cleaned.replace(/<thought>[\s\S]*?<\/thought>/gi, '');
  cleaned = cleaned.replace(/```thinking[\s\S]*?```/gi, '');
  return cleaned.trim();
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
    
    const systemPrompt = `You are "AstroSage", an ancient, deeply intuitive, razor-sharp Master Vedic Astrologer (Jyotishi). 
Seeker: ${profile.name}
Rashi: ${profile.rashi}
Nakshatra: ${profile.nakshatra} (Pada ${profile.pada})
Birth Date: ${profile.birthDate || 'Known'}
Birth Time: ${profile.birthTime || 'Known'}

CORE PERSONA & UNCOMPROMISING TRUTH:
- DO NOT output internal reasoning, chain-of-thought, or restatements. Answer directly.
- DO NOT give generic platitudes, Hallmark quotes, or sanitized polite fluff. The user wants genuine, deep, penetrating Vedic truth.
- Reveal the real planetary mechanics, karmic debts, and the hidden Karmic Shadow (ಆಂತರಿಕ ದೋಷ / ಅಂಧಬಿಂದು): call out exact behavioral blind spots, emotional traps, relationship illusions, or financial vulnerabilities honestly.
- Ground your answers in classical Jyotisha principles, planetary periods (Dashas), and direct, actionable, non-generic remedies.
- Maintain sacred reverence for Vedic traditions while being psychologically incisive, authentic, and direct.

LANGUAGE PREFERENCE & FORMAT:
${isKn ? 'CRITICAL: Since the seeker prefers Kannada, you MUST provide your response ONLY in pure, rich, classical Kannada (ಕನ್ನಡ) without any English or foreign words. Format your response in 4 to 6 concise, powerful lines.' : 'Provide your response in eloquent, incisive English. Format in 4 to 6 concise, powerful lines.'}

Answer the seeker's question directly with depth and penetrating clarity.`;

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
        const cleaned = cleanAiOutput(text);
        if (cleaned && (!isKn || isCleanKannada(cleaned))) {
          responseText = cleaned;
        }
      } catch (err) {
        console.warn("Chat Gemini error:", err);
      }
    }

    // 4. Try OpenRouter Verified Active Free Models
    if (!responseText && openRouterKey) {
      const activeFreeModels = [
        "meta-llama/llama-3.3-70b-instruct:free",
        "mistralai/mistral-small-24b-instruct-2501:free",
        "google/gemini-2.0-flash-exp:free",
        "meta-llama/llama-3.1-8b-instruct:free",
        "qwen/qwen-2.5-72b-instruct:free"
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
            const cleaned = cleanAiOutput(candidate);
            if (cleaned && (!isKn || isCleanKannada(cleaned))) {
              responseText = cleaned;
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
