import { NextResponse } from "next/server";

// 🔹 System prompt
const systemPrompt = `You are Ayan Ali Khan's AI portfolio assistant. You are friendly, professional, and concise.

About Ayan Ali Khan:
- Role: Full-Stack Developer & AI Engineer
- Skills: Next.js, TypeScript, Node.js, Python, C, Firebase, Tailwind CSS, HTML, CSS, JS
- Services: Web Development, AI Solutions, UI/UX Design
- Projects: E-Commerce, Collaboration Platform, Portfolio Builder GitHub: https://github.com/AyanAlikhan11
- Contact: scoutayan853@gmail.com
- Available for freelance work

Rules:
- Keep answers short (2–3 lines)
- Be helpful and confident
- Stay relevant to Ayan’s work`;


// ================= GEMINI =================
async function callGemini(prompt: string) {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-001:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error?.message || "Gemini failed");
    }

    return data?.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) {
    console.error("Gemini error:", error);
    throw error;
  }
}


// ================= GROQ (Fallback) =================
async function callGroq(prompt: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // ✅ updated model
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error?.message || "Groq failed");
    }

    return data?.choices?.[0]?.message?.content;
  } catch (error) {
    console.error("Groq error:", error);
    throw error;
  }
}


// ================= MAIN API =================
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { message: "Invalid messages format" },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1]?.content || "";

    const finalPrompt = `${systemPrompt}\nUser: ${lastMessage}\nAssistant:`;

    let reply = "";

    // 🔹 Try Gemini first
    try {
      console.log("Using Gemini...");
      reply = await callGemini(finalPrompt);
    } catch {
      console.log("Gemini failed → switching to Groq");
      reply = await callGroq(lastMessage);
    }

    if (!reply) {
      throw new Error("Empty response from AI");
    }

    return NextResponse.json({ message: reply });

  } catch (error) {
    console.error("FINAL ERROR:", error);

    return NextResponse.json({
      message:
        "Sorry, I'm having trouble responding right now. Please try again later or contact directly at hello@alexchen.dev.",
    });
  }
}