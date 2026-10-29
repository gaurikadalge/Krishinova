"use client"

import React from "react"
import { FileSpreadsheet, Cpu, Droplets, TrendingUp } from "lucide-react"
import { useReveal } from "@/components/ui-extras/use-reveal"

interface HowItWorksProps {
  language: "en" | "hi" | "ur" | "mr"
  className?: string
}

const translations = {
  en: {
    badge: "Simple 4-Step Process",
    headingMain: "How Precision Farming",
    headingItalic: "Works with Krishinova",
    description: "From testing your soil chemistry to harvesting top market yield, our intelligent system guides every critical decision.",
    steps: [
      { step: "01", title: "Enter Land Details", desc: "Provide basic soil N-P-K levels, pH value, and your land acreage or GPS coordinates." },
      { step: "02", title: "AI Climate Analysis", desc: "Our neural models cross-analyze 4-year localized climate, rainfall, and evapotranspiration data." },
      { step: "03", title: "Get Precision Plan", desc: "Receive top crop recommendations, intercrop pairings, and exact water tank sizing requirements." },
      { step: "04", title: "Track & Maximize", desc: "Monitor 16-day dynamic weather, nearby mandi prices, and rent specialized machinery with one click." },
    ],
  },
  hi: {
    badge: "सरल 4-चरणीय प्रक्रिया",
    headingMain: "सटीक खेती कैसे",
    headingItalic: "कृषिनोवा के साथ काम करती है",
    description: "मिट्टी की जांच से लेकर सर्वोत्तम बाजार भाव तक, हमारा बुद्धिमान सिस्टम आपके हर महत्वपूर्ण निर्णय का मार्गदर्शन करता है।",
    steps: [
      { step: "01", title: "भूमि विवरण दर्ज करें", desc: "अपनी मिट्टी के N-P-K स्तर, pH मान और जमीन का रकबा या स्थान दर्ज करें।" },
      { step: "02", title: "AI जलवायु विश्लेषण", desc: "हमारे मॉडल 4-वर्षीय स्थानीय जलवायु, वर्षा और वाष्पीकरण डेटा का गहन विश्लेषण करते हैं।" },
      { step: "03", title: "सटीक योजना प्राप्त करें", desc: "सर्वोत्तम फसल विकल्प, अंतरफसल सुझाव और सटीक सिंचाई व जल भंडारण योजना प्राप्त करें।" },
      { step: "04", title: "निगरानी और लाभ", desc: "16-दिन के मौसम पूर्वानुमान, मंडी भाव की जांच करें और उपकरण किराए पर लें।" },
    ],
  },
  ur: {
    badge: "آسان 4 مرحلہ وار عمل",
    headingMain: "کرشی نووا کے ساتھ",
    headingItalic: "درست زراعت کیسے کام کرتی ہے",
    description: "مٹی کے ٹیسٹ سے لے کر منڈی میں بہترین قیمت حاصل کرنے تک، ہمارا نظام ہر قدم پر آپ کی رہنمائی کرتا ہے۔",
    steps: [
      { step: "01", title: "زمین کی تفصیلات درج کریں", desc: "مٹی کے N-P-K اجزاء، pH ویلیو اور زمین کا رقبہ یا لوکیشن فراہم کریں۔" },
      { step: "02", title: "AI موسمیاتی تجزیہ", desc: "ہمارے ماڈلز گزشتہ 4 سالہ بارش، درجہ حرارت اور مٹی کی نمی کا تجزیہ کرتے ہیں۔" },
      { step: "03", title: "جامع زرعی منصوبہ حاصل کریں", desc: "بہترین فصل کی سفارشات، مخلوط کاشت اور پانی ذخیرہ کرنے کے درست منصوبے لیں۔" },
      { step: "04", title: "نگرانی اور زیادہ پیداوار", desc: "16 دن کے موسم، منڈی کے ریٹ اور کرائے پر زرعی آلات حاصل کرنے کے لیے ٹریک کریں۔" },
    ],
  },
  mr: {
    badge: "सुलभ ४-टप्प्यांची कार्यपद्धती",
    headingMain: "अचूक शेती तंत्रज्ञान",
    headingItalic: "कृषिनोव्हा सोबत कसे कार्य करते",
    description: "माती परीक्षणापासून ते बाजारपेठेतील सर्वोत्तम नफ्यापर्यंत, आमची प्रणाली प्रत्येक टप्प्यावर मार्गदर्शन करते.",
    steps: [
      { step: "01", title: "जमिनीचा तपशील नोंदवा", desc: "मातीमधील N-P-K प्रमाण, सामू (pH) आणि शेतीचे क्षेत्रफळ किंवा स्थान निवडा." },
      { step: "02", title: "AI हवामान विश्लेषण", desc: "स्थानिक पातळीवरील ४ वर्षांचा पर्जन्यमान व हवामान डेटा विश्लेषित केला जातो." },
      { step: "03", title: "अचूक पीक योजना मिळवा", desc: "योग्य पिकांची निवड, पूरक आंतरपिके आणि पाण्याची अचूक साठवणूक योजना मिळवा." },
      { step: "04", title: "हवामान व बाजारभाव ट्रॅक करा", desc: "१६ दिवसांचा हवामान अंदाज, थेट बाजारभाव आणि अवजारे भाड्याने मिळवा." },
    ],
  },
}

const icons = [FileSpreadsheet, Cpu, Droplets, TrendingUp]

export default function HowItWorks({ language, className = "" }: HowItWorksProps) {
  const t = translations[language] || translations.en
  const isRtl = language === "ur"
  const { ref, isRevealed } = useReveal<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section
      ref={ref}
      dir={isRtl ? "rtl" : "ltr"}
      className={`w-full py-16 md:py-24 bg-transparent relative overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/20 dark:bg-white/10 backdrop-blur-xl text-white border border-white/30 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8f53c] shrink-0" />
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-md tracking-tight font-heading leading-tight mb-4">
            {t.headingMain}{" "}
            <span className="font-[family-name:var(--font-serif)] italic font-normal text-[#c8f53c] drop-shadow-sm">
              {t.headingItalic}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/85">{t.description}</p>
        </div>

        {/* Timeline grid */}
        <div className="relative">
          {/* Dashed connector line (desktop) */}
          <div aria-hidden="true" className="hidden lg:block absolute top-[72px] left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-white/30 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {t.steps.map((item, index) => {
              const Icon = icons[index]
              return (
                <div
                  key={item.step}
                  style={{ transitionDelay: `${index * 140}ms` }}
                  className={`relative p-6 rounded-3xl overflow-hidden
                    bg-white/15 dark:bg-black/35
                    backdrop-blur-2xl border border-white/25 dark:border-white/10
                    shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_12px_40px_-8px_rgba(0,0,0,0.3)]
                    hover:border-[#c8f53c]/40 hover:-translate-y-2 hover:shadow-[0_0_30px_-5px_rgba(200,245,60,0.25),inset_0_1px_0_0_rgba(255,255,255,0.5),0_16px_50px_-8px_rgba(0,0,0,0.4)]
                    transition-all duration-500 group flex flex-col justify-between
                    ${isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  {/* Subtle glass shine on hover */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/15 via-transparent to-transparent rotate-12 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-13 h-13 rounded-2xl bg-[#c8f53c]/20 backdrop-blur-md border border-[#c8f53c]/30 group-hover:bg-[#c8f53c] group-hover:border-[#c8f53c] text-[#c8f53c] group-hover:text-[#0a1f13] flex items-center justify-center transition-all duration-300 shadow-sm">
                        <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                      </div>
                      <span className="font-heading font-extrabold text-3xl text-white/30 group-hover:text-[#c8f53c] transition-colors">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold font-heading text-white drop-shadow-sm mb-3 group-hover:text-[#c8f53c] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/85 leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/70">
                    <span className="font-medium text-white/80">Step {item.step}</span>
                    <span className="w-2 h-2 rounded-full bg-white/30 group-hover:bg-[#c8f53c] group-hover:scale-150 transition-all group-hover:shadow-[0_0_10px_rgba(200,245,60,0.6)]" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
