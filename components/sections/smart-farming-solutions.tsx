"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Sprout, Leaf, Tractor, Droplets, Plus, Minus, TrendingUp, Sparkles, ShieldCheck, Gauge } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { useReveal } from "@/components/ui-extras/use-reveal"

interface SmartFarmingSolutionsProps {
  language: "en" | "hi" | "ur" | "mr"
  className?: string
}

const translations = {
  en: {
    badge: "About Krishinova",
    headingMain: "Smart Farming Solutions",
    headingItalic: "That Deliver Real Results",
    description:
      "Our intelligent agriculture solutions help farmers grow more with less by optimizing resources, improving crop health, and supporting long term sustainability across every season.",
    items: [
      {
        id: "productivity",
        title: "Proven Farm Productivity",
        content:
          "Our data driven farming solutions help increase crop yield, reduce operational waste, and improve overall farm performance with measurable seasonal results.",
        badgeTitle: "Yield Boost",
        badgeValue: "+28% Seasonal Gain",
        badgeSub: "Verified across 50,000+ acres",
      },
      {
        id: "optimization",
        title: "Intelligent Crop Optimization",
        content:
          "AI-powered crop recommendations driven by real-time soil chemistry and 4-year climate data to maximize seasonal harvest predictability.",
        badgeTitle: "AI Prediction",
        badgeValue: "96.8% Model Accuracy",
        badgeSub: "Soil N-P-K & Weather Sync",
      },
      {
        id: "integration",
        title: "Seamless Farm System Integration",
        content:
          "Unified farm intelligence connecting weather forecasts, market mandi prices, government schemes, and field sensors in one intuitive platform.",
        badgeTitle: "Live Telemetry",
        badgeValue: "42 Mandis & Schemes",
        badgeSub: "Real-time automated syncing",
      },
      {
        id: "water",
        title: "Smart Water & Resource Management",
        content:
          "Dynamic evapotranspiration modeling and tank volume optimization that delivers precise irrigation schedules while conserving groundwater.",
        badgeTitle: "Water Conserved",
        badgeValue: "33,000L / Acre Saved",
        badgeSub: "Precision irrigation schedule",
      },
    ],
  },
  hi: {
    badge: "कृषिनोवा के बारे में",
    headingMain: "स्मार्ट खेती समाधान",
    headingItalic: "जो वास्तविक परिणाम देते हैं",
    description:
      "हमारे बुद्धिमान कृषि समाधान संसाधनों के अनुकूलन, फसल स्वास्थ्य में सुधार और हर मौसम में दीर्घकालिक स्थिरता का समर्थन करके किसानों को कम लागत में अधिक उत्पादन करने में मदद करते हैं।",
    items: [
      {
        id: "productivity",
        title: "प्रमाणित कृषि उत्पादकता",
        content:
          "हमारे डेटा-संचालित कृषि समाधान फसल की पैदावार बढ़ाने, परिचालन बर्बादी को कम करने और मापने योग्य मौसमी परिणामों के साथ समग्र कृषि प्रदर्शन को बेहतर बनाने में मदद करते हैं।",
        badgeTitle: "उपज वृद्धि",
        badgeValue: "+28% मौसमी लाभ",
        badgeSub: "50,000+ एकड़ में सत्यापित",
      },
      {
        id: "optimization",
        title: "बुद्धिमान फसल अनुकूलन",
        content:
          "मौसमी फसल की सटीकता को अधिकतम करने के लिए वास्तविक समय मिट्टी की गुणवत्ता और 4-वर्षीय जलवायु डेटा द्वारा संचालित AI फसल सिफारिशें।",
        badgeTitle: "AI भविष्यवाणी",
        badgeValue: "96.8% मॉडल सटीकता",
        badgeSub: "मृदा N-P-K व मौसम तालमेल",
      },
      {
        id: "integration",
        title: "सहज कृषि प्रणाली एकीकरण",
        content:
          "मौसम पूर्वानुमान, मंडी भाव, सरकारी योजनाओं और मिट्टी के सेंसर को एक सहज मंच पर जोड़ने वाली एकीकृत कृषि प्रणाली।",
        badgeTitle: "लाइव टेलीमेट्री",
        badgeValue: "42 मंडियां व योजनाएं",
        badgeSub: "स्वचालित रीयल-टाइम सिंक",
      },
      {
        id: "water",
        title: "स्मार्ट जल एवं संसाधन प्रबंधन",
        content:
          "वाष्पीकरण-उत्सर्जन मॉडलिंग और टैंक जल भंडारण अनुकूलन जो भूजल का संरक्षण करते हुए सटीक सिंचाई कार्यक्रम प्रदान करता है।",
        badgeTitle: "जल बचत",
        badgeValue: "33,000 ली / एकड़ बचत",
        badgeSub: "सटीक सिंचाई समय सारिणी",
      },
    ],
  },
  ur: {
    badge: "کرشی نووا کے بارے میں",
    headingMain: "سمارٹ فارمنگ کے حل",
    headingItalic: "جو حقیقی نتائج فراہم کرتے ہیں",
    description:
      "ہمارے ذہین زرعی حل وسائل کی بچت، فصلوں کی صحت میں بہتری اور ہر موسم میں پائیداری کو فروغ دے کر کسانوں کو کم لاگت میں زیادہ پیداوار حاصل کرنے میں مدد دیتے ہیں۔",
    items: [
      {
        id: "productivity",
        title: "مستند زرعی پیداواری صلاحیت",
        content:
          "ہمارے ڈیٹا پر مبنی حل فصل کی پیداوار بڑھانے، ضیاع کو کم کرنے اور قابل پیمائش موسمی نتائج کے ساتھ کارکردگی بہتر بنانے میں مدد کرتے ہیں۔",
        badgeTitle: "پیداواری اضافہ",
        badgeValue: "+28% موسمی منافع",
        badgeSub: "50,000+ ایکڑ میں تصدیق شدہ",
      },
      {
        id: "optimization",
        title: "ذہین فصل کی بہتری",
        content:
          "موسمی فصل کی پیشین گوئی کو زیادہ سے زیادہ درست بنانے کے لیے مٹی کے تجزیے اور 4 سالہ موسمی ڈیٹا سے چلنے والی AI سفارشات۔",
        badgeTitle: "AI پیشن گوئی",
        badgeValue: "96.8% ماڈل درستگی",
        badgeSub: "مٹی اور موسم کی ہم آہنگی",
      },
      {
        id: "integration",
        title: "ہموار زرعی نظام کا انضمام",
        content:
          "موسم کی پیش گوئی، منڈی کے نرخ، حکومتی اسکیموں اور مٹی کے سینسرز کو ایک ہی پلیٹ فارم پر یکجا کرنے والی ذہین ٹیکنالوجی۔",
        badgeTitle: "لائیو ڈیٹا",
        badgeValue: "42 منڈیاں اور اسکیمیں",
        badgeSub: "خودکار حقیقی وقت کا ڈیٹا",
      },
      {
        id: "water",
        title: "سمارٹ پانی اور وسائل کا انتظام",
        content:
          "بخارات کے اخراج اور پانی کے ٹینک کی دیکھ بھال کا ماڈل جو زیر زمین پانی کو بچاتے ہوئے آبپاشی کا درست شیڈول فراہم کرتا ہے۔",
        badgeTitle: "پانی کی بچت",
        badgeValue: "33,000 لیٹر / ایکڑ بچت",
        badgeSub: "درست آبپاشی شیڈول",
      },
    ],
  },
  mr: {
    badge: "कृषिनोव्हा बद्दल",
    headingMain: "स्मार्ट शेती सोल्यूशन्स",
    headingItalic: "जे देतात प्रत्यक्ष निकाल",
    description:
      "आमची बुद्धिमान कृषी सोल्यूशन्स संसाधनांचा योग्य वापर, पिकांचे आरोग्य सुधारून आणि प्रत्येक हंगामात शाश्वततेला पाठबळ देऊन शेतकऱ्यांना कमी खर्चात जास्त उत्पादन घेण्यास मदत करतात.",
    items: [
      {
        id: "productivity",
        title: "प्रमाणित शेती उत्पादकता",
        content:
          "आमचे डेटा-आधारित शेती सोल्यूशन्स पिकांचे उत्पादन वाढवण्यासाठी, अपव्यय टाळण्यासाठी आणि मोजता येणाऱ्या परिणामांसह शेतीची एकूण कार्यक्षमता सुधारण्यासाठी मदत करतात.",
        badgeTitle: "उत्पादनात वाढ",
        badgeValue: "+२८% हंगामी नफा",
        badgeSub: "५०,०००+ एकरवर प्रमाणित",
      },
      {
        id: "optimization",
        title: "बुद्धिमान पीक अनुकूलन",
        content:
          "हंगामी कापणीचा अचूक अंदाज बांधण्यासाठी मातीचे घटक आणि ४ वर्षांच्या हवामान डेटावर आधारित AI पीक शिफारसी.",
        badgeTitle: "AI अचूकता",
        badgeValue: "९६.८% मॉडेल अचूकता",
        badgeSub: "माती घटक व हवामान सुसंगती",
      },
      {
        id: "integration",
        title: "अखंड शेती प्रणाली एकत्रीकरण",
        content:
          "हवामान अंदाज, बाजारभाव, शासकीय योजना आणि माती सेन्सर्स यांना एकाच व्यासपीठावर जोडणारी एकात्मिक शेती बुद्धिमत्ता.",
        badgeTitle: "थेट अपडेट्स",
        badgeValue: "४२ बाजार समित्या व योजना",
        badgeSub: "रिअल-टाइम डेटा जोडणी",
      },
      {
        id: "water",
        title: "स्मार्ट जल आणि साधनसंपत्ती व्यवस्थापन",
        content:
          "बाष्पीभवन मॉडेलिंग आणि पाण्याची टाकी व्यवस्थापन जे भूजलाचे संवर्धन करत अचूक सिंचन वेळापत्रक निश्चित करते.",
        badgeTitle: "पाणी संवर्धन",
        badgeValue: "३३,००० लिटर / एकर बचत",
        badgeSub: "अचूक सिंचन वेळापत्रक",
      },
    ],
  },
}

const icons = [Sprout, Leaf, Tractor, Droplets]

const imageAssets = [
  {
    id: "productivity",
    src: "/images/premium-farm.avif",
    fallback: "/images/farmer-field.jpg",
    alt: "Lush green agricultural landscape with precision farming technology",
    statIcon: TrendingUp,
  },
  {
    id: "optimization",
    src: "/images/wheat-sunrise.jpg",
    fallback: "/images/crop-optimization.jpg",
    alt: "Golden wheat crop at sunrise showcasing precision crop optimization",
    statIcon: Sparkles,
  },
  {
    id: "integration",
    src: "/images/farm-integration.jpg",
    fallback: "/background.jpeg",
    alt: "Integrated farm machinery and digital monitoring system",
    statIcon: Gauge,
  },
  {
    id: "water",
    src: "/images/water-management.jpg",
    fallback: "/Land.jpeg",
    alt: "Water irrigation planning and rainwater harvesting infrastructure",
    statIcon: ShieldCheck,
  },
]

export default function SmartFarmingSolutions({ language, className }: SmartFarmingSolutionsProps) {
  const t = translations[language] || translations.en
  const isRtl = language === "ur"
  const [activeItem, setActiveItem] = useState<string>("productivity")
  const { ref, isRevealed } = useReveal<HTMLDivElement>({ threshold: 0.15 })

  const currentItem = t.items.find((item) => item.id === activeItem) || t.items[0]
  const currentAsset = imageAssets.find((asset) => asset.id === activeItem) || imageAssets[0]
  const ActiveStatIcon = currentAsset.statIcon

  return (
    <section
      ref={ref}
      dir={isRtl ? "rtl" : "ltr"}
      className={cn(
        "w-full py-12 md:py-20 bg-[#F5F7F3] px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-all duration-700",
        isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
    >
      <div className="max-w-7xl mx-auto bg-[#073B2A] text-white border border-[#10543C] rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl relative z-10">
        {/* Pill Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-xl text-white border border-white/30 dark:border-white/15 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#c8f53c] shrink-0 animate-pulse" />
            {t.badge}
          </span>
        </div>

        {/* Two-Column Header */}
        <div className="grid md:grid-cols-2 items-end gap-6 md:gap-12 mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-md leading-[1.08]">
              {t.headingMain}
              <br />
              <span className="font-[family-name:var(--font-serif)] italic font-normal tracking-normal text-[#c8f53c] drop-shadow-sm">
                {t.headingItalic}
              </span>
            </h2>
          </div>

          <div>
            <p className="text-base sm:text-lg text-white/85 max-w-xl md:ml-auto leading-relaxed">
              {t.description}
            </p>
          </div>
        </div>

        {/* Content Grid: Accordion Left + Image Card Right */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* LEFT: Accordion */}
          <div className="w-full">
            <Accordion
              type="single"
              collapsible
              defaultValue="productivity"
              value={activeItem}
              onValueChange={(val) => setActiveItem(val || "productivity")}
              className="w-full space-y-4"
            >
              {t.items.map((item, index) => {
                const Icon = icons[index] || Sprout
                const isOpen = activeItem === item.id

                return (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className={cn(
                      "rounded-2xl p-3 transition-all duration-300",
                      "bg-white/15 dark:bg-black/30 backdrop-blur-2xl border border-white/25 dark:border-white/10",
                      isOpen
                        ? "shadow-[0_12px_40px_-8px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.4)] border-[#c8f53c]/50 bg-white/25 dark:bg-black/45"
                        : "hover:bg-white/20 dark:hover:bg-white/8 shadow-xs"
                    )}
                  >
                    <AccordionTrigger
                      className={cn(
                        "hover:no-underline w-full py-2 px-2 flex items-center justify-between gap-4 cursor-pointer",
                        "[&>svg.size-4]:hidden [&>svg:last-child]:hidden"
                      )}
                    >
                      <div className="flex items-center gap-4 text-left">
                        {/* 48px rounded-xl icon box */}
                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-xs",
                            isOpen
                              ? "bg-[#c8f53c] text-[#0a1f13] shadow-[0_0_20px_rgba(200,245,60,0.45)] scale-105"
                              : "bg-white/20 text-white dark:bg-white/10"
                          )}
                        >
                          <Icon className="w-6 h-6 transition-transform" />
                        </div>

                        <span className="text-base sm:text-lg font-bold text-white drop-shadow-sm">
                          {item.title}
                        </span>
                      </div>

                      {/* Custom Plus/Minus toggle in glass pill */}
                      <div className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                        isOpen
                          ? "bg-[#c8f53c] text-[#0a1f13] shadow-sm font-bold"
                          : "bg-white/20 text-white"
                      )}>
                        {isOpen ? (
                          <Minus className="w-4 h-4 transition-transform" />
                        ) : (
                          <Plus className="w-4 h-4 transition-transform" />
                        )}
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pt-2 pb-1 px-1">
                      <div className="bg-black/30 dark:bg-black/50 backdrop-blur-xl rounded-xl p-5 border border-white/20 text-white/90 shadow-inner">
                        <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>

          {/* RIGHT: Large Image Card with Crossfade + Dynamic Glass Widgets */}
          <div className="w-full h-full min-h-[460px] lg:min-h-full">
            <div className="relative w-full h-full min-h-[460px] rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 border border-white/20 dark:border-white/10 group">
              {imageAssets.map((img) => {
                const isActive = (activeItem || "productivity") === img.id
                return (
                  <div
                    key={img.id}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-700 ease-in-out",
                      isActive ? "opacity-100 z-10 scale-100" : "opacity-0 pointer-events-none z-0 scale-105"
                    )}
                    style={{ transition: "opacity 0.7s ease-in-out, transform 1s ease-out" }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority={img.id === "productivity"}
                    />
                    {/* Rich multi-stop lighting gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20 pointer-events-none" />
                  </div>
                )
              })}

              {/* Dynamic Frosted Glass Stat Pill (Top Right) */}
              <div className="absolute top-5 right-5 z-20 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-xl border border-white/25 text-white shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-[#c8f53c] animate-pulse" />
                  <span className="text-xs font-semibold tracking-wide">
                    {currentItem.badgeTitle}
                  </span>
                </div>
              </div>

              {/* Dynamic Frosted Glass Bottom Card Widget */}
              <div className="absolute bottom-6 left-6 right-6 z-20 animate-fade-in-up">
                <div className="p-5 rounded-2xl bg-black/45 backdrop-blur-2xl border border-white/25 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.25)] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#c8f53c] text-[#0f3d1e] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(200,245,60,0.4)]">
                      <ActiveStatIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {currentItem.badgeValue}
                      </div>
                      <div className="text-xs text-white/70">
                        {currentItem.badgeSub}
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#c8f53c] text-xs font-semibold border border-white/15">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
