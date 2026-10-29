import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages, language } = await req.json()

    // Map the internal language code to a spoken language name for the system prompt
    const languageNames: Record<string, string> = {
      en: "English",
      hi: "Hindi",
      mr: "Marathi",
      ur: "Urdu"
    }
    const targetLang = languageNames[language] || "English"

    // Construct the system prompt for the farming bot
    const systemPrompt = {
      role: "system",
      content: `You are KrishiBot, a helpful AI assistant for farmers using the Krishinova platform. 
Your primary domain is agriculture, crop prediction, water management, weather forecasting, and sustainable farming.
CRITICAL RULE: You MUST answer the user ONLY in ${targetLang}. Do NOT use any other language under any circumstances.
Translate your knowledge to ${targetLang}. Keep your answers concise, practical, and easy to understand for a farmer.`
    }

    const modifiedMessages = [...messages];
    if (modifiedMessages.length > 0) {
      const lastMessage = modifiedMessages[modifiedMessages.length - 1];
      if (lastMessage.role === "user") {
        lastMessage.content = `${lastMessage.content}\n\n[Important: Please respond entirely in ${targetLang}]`;
      }
    }

    const payload = {
      model: "qwen2:1.5b", // Extremely lightweight model optimized for low-end CPUs and handles multiple languages well
      messages: [systemPrompt, ...modifiedMessages],
      stream: false // Using non-streaming for simplicity in standard fetch
    }

    // Call local Ollama instance
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error("Ollama API failed to respond")
    }

    const data = await response.json()
    
    return NextResponse.json({ reply: data.message.content })

  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json(
      { error: "Failed to connect to local LLM. Ensure Ollama is running on port 11434." },
      { status: 500 }
    )
  }
}
