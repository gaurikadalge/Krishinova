import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { text, language = "mr", gender = "male", rate = "-4%" } = body

    if (!text || !text.trim()) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 })
    }

    // Call FastAPI backend on port 8001
    const backendRes = await fetch("http://localhost:8001/api/tts/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, language, gender, rate }),
    })

    if (!backendRes.ok) {
      const errText = await backendRes.text()
      throw new Error(`Backend TTS failed: ${errText}`)
    }

    const audioBuffer = await backendRes.arrayBuffer()

    return new Response(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch (error: any) {
    console.error("TTS Proxy Route Error:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to generate realistic neural speech" },
      { status: 500 }
    )
  }
}
