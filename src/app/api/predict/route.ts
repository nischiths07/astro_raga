import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, rashi, nakshatra, pada, birthDate, birthTime, language } = await req.json();
    
    const geminiKey = process.env.GEMINI_API_KEY;
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    const hfKey = process.env.HUGGINGFACE_API_KEY;

    const systemPrompt = `You are "AstroSage", a world-renowned Master Vedic Astrology Agent. 
    Seeker: ${name}, Rashi: ${rashi}, Nakshatra: ${nakshatra}, Pada: ${pada}.
    Language: ${language === 'kn' ? 'Kannada' : 'English'}.
    
    Provide a deep Vedic analysis with these headers:
    🌌 **Cosmic Blueprint**
    🕉️ **Life Purpose**
    🕰️ **Past Karma**
    🚀 **Future Trajectory**
    💼 **Dharma & Prosperity**
    ✨ **AstroSage Divine Remedy**`;

    let prediction = "";

    // 1. Try Gemini
    if (geminiKey) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(systemPrompt);
        prediction = result.response.text();
      } catch (err) {}
    } 
    
    // 2. Try OpenRouter with Multiple Free Models
    if (!prediction && openRouterKey) {
      const freeModels = [
        "google/gemini-2.0-flash-lite-001",
        "google/gemini-2.0-flash-exp:free",
        "google/gemini-2.0-flash-lite-preview-02-05:free",
        "mistralai/mistral-7b-instruct:free"
      ];

      for (const modelId of freeModels) {
        try {
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
              max_tokens: 1000
            }),
          });

          const data = await response.json();
          if (response.ok && data.choices?.[0]?.message?.content) {
            prediction = data.choices[0].message.content;
            break;
          }
        } catch (error) {}
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

    return NextResponse.json({ prediction });
  } catch (error: any) {
    return NextResponse.json({ error: "Cosmic interference." }, { status: 500 });
  }
}
