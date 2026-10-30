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
    badge: "Verified Field Impact",
    heading: "Empowering Rural Maharashtra with Precision AI",
    stats: [
      { id: "farmers", label: "Farmers Empowered", sub: "Active across Maharashtra" },
      { id: "crops", label: "Crops Supported", sub: "Soil & climate modeled" },
      { id: "districts", label: "Districts Covered", sub: "100% state coverage" },
      { id: "accuracy", label: "Prediction Accuracy", sub: "Validated seasonal models" },
    ],
  },
  hi: {
    badge: "सत्यापित जमीनी प्रभाव",
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
    badge: "प्रमाणित क्षेत्रीय प्रभाव",
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
      className={`relative w-full py-16 md:py-24 bg-[#F5F7F3] border-b border-[#E5EBE5] ${className}`}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center max-w-2xl mx-auto mb-14 transition-all duration-700 ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#DDF3E6] text-[#073B2A] border border-[#16A36A]/20 mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#16A36A] animate-pulse shrink-0" />
            {t.badge}
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#25352C] tracking-tight font-heading">
            {t.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.stats.map((stat, idx) => {
            const Icon = icons[idx]
            return (
              <div
                key={stat.id}
                style={{ transitionDelay: `${idx * 100}ms` }}
                className={`relative p-6 rounded-3xl bg-white border border-[#E5EBE5] shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ${
                  isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#DDF3E6] text-[#087A4B] flex items-center justify-center border border-[#16A36A]/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#16A36A]" />
                  </div>
                  <div className="mb-2">
                    <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#073B2A] tracking-tight">
                      {formattedValues[idx]}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F0F5F0]">
                  <h3 className="text-sm font-bold text-[#25352C]">{stat.label}</h3>
                  <p className="text-xs text-[#68766C] mt-0.5">{stat.sub}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
