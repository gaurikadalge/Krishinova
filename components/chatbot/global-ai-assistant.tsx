"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  MessageCircle,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Loader2,
  Sparkles,
  Globe2,
  Check,
  Search,
  RotateCcw,
  Bot,
  User as UserIcon,
  ChevronDown,
  Activity,
  Layers,
  Sprout,
  Square,
} from "lucide-react"
import { INDIAN_LANGUAGES, IndianLanguage } from "./indian-languages"
import { useLanguage } from "@/components/language-context"

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export default function GlobalAIAssistant() {
  const { language: globalContextLang } = useLanguage()

  // Find initial language from context or default to Marathi/Hindi
  const initialLang =
    INDIAN_LANGUAGES.find((l) => l.code === globalContextLang) ||
    INDIAN_LANGUAGES.find((l) => l.code === "mr") ||
    INDIAN_LANGUAGES[0]

  const [selectedLang, setSelectedLang] = useState<IndianLanguage>(initialLang)
  const [isOpen, setIsOpen] = useState(false)
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const [langSearch, setLangSearch] = useState("")

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Voice Chat States
  const [isListening, setIsListening] = useState(false)
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null)
  const [isAudioLoading, setIsAudioLoading] = useState(false)
  const [autoVoiceEnabled, setAutoVoiceEnabled] = useState(true)
  const [voicePersona, setVoicePersona] = useState<"male" | "female">("male")
  const [speechError, setSpeechError] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const currentAudioRef = useRef<HTMLAudioElement | null>(null)

  // Sync language with global context when user switches page language
  useEffect(() => {
    const matched = INDIAN_LANGUAGES.find((l) => l.code === globalContextLang)
    if (matched) {
      setSelectedLang(matched)
    }
  }, [globalContextLang])

  // Set initial welcome message when language is initialized or changed
  useEffect(() => {
    if (messages.length === 0 || (messages.length === 1 && messages[0].role === "assistant")) {
      setMessages([
        {
          id: "welcome-1",
          role: "assistant",
          content: selectedLang.welcome,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    }
  }, [selectedLang])

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen])

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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
          setSpeechError(null)
          // Automatically submit voice query for natural hands-free experience
          handleSendMessage(transcript)
        }

        recognition.onerror = (event: any) => {
          console.warn("Speech recognition error:", event.error)
          setIsListening(false)
          if (event.error === "not-allowed") {
            setSpeechError("Microphone access denied. Please grant permission.")
          } else if (event.error === "no-speech") {
            setSpeechError("No voice detected. Please try again.")
          }
          setTimeout(() => setSpeechError(null), 4000)
        }

        recognition.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current = recognition
      }
    }
  }, [selectedLang])

  // Start / Stop Microphone Voice Chat
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    if (!recognitionRef.current) {
      alert("Voice recognition is not supported in this browser. Please use Chrome, Edge, or Safari.")
      return
    }

    stopSpeaking()
    setSpeechError(null)

    // Set recognition language to selected Indian language BCP-47 code
    recognitionRef.current.lang = selectedLang.speechCode

    try {
      recognitionRef.current.start()
      setIsListening(true)
    } catch (e) {
      console.error(e)
      setIsListening(false)
    }
  }

  // HYPER-REALISTIC LOCAL FARMER NEURAL VOICE ENGINE (Edge Neural Studio Voices)
  const speakMessage = async (text: string, msgId: string) => {
    // If currently speaking this message, toggle off
    if (speakingMessageId === msgId) {
      stopSpeaking()
      return
    }

    stopSpeaking()
    setIsAudioLoading(true)

    // Clean markdown & symbols for natural phonetic flow
    const cleanText = text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/[#*•_`]/g, "")
      .replace(/₹/g, "रुपये ")

    try {
      // 1. Try High-Definition Realistic Indian Neural Audio API
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: cleanText,
          language: selectedLang.code,
          gender: voicePersona,
          rate: "-4%", // Warm, steady, rural pace
        }),
      })

      if (res.ok) {
        const audioBlob = await res.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        const audio = new Audio(audioUrl)
        currentAudioRef.current = audio

        audio.onplay = () => {
          setIsAudioLoading(false)
          setSpeakingMessageId(msgId)
        }
        audio.onended = () => {
          setSpeakingMessageId(null)
          currentAudioRef.current = null
        }
        audio.onerror = () => {
          console.warn("Audio element error, falling back to browser TTS")
          fallbackBrowserTTS(cleanText, msgId)
        }

        await audio.play()
        return
      } else {
        throw new Error("Neural TTS API not available")
      }
    } catch (e) {
      console.warn("Neural TTS error, fallback to browser speech synthesis:", e)
      fallbackBrowserTTS(cleanText, msgId)
    } finally {
      setIsAudioLoading(false)
    }
  }

  const fallbackBrowserTTS = (cleanText: string, msgId: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setIsAudioLoading(false)
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.lang = selectedLang.speechCode
    utterance.rate = 0.92 // Natural slower pace for farmers
    utterance.pitch = voicePersona === "male" ? 0.95 : 1.05

    const voices = window.speechSynthesis.getVoices()
    const matchingVoice = voices.find(
      (v) =>
        v.lang.toLowerCase() === selectedLang.speechCode.toLowerCase() ||
        v.lang.toLowerCase().startsWith(selectedLang.code)
    )
    if (matchingVoice) utterance.voice = matchingVoice

    utterance.onstart = () => setSpeakingMessageId(msgId)
    utterance.onend = () => setSpeakingMessageId(null)
    utterance.onerror = () => setSpeakingMessageId(null)

    window.speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current.currentTime = 0
      currentAudioRef.current = null
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    setSpeakingMessageId(null)
    setIsAudioLoading(false)
  }

  // Send Message (Text or Voice)
  const handleSendMessage = async (textToSend?: string) => {
    const userQuery = (textToSend || input).trim()
    if (!userQuery || isLoading) return

    stopSpeaking()
    setInput("")
    setSpeechError(null)

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: userQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          language: selectedLang.code,
        }),
      })

      const data = await response.json()
      const botReply = data.reply || selectedLang.welcome

      const assistantMessage: Message = {
        id: `ast-${Date.now()}`,
        role: "assistant",
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Auto-speak response if enabled
      if (autoVoiceEnabled) {
        speakMessage(botReply, assistantMessage.id)
      }
    } catch (error) {
      console.error("Chat error:", error)
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "माफ करा, संपर्क साधताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectLanguage = (lang: IndianLanguage) => {
    setSelectedLang(lang)
    setIsLangDropdownOpen(false)
    stopSpeaking()
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const toggleAssistantOpen = () => {
    if (isOpen) {
      stopSpeaking()
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop()
        setIsListening(false)
      }
    }
    setIsOpen(!isOpen)
  }

  const filteredLanguages = INDIAN_LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(langSearch.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(langSearch.toLowerCase()) ||
      l.region.toLowerCase().includes(langSearch.toLowerCase())
  )

  return (
    <>
      {/* 1. FLOATING ACTION BUTTON (Visible on every single page across entire app) */}
      <button
        onClick={toggleAssistantOpen}
        className={`fixed bottom-6 right-6 z-[999] group flex items-center gap-2 p-3 sm:px-4 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 ${
          isOpen
            ? "bg-[#073B2A] text-white ring-4 ring-[#087A4B]/30"
            : "bg-gradient-to-r from-[#087A4B] to-[#0A965C] text-white hover:shadow-[#087A4B]/40 ring-4 ring-[#087A4B]/20"
        }`}
        aria-label="Toggle AI Assistant"
      >
        <div className="relative flex items-center justify-center">
          {isOpen ? (
            <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-200" />
          ) : (
            <MessageCircle className="w-6 h-6 transition-transform group-hover:scale-110 duration-200" />
          )}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white animate-pulse" />
          )}
        </div>

        {!isOpen && (
          <div className="hidden sm:flex flex-col text-left leading-tight pr-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              KrishiNova AI
            </span>
            <span className="text-xs font-extrabold text-white">
              {selectedLang.nativeName} &bull; Voice
            </span>
          </div>
        )}
      </button>

      {/* 2. CHAT WINDOW / MODAL */}
      {isOpen && (
        <div className="fixed bottom-24 right-3 sm:right-6 w-[94vw] sm:w-[440px] max-h-[82vh] h-[640px] z-[999] rounded-3xl bg-white shadow-2xl border border-[#E5EBE5] flex flex-col overflow-hidden animate-fade-in-up">
          {/* TOP HEADER */}
          <div className="bg-gradient-to-r from-[#073B2A] via-[#087A4B] to-[#0A965C] text-white p-4 shrink-0 shadow-md">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 shadow-inner">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm tracking-tight font-heading">
                      KrishiNova Botanical AI
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  </div>
                  <p className="text-[10px] text-emerald-100/90 font-medium">
                    22 Indian Languages &bull; Voice Enabled
                  </p>
                </div>
              </div>

              {/* Top Controls: Voice Toggle & Close */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setAutoVoiceEnabled(!autoVoiceEnabled)
                    if (speakingMessageId) stopSpeaking()
                  }}
                  className={`p-2 rounded-xl transition-all ${
                    autoVoiceEnabled
                      ? "bg-white/20 text-white"
                      : "bg-black/20 text-white/60 hover:text-white"
                  }`}
                  title={autoVoiceEnabled ? "Auto-Voice Active" : "Voice Muted"}
                >
                  {autoVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  onClick={toggleAssistantOpen}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* MULTILINGUAL SELECTOR BAR (20+ Indian Languages) */}
            <div className="relative mt-3" ref={dropdownRef}>
              <div className="flex items-center justify-between gap-2 bg-black/25 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 text-xs">
                <div className="flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span className="text-[11px] text-emerald-100">Language:</span>
                  <button
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="font-bold text-white hover:text-emerald-200 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{selectedLang.nativeName} ({selectedLang.name})</span>
                    <ChevronDown className="w-3.5 h-3.5 text-emerald-200" />
                  </button>
                </div>

                <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-md font-mono text-emerald-200">
                  {selectedLang.speechCode}
                </span>
              </div>

              {/* 20+ LANGUAGES DROPDOWN MENU */}
              {isLangDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-[#E5EBE5] text-[#25352C] z-50 overflow-hidden flex flex-col max-h-72 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-2.5 border-b border-[#E5EBE5] bg-[#F5F7F3] flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#68766C]" />
                    <input
                      type="text"
                      placeholder="Search from 22 Indian languages..."
                      value={langSearch}
                      onChange={(e) => setLangSearch(e.target.value)}
                      className="w-full text-xs outline-none bg-transparent"
                      autoFocus
                    />
                  </div>

                  <div className="overflow-y-auto p-1.5 space-y-0.5 max-h-56 scrollbar-thin">
                    {filteredLanguages.map((lang) => {
                      const isSelected = selectedLang.code === lang.code
                      return (
                        <button
                          key={lang.code}
                          onClick={() => handleSelectLanguage(lang)}
                          className={`w-full px-3 py-2 rounded-xl text-left text-xs flex items-center justify-between transition-all ${
                            isSelected
                              ? "bg-[#DDF3E6] text-[#073B2A] font-bold"
                              : "hover:bg-[#F5F7F3] text-[#25352C]"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm">{lang.nativeName}</span>
                              <span className="text-[11px] text-[#68766C]">({lang.name})</span>
                            </div>
                            <span className="text-[10px] text-[#68766C] block">{lang.region}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#087A4B] shrink-0" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* REALISTIC VOICE PERSONA SWITCHER & TELEMETRY */}
          <div className="bg-[#F5F7F3] px-4 py-2 border-b border-[#E5EBE5] flex items-center justify-between text-[11px] text-[#25352C] flex-wrap gap-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[#68766C] font-medium">Voice:</span>
              <div className="inline-flex rounded-lg bg-white p-0.5 border border-[#E5EBE5]">
                <button
                  type="button"
                  onClick={() => setVoicePersona("male")}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                    voicePersona === "male"
                      ? "bg-[#087A4B] text-white shadow-xs"
                      : "text-[#68766C] hover:text-[#25352C]"
                  }`}
                  title="Krishi Mitra (Manohar / Madhur) - Authentic rural male farmer voice"
                >
                  👨‍🌾 Krishi Mitra
                </button>
                <button
                  type="button"
                  onClick={() => setVoicePersona("female")}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                    voicePersona === "female"
                      ? "bg-[#087A4B] text-white shadow-xs"
                      : "text-[#68766C] hover:text-[#25352C]"
                  }`}
                  title="Krishi Sakhi (Aarohi / Swara) - Empathetic female extension officer voice"
                >
                  👩‍🌾 Krishi Sakhi
                </button>
              </div>
            </div>

            <span className="text-[10px] text-[#087A4B] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A36A] animate-pulse" />
              Realistic Neural Audio
            </span>
          </div>

          {/* CHAT MESSAGES SCROLL AREA */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => {
              const isAssistant = message.role === "assistant"
              const isSpeakingThis = speakingMessageId === message.id
              return (
                <div
                  key={message.id}
                  className={`flex flex-col ${isAssistant ? "items-start" : "items-end"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-3xl p-4 text-xs leading-relaxed shadow-xs transition-all ${
                      isAssistant
                        ? "bg-[#F5F7F3] text-[#25352C] border border-[#E5EBE5] rounded-tl-sm"
                        : "bg-[#087A4B] text-white rounded-tr-sm"
                    }`}
                  >
                    <div className="whitespace-pre-line">{message.content}</div>

                    <div
                      className={`flex items-center justify-between gap-2 mt-2.5 pt-2 border-t text-[10px] ${
                        isAssistant ? "border-[#E5EBE5] text-[#68766C]" : "border-white/20 text-emerald-100"
                      }`}
                    >
                      <span>{message.timestamp}</span>

                      {isAssistant && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => speakMessage(message.content, message.id)}
                            className={`px-2 py-1 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                              isSpeakingThis
                                ? "bg-[#087A4B] text-white font-bold shadow-xs"
                                : "bg-white hover:bg-[#DDF3E6] text-[#087A4B] border border-[#E5EBE5]"
                            }`}
                            title={isSpeakingThis ? "Stop Voice" : `Listen with ${voicePersona === "male" ? "Krishi Mitra" : "Krishi Sakhi"} voice`}
                          >
                            {isSpeakingThis ? (
                              <>
                                <div className="flex items-center gap-0.5 h-3">
                                  <span className="w-0.5 h-3 bg-white animate-pulse" />
                                  <span className="w-0.5 h-2 bg-white animate-bounce" />
                                  <span className="w-0.5 h-3.5 bg-white animate-pulse" />
                                </div>
                                <span className="font-bold text-[10px]">Speaking...</span>
                                <Square className="w-2.5 h-2.5 fill-current ml-0.5" />
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3 h-3 text-[#087A4B]" />
                                <span className="font-bold text-[10px]">Listen Voice</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#087A4B] bg-[#DDF3E6] p-3 rounded-2xl w-fit">
                <Loader2 className="w-4 h-4 animate-spin text-[#087A4B]" />
                <span>KrishiNova AI is analyzing botanical models...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* QUICK PROMPT PILLS IN SELECTED INDIAN LANGUAGE */}
          <div className="px-4 py-2 border-t border-[#E5EBE5] bg-white overflow-x-auto scrollbar-none flex items-center gap-1.5">
            {selectedLang.quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[#F5F7F3] hover:bg-[#DDF3E6] hover:text-[#073B2A] text-[#25352C] border border-[#E5EBE5] text-[11px] font-semibold transition-all shrink-0 cursor-pointer disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* VOICE LISTENING ANIMATION / PULSE STRIP */}
          {isListening && (
            <div className="bg-[#FFF1F0] border-t border-[#D94B45]/20 p-3 flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                <div>
                  <span className="text-xs font-bold text-[#D94B45] block">
                    Listening in {selectedLang.nativeName}...
                  </span>
                  <span className="text-[10px] text-[#68766C]">
                    Speak now, your voice query will be submitted automatically.
                  </span>
                </div>
              </div>

              <button
                onClick={toggleListening}
                className="px-3 py-1 rounded-xl bg-red-600 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Stop
              </button>
            </div>
          )}

          {speechError && (
            <div className="bg-amber-50 border-t border-amber-200 px-3 py-1.5 text-[11px] text-amber-800 flex items-center justify-between">
              <span>{speechError}</span>
              <button onClick={() => setSpeechError(null)} className="font-bold text-xs ml-2">
                &times;
              </button>
            </div>
          )}

          {/* INPUT FORM WITH VOICE CHAT MIC */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="p-3 bg-white border-t border-[#E5EBE5] flex items-center gap-2"
          >
            {/* VOICE CHAT MICROPHONE BUTTON */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-3 rounded-2xl transition-all duration-200 flex items-center justify-center shrink-0 cursor-pointer ${
                isListening
                  ? "bg-red-500 text-white shadow-lg shadow-red-500/30 scale-105"
                  : "bg-[#DDF3E6] hover:bg-[#087A4B] text-[#087A4B] hover:text-white"
              }`}
              title={`Voice Chat in ${selectedLang.nativeName}`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* TEXT INPUT */}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? selectedLang.micPlaceholder : selectedLang.inputPlaceholder}
              disabled={isLoading || isListening}
              className="flex-1 bg-[#F5F7F3] border border-[#E5EBE5] rounded-2xl px-4 py-2.5 text-xs text-[#25352C] outline-none focus:border-[#087A4B] focus:ring-1 focus:ring-[#087A4B] transition-all disabled:opacity-70"
            />

            {/* SEND BUTTON */}
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 rounded-2xl bg-[#087A4B] hover:bg-[#06633D] text-white disabled:opacity-40 disabled:hover:bg-[#087A4B] transition-all shrink-0 cursor-pointer shadow-xs"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
