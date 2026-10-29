"use client"

import React, { useEffect, useState } from "react"
import { Users, Sprout, MapPinned, Target } from "lucide-react"
import { useReveal } from "@/components/ui-extras/use-reveal"

interface StatsStripProps {
  language: "en" | "hi" | "ur" | "mr"
  className?: string
}

export const STATS_DATA = {
  farmersHelped: { target: 50000, suffix: "+" },
  cropsSupported: { target: 45, suffix: "+" },
  districtsCovered: { target: 36, suffix: "/36" },
  predictionAccuracy: { target: 96.8, suffix: "%", decimals: 1 },
}

const translations = {
  en: {
    badge: "Verified Impact",
    heading: "Empowering Rural Maharashtra with Precision AI",
    stats: [
      { id: "farmers", label: "Farmers Empowered", sub: "Active across Maharashtra" },
      { id: "crops", label: "Crops Supported", sub: "Soil & climate modeled" },
      { id: "districts", label: "Districts Covered", sub: "100% state coverage" },
      { id: "accuracy", label: "Prediction Accuracy", sub: "Validated seasonal models" },
    ],
  },
  hi: {
    badge: "सत्यापित प्रभाव",
    heading: "सटीक AI के साथ ग्रामीण महाराष्ट्र का सशक्तिकरण",
    stats: [
      { id: "farmers", label: "सशक्त किसान", sub: "महाराष्ट्र भर में सक्रिय" },
      { id: "crops", label: "समर्थित फसलें", sub: "मृदा और जलवायु आधारित" },
      { id: "districts", label: "कवर किए गए जिले", sub: "100% राज्य कवरेज" },
      { id: "accuracy", label: "भविष्यवाणी सटीकता", sub: "सत्यापित मौसमी मॉडल" },
    ],
  },
  ur: {
    badge: "تصدیق شدہ اثرات",
    heading: "درست AI کے ساتھ دیہی مہاراشٹر کو بااختیار بنانا",
    stats: [
      { id: "farmers", label: "بااختیار کسان", sub: "پورے مہاراشٹر میں فعال" },
      { id: "crops", label: "معاون فصلیں", sub: "مٹی اور موسم کے مطابق" },
      { id: "districts", label: "شامل اضلاع", sub: "100% ریاستی رسائی" },
      { id: "accuracy", label: "پیش گوئی کی درستگی", sub: "تصدیق شدہ موسمی ماڈلز" },
    ],
  },
  mr: {
    badge: "प्रमाणित प्रभाव",
    heading: "अचूक कृषी AI द्वारे ग्रामीण महाराष्ट्राचे सक्षमीकरण",
    stats: [
      { id: "farmers", label: "सशक्त शेतकरी", sub: "महाराष्ट्रभर सक्रिय" },
      { id: "crops", label: "समर्थित पिके", sub: "माती व हवामान विश्लेषित" },
      { id: "districts", label: "व्यापलेले जिल्हे", sub: "१००% राज्यस्तरीय व्याप्ती" },
      { id: "accuracy", label: "अंदाजाची अचूकता", sub: "प्रमाणित हंगामी मॉडेल" },
    ],
  },
}

const icons = [Users, Sprout, MapPinned, Target]

export default function StatsStrip({ language, className = "" }: StatsStripProps) {
  const t = translations[language] || translations.en
  const isRtl = language === "ur"
  const { ref, isRevealed } = useReveal<HTMLDivElement>({ threshold: 0.2 })
  const [counts, setCounts] = useState({ farmers: 0, crops: 0, districts: 0, accuracy: 0 })

  useEffect(() => {
    if (!isRevealed) return
    const duration = 1600
    const frameRate = 30
    const totalFrames = Math.round((duration / 1000) * frameRate)
    let frame = 0
    const timer = setInterval(() => {
      frame++
      const progress = Math.min(frame / totalFrames, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCounts({
        farmers: Math.round(STATS_DATA.farmersHelped.target * ease),
        crops: Math.round(STATS_DATA.cropsSupported.target * ease),
        districts: Math.round(STATS_DATA.districtsCovered.target * ease),
        accuracy: Number((STATS_DATA.predictionAccuracy.target * ease).toFixed(1)),
      })
      if (frame >= totalFrames) clearInterval(timer)
    }, 1000 / frameRate)
    return () => clearInterval(timer)
  }, [isRevealed])

  const formattedValues = [
    `${counts.farmers.toLocaleString()}${STATS_DATA.farmersHelped.suffix}`,
    `${counts.crops}${STATS_DATA.cropsSupported.suffix}`,
    `${counts.districts}${STATS_DATA.districtsCovered.suffix}`,
    `${counts.accuracy.toFixed(1)}${STATS_DATA.predictionAccuracy.suffix}`,
  ]

  return (
    <section
      ref={ref}
      dir={isRtl ? "rtl" : "ltr"}
      className={`relative w-full py-14 md:py-20 overflow-hidden bg-transparent ${className}`}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md text-white border border-white/15 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#c8f53c] animate-pulse shrink-0" />
            {t.badge}
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight font-heading drop-shadow-md">
            {t.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.stats.map((stat, idx) => {
            const Icon = icons[idx]
            return (
              <div
                key={stat.id}
                style={{ transitionDelay: `${idx * 120}ms` }}
                className={`relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-500 group flex flex-col justify-between overflow-hidden
                  bg-white/10 border-white/15 hover:bg-white/15 hover:border-[#c8f53c]/30 hover:-translate-y-2
                  shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_12px_40px_-8px_rgba(0,0,0,0.25)]
                  hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_16px_50px_-8px_rgba(0,0,0,0.35),0_0_25px_-5px_rgba(200,245,60,0.15)]
                  ${isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                  <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/8 via-transparent to-transparent rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 group-hover:bg-[#c8f53c] group-hover:border-[#c8f53c] text-white group-hover:text-[#0a1f13] flex items-center justify-center transition-all duration-300">
                      <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-[#c8f53c] transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(200,245,60,0.5)]" />
                  </div>
                  <div className="mb-3">
                    <div className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-[#c8f53c] transition-colors">
                      {formattedValues[idx]}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/90">{stat.label}</h3>
                    <p className="text-xs text-white/50 mt-0.5">{stat.sub}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
