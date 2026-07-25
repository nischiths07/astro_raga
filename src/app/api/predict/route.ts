import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, name, rashi, nakshatra, pada, birthDate, birthTime, language } = body;
    
    const customKey = req.headers.get("x-user-api-key") || "";
    const geminiKey = customKey.startsWith("AIzaSy") ? customKey : process.env.GEMINI_API_KEY;
    const openRouterKey = customKey.startsWith("sk-or-") ? customKey : process.env.OPENROUTER_API_KEY;
    const hfKey = process.env.HUGGINGFACE_API_KEY;

    const systemPrompt = `You are "AstroSage", a world-renowned Master Vedic Astrology Agent. 
    Seeker Name: ${name}, Rashi: ${rashi}, Nakshatra: ${nakshatra}, Pada: ${pada}, Birth Date: ${birthDate || 'Unknown'}, Birth Time: ${birthTime || 'Unknown'}.
    Language to respond in: ${language === 'kn' ? 'Kannada' : 'English'}.
    
    CRITICAL: You already have the seeker's name, Rashi, Nakshatra, Pada, Birth Date, and Birth Time. Do NOT mention any missing birth details (such as birth place). Simply generate the insight using the provided info.
    
    TONE & STYLE GUIDELINES:
    - Respond with warmth, deep empathy, gentleness, and emotional sensitivity. Use polite, comforting, and kind words.
    - Treat all questions and beliefs with utmost reverence. Strictly avoid any harsh, blunt, critical, or dismissive language.
    - Never use any terms or statements that could hurt the feelings of the user or show disrespect to Hinduism, Vedic traditions, deities, and sacred culture.
    - Keep your insights positive, encouraging, and emotionally supportive.

    Provide a concise, brief, and highly accurate Vedic astrology insight. Keep each section small (1-2 clear, direct sentences max).
    Use these exact headers in your response:
    🌌 **Cosmic Blueprint**
    🕉️ **Life Purpose**
    🕰️ **Past Karma**
    🚀 **Future Trajectory**
    💼 **Dharma & Prosperity**
    ✨ **AstroSage Divine Remedy**
    
    IMPORTANT: Write the remedy in the target language inside [REMEDY]...[/REMEDY] tags at the very end of your response. Example: [REMEDY]ನಿಮ್ಮ ದೈನಂದಿನ ಜೀವನದಲ್ಲಿ ಸೂರ್ಯನಿಗೆ ನೀರನ್ನು ಅರ್ಪಿಸಿ.[/REMEDY]`;

    let prediction = "";

    // 1. Try Gemini
    if (geminiKey) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash",
          systemInstruction: systemPrompt
        });
        const result = await model.generateContent(systemPrompt);
        prediction = result.response.text();
      } catch (err) {}
    } 
    
    // 2. Try OpenRouter with Multiple Free Models
    if (!prediction && openRouterKey) {
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
          console.log(`Predict: Trying OpenRouter model ${modelId}...`);
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
              messages: [{ role: "system", content: "You are AstroSage, an expert Vedic Astrology Agent." }, { role: "user", content: systemPrompt }],
              max_tokens: 3000
            }),
          });

          const data = await response.json();
          if (response.ok && data.choices?.[0]?.message?.content) {
            prediction = data.choices[0].message.content;
            console.log(`Predict: Model ${modelId} succeeded! (Resolved model: ${data.model || 'unknown'})`);
            break;
          } else {
            console.warn(`Predict: Model ${modelId} failed:`, data.error?.message || response.status);
          }
        } catch (error) {
          console.error(`Predict: Fetch error for ${modelId}:`, error);
        }
      }
    }

    // 3. Fallback to HF
    if (!prediction && hfKey) {
      try {
        const response = await fetch("https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B-Instruct", {
          headers: { Authorization: `Bearer ${hfKey}`, "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            inputs: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\nYou are AstroSage.<|eot_id|><|start_header_id|>user<|end_header_id|>\n${systemPrompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n`,
            parameters: { max_new_tokens: 1000, temperature: 0.7 }
          }),
        });
        const result = await response.json();
        prediction = result[0]?.generated_text?.split('assistant')?.pop()?.trim();
      } catch (err) {}
    }

    if (!prediction) {
      prediction = language === 'kn' ? `ಶುಭ ದಿನ ${name}.` : `Greetings ${name}, the stars favor you.`;
    }

    // Extract remedy from [REMEDY]...[/REMEDY] tags
    let remedy = language === 'kn' ? "ಸೂರ್ಯನಿಗೆ ನಮಸ್ಕರಿಸಿ." : "Embrace silence for 11 minutes at sunset.";
    const remedyMatch = prediction.match(/\[REMEDY\](.*?)\[\/REMEDY\]/i);
    if (remedyMatch && remedyMatch[1]) {
      remedy = remedyMatch[1].trim();
      // Remove the remedy tags and content from the full prediction display
      prediction = prediction.replace(/\[REMEDY\].*?\[\/REMEDY\]/gi, '').trim();
    }

    // Also remove any trailing header for remedy if it was left empty
    prediction = prediction.replace(/✨ \*\*AstroSage Divine Remedy\*\*.*$/i, '').trim();

    // Save to database if user exists
    if (body.id) {
      try {
        await prisma.message.create({
          data: {
            userId: body.id,
            role: 'ai',
            content: `Full Analysis: ${prediction.substring(0, 500)}...`,
          },
        });
      } catch (dbError) {
        console.error("Failed to save prediction to DB:", dbError);
      }
    }

    return NextResponse.json({ prediction, remedy });
  } catch (error: any) {
    return NextResponse.json({ error: "Cosmic interference." }, { status: 500 });
  }
}
