import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { messages, profile, language } = await req.json();
    
    const customKey = req.headers.get("x-user-api-key") || "";
    const geminiKey = customKey.startsWith("AIzaSy") ? customKey : process.env.GEMINI_API_KEY;
    const openRouterKey = customKey.startsWith("sk-or-") ? customKey : process.env.OPENROUTER_API_KEY;
    
    const systemPrompt = `You are "AstroSage", a Master AI Vedic Astrology Agent. 
    The user is ${profile?.name || 'a seeker'}. 
    Vedic details of user:
    - Rashi: ${profile?.rashi || 'Unknown'}
    - Nakshatra: ${profile?.nakshatra || 'Unknown'}
    - Pada: ${profile?.pada || 'Unknown'}
    - Birth Date: ${profile?.birthDate || 'Unknown'}
    - Birth Time: ${profile?.birthTime || 'Unknown'}

    CRITICAL: You already have the user's name, Rashi, Nakshatra, Pada, Birth Date, and Birth Time. Do NOT ask the user for their birth date, birth time, or birth place. If you need details, refer to the provided info above. You have deep expertise in Vedic Shastras. 
    
    TONE & STYLE GUIDELINES:
    - Respond with warmth, deep empathy, gentleness, and emotional sensitivity. Use polite, comforting, and kind words.
    - Treat all questions and beliefs with utmost reverence. Strictly avoid any harsh, blunt, critical, or dismissive language.
    - Never use any terms or statements that could hurt the feelings of the user or show disrespect to Hinduism, Vedic traditions, deities, and sacred culture.
    - Keep your insights positive, encouraging, and emotionally supportive.
    
    LANGUAGE PREFERENCE & LENGTH:
    ${language === 'kn' ? 'CRITICAL: Since the seeker prefers Kannada, you MUST provide your response ONLY in Kannada (do NOT include any English text or translation). Format your response to be exactly 5 to 6 lines of text (each line should be a clear, meaningful sentence or point in Kannada).' : 'Provide your response in English. Format your response to be exactly 5 to 6 lines of text.'}

    CRITICAL: Answer the user's specific question directly, accurately, and in a concise format that takes exactly 5 to 6 lines. Do not give long pre-written analysis unless specifically asked.`;

    let responseText = "";

    // 1. Try Gemini Native if key exists
    if (geminiKey) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash",
          systemInstruction: systemPrompt
        });
        const chat = model.startChat({
          history: messages.slice(0, -1).map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
          })),
          generationConfig: { maxOutputTokens: 1000 },
        });
        const result = await chat.sendMessage(messages[messages.length - 1].content);
        responseText = result.response.text();
      } catch (err) {}
    }

    // 2. Try OpenRouter with a list of potential free models
    if (!responseText && openRouterKey) {
      const freeModels = [
        "google/gemini-2.5-flash",
        "google/gemini-2.0-flash-lite-001",
        "google/gemini-2.5-pro",
        "meta-llama/llama-3.3-70b-instruct",
        "google/gemma-4-31b-it:free",
        "openrouter/free"
      ];

      for (const modelId of freeModels) {
        try {
          console.log(`Chat: Trying OpenRouter model ${modelId}...`);
          const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${openRouterKey}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "https://astroraga.vercel.app",
              "X-Title": "Astroraga",
            },
            body: JSON.stringify({
               model: modelId,
               messages: [{ role: "system", content: systemPrompt }, ...messages],
               max_tokens: 3000
             }),
          });

          const data = await response.json();
          if (response.ok && data.choices?.[0]?.message?.content) {
            responseText = data.choices[0].message.content;
            console.log(`Chat: Model ${modelId} succeeded! (Resolved model: ${data.model || 'unknown'})`);
            break; // Success!
          } else {
            console.warn(`Chat: Model ${modelId} failed:`, data.error?.message || response.status);
          }
        } catch (error) {
          console.error(`Chat: Fetch error for ${modelId}:`, error);
        }
      }
    }

    if (!responseText) {
      responseText = "The celestial path is temporarily blocked. Please ensure your OpenRouter API key is valid and has not reached its quota.";
    }

    // Save to database if profile has an ID
    if (profile?.id) {
      try {
        // Ensure user exists in database to prevent foreign key constraints
        await prisma.user.upsert({
          where: { id: profile.id },
          update: {},
          create: {
            id: profile.id,
            name: profile.name || 'Seeker',
            rashi: profile.rashi || 'Mesha',
            nakshatra: profile.nakshatra || 'Ashwini',
            pada: profile.pada || '1',
            birthDate: profile.birthDate || '',
            birthTime: profile.birthTime || '',
          },
        });

        const lastUserMessage = messages[messages.length - 1].content;
        await prisma.message.createMany({
          data: [
            { userId: profile.id, role: 'user', content: lastUserMessage },
            { userId: profile.id, role: 'ai', content: responseText },
          ],
        });
      } catch (dbError) {
        console.error("Failed to save chat to DB:", dbError);
      }
    }

    return NextResponse.json({ content: responseText });
  } catch (error: any) {
    return NextResponse.json({ error: "Cosmic interference." }, { status: 500 });
  }
}
