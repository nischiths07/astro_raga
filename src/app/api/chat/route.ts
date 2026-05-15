import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { messages, profile } = await req.json();
    
    const geminiKey = process.env.GEMINI_API_KEY;
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    
    const systemPrompt = `You are "AstroSage", a Master AI Vedic Astrology Agent. 
    The user is ${profile?.name || 'a seeker'}. 
    Vedic details: Rashi ${profile?.rashi || 'Unknown'}, Nakshatra ${profile?.nakshatra || 'Unknown'}, Pada ${profile?.pada || 'Unknown'}.
    
    You have deep expertise in Vedic Shastras, Karma analysis, Atma Dharma (Life Purpose), and Future mapping.
    Answer questions with profound wisdom, mystical depth, and practical clarity.
    Always maintain a supportive, enlightened, and mystical persona.`;

    let responseText = "";

    // 1. Try Gemini Native if key exists
    if (geminiKey) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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
        "google/gemini-2.0-flash-lite-001",
        "google/gemini-2.0-flash-exp:free",
        "google/gemini-2.0-flash-lite-preview-02-05:free",
        "mistralai/mistral-7b-instruct:free"
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
              max_tokens: 1000
            }),
          });

          const data = await response.json();
          if (response.ok && data.choices?.[0]?.message?.content) {
            responseText = data.choices[0].message.content;
            break; // Success!
          } else {
            console.warn(`Model ${modelId} failed:`, data.error?.message || response.status);
          }
        } catch (error) {
          console.error(`Fetch error for ${modelId}:`, error);
        }
      }
    }

    if (!responseText) {
      responseText = "The celestial path is temporarily blocked. Please ensure your OpenRouter API key is valid and has not reached its quota.";
    }

    // Save to database if profile has an ID
    if (profile?.id) {
      try {
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
