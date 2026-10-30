"use client"

import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Leaf } from "lucide-react"

interface MissionStatementProps {
  language: "en" | "hi" | "ur" | "mr"
  className?: string
}

const translations = {
  en: {
    badge: "Krishinova Mission & Vision",
    part1: "Our platform is built to empower smallholder farmers, agribusinesses, and agricultural innovators by delivering",
    part2: "practical decision-support tools that respect the land while maximizing climate-resilient yield.",
  },
  hi: {
    badge: "कृषिनोवा मिशन एवं दृष्टिकोण",
    part1: "हमारा प्लेटफॉर्म किसानों, कृषि व्यवसायों और नवप्रवर्तकों को सशक्त बनाने के लिए समर्पित है, जो प्रदान करता है",
    part2: "ऐसे व्यावहारिक साधन जो उत्पादकता बढ़ाने के साथ-साथ मृदा व जल का संरक्षण करते हैं।",
  },
  ur: {
    badge: "کرشی نووا کا مشن",
    part1: "ہمارا پلیٹ فارم کسانوں اور زرعی اختراع کاروں کی معاونت کے لیے ڈیزائن کیا گیا ہے تاکہ فراہم کیے جا سکیں",
    part2: "ایسے عملی آلات جو زمین کا احترام کرتے ہوئے پائیدار زرعی پیداوار کو یقینی بنائیں۔",
  },
  mr: {
    badge: "कृषिनोव्हा ध्येय आणि दृष्टी",
    part1: "आमचे व्यासपीठ अल्पभूधारक शेतकरी, कृषी व्यवसाय आणि संशोधकांना पाठबळ देण्यासाठी तयार केले आहे, जे उपलब्ध करते",
    part2: "अशी व्यावहारिक निर्णय साधने जी उत्पादकता वाढवताना माती व पाण्याचे संवर्धन करतात.",
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
          const windowHeight = window.innerHeight

          const startOffset = windowHeight * 0.85
          const endOffset = windowHeight * 0.25
          const currentPos = startOffset - rect.top
          const totalDistance = startOffset - endOffset

          const progress = Math.min(Math.max(currentPos / totalDistance, 0), 1)
          setScrollProgress(progress)
          ticking = false
        })
        ticking = true
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting
        if (isIntersecting) handleScroll()
      },
      { rootMargin: "50px 0px 50px 0px" }
    )

    if (containerRef.current) observer.observe(containerRef.current)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className={cn("w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F5F7F3]", className)}
    >
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto bg-[#073B2A] text-white border border-[#10543C] rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 shadow-xl transition-all"
      >
        {/* Pill Badge */}
        <div className="mb-8 md:mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-full bg-[#10543C] text-[#DDF3E6] border border-[#16A36A]/30 shadow-sm">
            <Leaf className="w-3.5 h-3.5 text-[#16A36A]" />
            {t.badge}
          </span>
        </div>

        {/* Mission Statement Paragraph with Word Reveal */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.35] tracking-tight">
          {words1.map((word, idx) => {
            const wordThreshold = idx / totalWords
            const isRevealed = scrollProgress >= wordThreshold
            return (
              <React.Fragment key={`p1-${idx}`}>
                <span
                  className={cn(
                    "inline-block transition-colors duration-300 ease-out",
                    isRevealed ? "text-white font-bold" : "text-white/40"
                  )}
                >
                  {word}
                </span>{" "}
              </React.Fragment>
            )
          })}

          {words2.map((word, idx) => {
            const wordThreshold = (words1.length + idx) / totalWords
            const isRevealed = scrollProgress >= wordThreshold
            return (
              <React.Fragment key={`p2-${idx}`}>
                <span
                  className={cn(
                    "inline-block transition-colors duration-300 ease-out",
                    isRevealed ? "text-[#16A36A] font-extrabold" : "text-white/30"
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
