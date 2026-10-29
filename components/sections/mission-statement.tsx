"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface MissionStatementProps {
  language: "en" | "hi" | "ur" | "mr"
  className?: string
}

const translations = {
  en: {
    badge: "Krishinova Legacy",
    part1: "Our platform is built to support farmers, agribusinesses, and agricultural innovators by delivering",
    part2: "practical tools that respect the land while improving productivity.",
  },
  hi: {
    badge: "कृषिनोवा विरासत",
    part1: "हमारा प्लेटफॉर्म किसानों, कृषि व्यवसायों और कृषि नवप्रवर्तकों को सशक्त बनाने के लिए समर्पित है, जो प्रदान करता है",
    part2: "ऐसे व्यावहारिक साधन जो उत्पादकता बढ़ाने के साथ-साथ मिट्टी व भूमि का सम्मान करते हैं।",
  },
  ur: {
    badge: "کرشی نووا کی میراث",
    part1: "ہمارا پلیٹ فارم کسانوں، زرعی کاروباروں اور زرعی اختراع کاروں کی معاونت کے لیے ڈیزائن کیا گیا ہے تاکہ فراہم کیے جا سکیں",
    part2: "ایسے عملی آلات جو زمین کا احترام کرتے ہوئے پیداواری صلاحیت کو فروغ دیتے ہیں۔",
  },
  mr: {
    badge: "कृषिनोव्हा वारसा",
    part1: "आमचे व्यासपीठ शेतकरी, कृषी व्यवसाय आणि कृषी संशोधकांना पाठबळ देण्यासाठी तयार केले आहे, जे उपलब्ध करते",
    part2: "अशी व्यावहारिक साधने जी उत्पादकता वाढवताना जमिनीचा सन्मान राखतात.",
  },
}

export default function MissionStatement({ language, className }: MissionStatementProps) {
  const t = translations[language] || translations.en
  const isRtl = language === "ur"
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const words1 = t.part1.split(" ")
  const words2 = t.part2.split(" ")
  const totalWords = words1.length + words2.length

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) {
      setScrollProgress(1)
      return
    }

    let isIntersecting = false
    let ticking = false

    const handleScroll = () => {
      if (!isIntersecting || !containerRef.current) return

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return
          const rect = containerRef.current.getBoundingClientRect()
          const vh = window.innerHeight
          // Begin revealing when entering bottom 85% of viewport; complete near top 25%
          const start = vh * 0.85
          const end = vh * 0.25
          const current = (start - rect.top) / (start - end)
          const clamped = Math.max(0, Math.min(1, current))
          setScrollProgress(clamped)
          ticking = false
        })
        ticking = true
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting = entry.isIntersecting
          if (entry.isIntersecting) {
            handleScroll()
          }
        })
      },
      { threshold: [0, 0.2, 0.5, 0.8, 1.0] }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className={cn("w-full py-12 md:py-20 px-4 md:px-8", className)}
    >
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto bg-white/15 dark:bg-black/25 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_20px_50px_-15px_rgba(0,0,0,0.2)] transition-all"
      >
        {/* Pill Badge */}
        <div className="mb-8 md:mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-xl text-white border border-white/30 dark:border-white/15 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#c8f53c] shrink-0 animate-pulse" />
            {t.badge}
          </span>
        </div>

        {/* Mission Statement Paragraph with Word Reveal */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.3] md:leading-[1.25] tracking-tight">
          {/* Part 1 (Crisp White Reveal on Frosted Glass) */}
          {words1.map((word, idx) => {
            const wordThreshold = idx / totalWords
            const isRevealed = scrollProgress >= wordThreshold
            return (
              <React.Fragment key={`p1-${idx}`}>
                <span
                  className={cn(
                    "inline-block transition-colors duration-300 ease-out motion-reduce:transition-none",
                    isRevealed
                      ? "text-white font-bold drop-shadow-md"
                      : "text-white/40 font-medium"
                  )}
                >
                  {word}
                </span>{" "}
              </React.Fragment>
            )
          })}

          {/* Part 2 (Lush Lime Accent Reveal) */}
          {words2.map((word, idx) => {
            const wordThreshold = (words1.length + idx) / totalWords
            const isRevealed = scrollProgress >= wordThreshold
            return (
              <React.Fragment key={`p2-${idx}`}>
                <span
                  className={cn(
                    "inline-block transition-colors duration-300 ease-out motion-reduce:transition-none",
                    isRevealed
                      ? "text-[#c8f53c] font-semibold drop-shadow-md"
                      : "text-white/30 font-normal"
                  )}
                >
                  {word}
                </span>{" "}
              </React.Fragment>
            )
          })}
        </h2>
      </div>
    </section>
  )
}
