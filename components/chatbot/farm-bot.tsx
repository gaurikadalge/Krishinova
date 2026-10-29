"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/components/language-context"
import { MessageCircle, X, Send, Mic, Volume2, VolumeX, Loader2 } from "lucide-react"

// Speech Recognition Type Definitions
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function FarmBot() {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: getWelcomeMessage(language) }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  // Speech states
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechEnabled, setSpeechEnabled] = useState(true)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Update welcome message if language changes and no interaction yet
    if (messages.length === 1 && messages[0].role === "assistant") {
      setMessages([{ role: "assistant", content: getWelcomeMessage(language) }])
    }
  }, [language])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = false
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setInput(transcript)
          setIsListening(false)
        }
        
        recognition.onerror = (event: any) => {
          console.error("Speech recognition error", event.error)
          setIsListening(false)
        }
        
        recognition.onend = () => {
          setIsListening(false)
        }
        
        recognitionRef.current = recognition
      }
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      if (recognitionRef.current) {
        // Set language based on context
        const langMap: Record<string, string> = {
          en: "en-IN",
          hi: "hi-IN",
          mr: "mr-IN",
          ur: "ur-IN"
        }
        recognitionRef.current.lang = langMap[language] || "en-IN"
        try {
          recognitionRef.current.start()
          setIsListening(true)
        } catch (e) {
          console.error(e)
        }
      } else {
        alert("Speech recognition is not supported in this browser.")
      }
    }
  }

  const speakText = (text: string) => {
    if (!speechEnabled || !window.speechSynthesis) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    
    // Attempt to set language
    const langMap: Record<string, string> = {
      en: "en-IN",
      hi: "hi-IN",
      mr: "mr-IN",
      ur: "ur-IN"
    }
    utterance.lang = langMap[language] || "en-IN"
    
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    
    const newMessages = [...messages, { role: "user" as const, content: userMessage }]
    setMessages(newMessages)
    setIsLoading(true)
    stopSpeaking() // Stop previous speech

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          language: language
        })
      })

      if (!response.ok) throw new Error("Failed to fetch")

      const data = await response.json()
      const botReply = data.reply || getFallbackMessage(language)

      setMessages(prev => [...prev, { role: "assistant", content: botReply }])
      speakText(botReply)
    } catch (error) {
      console.error(error)
      const errorMsg = getFallbackMessage(language)
      setMessages(prev => [...prev, { role: "assistant", content: errorMsg }])
    } finally {
      setIsLoading(false)
    }
  }

  const toggleChat = () => {
    if (isOpen) {
      stopSpeaking()
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop()
        setIsListening(false)
      }
    }
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 z-50"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white dark:bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-fade-in-up">
          {/* Header */}
          <div className="bg-primary p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-heading font-semibold text-lg">KrishiBot</h3>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => {
                  setSpeechEnabled(!speechEnabled)
                  if (isSpeaking) stopSpeaking()
                }}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                title={speechEnabled ? "Mute Voice" : "Enable Voice"}
              >
                {speechEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button 
                onClick={toggleChat}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                title="Close Chatbot"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 h-96 p-4 overflow-y-auto bg-slate-50 dark:bg-background/50 flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-primary text-primary-foreground self-end rounded-br-none" 
                    : "bg-white dark:bg-card border border-border text-foreground self-start rounded-bl-none shadow-sm"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white dark:bg-card border border-border text-foreground self-start rounded-2xl rounded-bl-none p-3 shadow-sm max-w-[85%]">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-card border-t border-border flex items-center gap-2">
            <button
              type="button"
              onClick={toggleListen}
              className={`p-2 rounded-full transition-colors ${
                isListening ? "bg-red-100 text-red-500 animate-pulse" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={getPlaceholder(language)}
              className="flex-1 px-3 py-2 bg-muted/50 border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 bg-primary text-white rounded-full disabled:opacity-50 hover:bg-primary/90 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}

// Helpers for multilingual static texts
function getWelcomeMessage(lang: string) {
  switch (lang) {
    case "hi": return "नमस्ते! मैं आपका कृषिनोवा सहायक हूँ। मैं खेती से जुड़े आपके सवालों में कैसे मदद कर सकता हूँ?"
    case "mr": return "नमस्कार! मी तुमचा कृषिनोवा सहाय्यक आहे. मी तुमच्या शेतीविषयीच्या प्रश्नांमध्ये कशी मदत करू शकतो?"
    case "ur": return "ہیلو! میں آپ کا کرشی نووا اسسٹنٹ ہوں۔ میں کھیتی باڑی سے متعلق آپ کے سوالات میں کس طرح مدد کر سکتا ہوں؟"
    default: return "Hello! I am your Krishinova assistant. How can I help with your farming questions?"
  }
}

function getPlaceholder(lang: string) {
  switch (lang) {
    case "hi": return "अपना सवाल यहाँ लिखें..."
    case "mr": return "तुमचा प्रश्न येथे लिहा..."
    case "ur": return "اپنا سوال یہاں لکھیں..."
    default: return "Type your question here..."
  }
}

function getFallbackMessage(lang: string) {
  switch (lang) {
    case "hi": return "क्षमा करें, मुझे अभी जुड़ने में समस्या हो रही है। कृपया सुनिश्चित करें कि ओलामा (Ollama) चल रहा है।"
    case "mr": return "क्षमस्व, मला आता कनेक्ट होण्यात अडचण येत आहे. कृपया ओलामा (Ollama) चालू असल्याची खात्री करा."
    case "ur": return "معذرت، مجھے ابھی جڑنے میں دشواری ہو رہی ہے۔ براہ کرم یقینی بنائیں کہ اولاما (Ollama) چل رہا ہے۔"
    default: return "Sorry, I'm having trouble connecting right now. Please ensure Ollama is running locally."
  }
}
