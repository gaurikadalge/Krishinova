"use client"

import React from "react"
import { Sprout, Calendar, MapPin, Sparkles } from "lucide-react"
import { useReveal } from "@/components/ui-extras/use-reveal"

interface TrustMarqueeProps {
  language: "en" | "hi" | "ur" | "mr"
  className?: string
}

interface MarqueeItem {
  iconType: "crop" | "season" | "district" | "badge"
  label: string
  sub?: string
}

const translations: Record<"en" | "hi" | "ur" | "mr", { prefix: string; items: MarqueeItem[] }> = {
  en: {
    prefix: "Trusted by Farmers Across Maharashtra",
    items: [
      { iconType: "crop", label: "Sugarcane", sub: "Cash Crop" },
      { iconType: "district", label: "Nashik", sub: "District" },
      { iconType: "season", label: "Kharif & Rabi", sub: "Seasons" },
      { iconType: "crop", label: "Cotton", sub: "Precision Recs" },
      { iconType: "district", label: "Pune", sub: "District" },
      { iconType: "badge", label: "96.8% Accuracy", sub: "AI Models" },
      { iconType: "crop", label: "Soybean", sub: "Soil Optimized" },
      { iconType: "district", label: "Kolhapur", sub: "District" },
      { iconType: "crop", label: "Pomegranate", sub: "Water Conserved" },
      { iconType: "district", label: "Ahmednagar", sub: "District" },
      { iconType: "season", label: "Zaid Cycle", sub: "Irrigation Sync" },
      { iconType: "district", label: "Aurangabad", sub: "District" },
      { iconType: "crop", label: "Grapes & Turmeric", sub: "High Yield" },
      { iconType: "district", label: "Solapur", sub: "District" },
    ],
  },
  hi: {
    prefix: "महाराष्ट्र भर के किसानों द्वारा विश्वसनीय",
    items: [
      { iconType: "crop", label: "गन्ना", sub: "नगदी फसल" },
      { iconType: "district", label: "नासिक", sub: "जिला" },
      { iconType: "season", label: "खरीफ एवं रबी", sub: "मौसम" },
      { iconType: "crop", label: "कपास", sub: "सटीक सिफारिश" },
      { iconType: "district", label: "पुणे", sub: "जिला" },
      { iconType: "badge", label: "96.8% सटीकता", sub: "AI मॉडल" },
      { iconType: "crop", label: "सोयाबीन", sub: "मृदा अनुकूलित" },
      { iconType: "district", label: "कोल्हापुर", sub: "जिला" },
      { iconType: "crop", label: "अनार", sub: "जल संरक्षण" },
      { iconType: "district", label: "अहमदनगर", sub: "जिला" },
      { iconType: "season", label: "जायद चक्र", sub: "सिंचाई समन्वय" },
      { iconType: "district", label: "औरंगाबाद", sub: "जिला" },
      { iconType: "crop", label: "अंगूर एवं हल्दी", sub: "उच्च पैदावार" },
      { iconType: "district", label: "सोलापुर", sub: "जिला" },
    ],
  },
  ur: {
    prefix: "پورے مہاراشٹر میں کسانوں کا قابل اعتماد ساتھی",
    items: [
      { iconType: "crop", label: "گنا", sub: "نقد فصل" },
      { iconType: "district", label: "ناسک", sub: "ضلع" },
      { iconType: "season", label: "خریف اور ربیع", sub: "موسم" },
      { iconType: "crop", label: "کپاس", sub: "درست تجاویز" },
      { iconType: "district", label: "پونے", sub: "ضلع" },
      { iconType: "badge", label: "96.8% درستگی", sub: "AI ماڈلز" },
      { iconType: "crop", label: "سویا بین", sub: "مٹی کے موافق" },
      { iconType: "district", label: "کولہاپور", sub: "ضلع" },
      { iconType: "crop", label: "انار", sub: "پانی کی بچت" },
      { iconType: "district", label: "احمد نگر", sub: "ضلع" },
      { iconType: "season", label: "زائد سیزن", sub: "آبپاشی شیڈول" },
      { iconType: "district", label: "اورنگ آباد", sub: "ضلع" },
      { iconType: "crop", label: "انگور اور ہلدی", sub: "بہترین پیداوار" },
      { iconType: "district", label: "سولاپور", sub: "ضلع" },
    ],
  },
  mr: {
    prefix: "महाराष्ट्रभरातील शेतकऱ्यांचा विश्वासू भागीदार",
    items: [
      { iconType: "crop", label: "ऊस", sub: "नगदी पीक" },
      { iconType: "district", label: "नाशिक", sub: "जिल्हा" },
      { iconType: "season", label: "खरीप आणि रब्बी", sub: "हंगाम" },
      { iconType: "crop", label: "कापूस", sub: "अचूक शिफारस" },
      { iconType: "district", label: "पुणे", sub: "जिल्हा" },
      { iconType: "badge", label: "96.8% अचूकता", sub: "AI मॉडेल्स" },
      { iconType: "crop", label: "सोयाबीन", sub: "माती अनुकूल" },
      { iconType: "district", label: "कोल्हापूर", sub: "जिल्हा" },
      { iconType: "crop", label: "डाळिंब", sub: "जल संवर्धन" },
      { iconType: "district", label: "अहमदनगर", sub: "जिल्हा" },
      { iconType: "season", label: "उन्हाळी हंगाम", sub: "सिंचन नियोजन" },
      { iconType: "district", label: "छ. संभाजीनगर", sub: "जिल्हा" },
      { iconType: "crop", label: "द्राक्षे आणि हळद", sub: "भरघोस उत्पादन" },
      { iconType: "district", label: "सोलापूर", sub: "जिल्हा" },
    ],
  },
}

export default function TrustMarquee({ language, className = "" }: TrustMarqueeProps) {
  const t = translations[language] || translations.en
  const isRtl = language === "ur"
  const { ref, isRevealed } = useReveal<HTMLDivElement>({ threshold: 0.1 })

  const renderIcon = (type: MarqueeItem["iconType"]) => {
    switch (type) {
      case "crop": return <Sprout className="w-3.5 h-3.5 text-[#c8f53c] shrink-0" />
      case "district": return <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
      case "season": return <Calendar className="w-3.5 h-3.5 text-secondary shrink-0" />
      case "badge": return <Sparkles className="w-3.5 h-3.5 text-[#c8f53c] shrink-0" />
    }
  }

  const renderStrip = (keyPrefix: string) => (
    <div className="flex shrink-0 animate-marquee items-center gap-4 py-1.5 group-hover:[animation-play-state:paused]">
      {t.items.map((item, idx) => (
        <div
          key={`${keyPrefix}-${idx}`}
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full
            bg-white/15 dark:bg-black/30 backdrop-blur-xl
            border border-white/25 dark:border-white/15
            hover:border-[#c8f53c]/40 hover:bg-white/25
            shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_4px_12px_-2px_rgba(0,0,0,0.2)]
            transition-all duration-300 shrink-0 cursor-default"
        >
          <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
            {renderIcon(item.iconType)}
          </div>
          <div className="flex items-baseline gap-1.5 whitespace-nowrap">
            <span className="text-xs font-bold text-white tracking-tight">{item.label}</span>
            {item.sub && (
              <span className="text-[10px] uppercase font-medium text-white/70">• {item.sub}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <section
      ref={ref}
      dir={isRtl ? "rtl" : "ltr"}
      aria-label="Trust Marquee"
      className={`relative w-full py-5
        bg-transparent
        border-y border-white/15
        overflow-hidden transition-all duration-700
        ${isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 mb-3 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#c8f53c] animate-pulse shrink-0" />
        <p className="text-xs font-semibold tracking-wider uppercase text-white/90 text-center drop-shadow-sm">
          {t.prefix}
        </p>
      </div>

      <div className="group relative flex overflow-x-hidden [mask-image:_linear-gradient(to_right,_transparent_0%,_black_6%,_black_94%,_transparent_100%)]">
        {renderStrip("a")}
        <div aria-hidden="true">{renderStrip("b")}</div>
      </div>
    </section>
  )
}
