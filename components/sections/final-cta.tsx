"use client"

import React from "react"
import Image from "next/image"
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useReveal } from "@/components/ui-extras/use-reveal"

interface FinalCTAProps {
  language: "en" | "hi" | "ur" | "mr"
  onGetStarted?: () => void
  onExploreSchemes?: () => void
  className?: string
}

const translations = {
  en: {
    badge: "Join 50,000+ Progressive Farmers",
    headingMain: "Ready to",
    headingItalic: "Transform",
    headingEnd: "Your Farm's Future?",
    description:
      "Start optimizing your crop cycles, managing irrigation, and maximizing harvest profits today with Krishinova's AI suite.",
    primaryBtn: "Start Crop Prediction",
    secondaryBtn: "Explore Govt Schemes",
    perks: ["Zero Subscription Cost", "Instant AI Advisory", "Works in Local Languages"],
    widgetLeft: "Live Advisory Active",
    widgetLeftSub: "Real-time agro telemetry",
    widgetRight: "Crop Coverage",
    widgetRightSub: "45+ Maharashtra varieties",
  },
  hi: {
    badge: "50,000+ प्रगतिशील किसानों से जुड़ें",
    headingMain: "क्या आप अपने खेत का भविष्य",
    headingItalic: "बदलने",
    headingEnd: "के लिए तैयार हैं?",
    description:
      "कृषिनोवा के AI सूट के साथ आज ही अपने फसल चक्र को अनुकूलित करें, सिंचाई प्रबंधित करें और मुनाफा बढ़ाएं।",
    primaryBtn: "फसल भविष्यवाणी शुरू करें",
    secondaryBtn: "सरकारी योजनाएं देखें",
    perks: ["शून्य सदस्यता शुल्क", "त्वरित AI सलाह", "स्थानीय भाषाओं में उपलब्ध"],
    widgetLeft: "लाइव सलाह सक्रिय",
    widgetLeftSub: "रीयल-टाइम कृषि टेलीमेट्री",
    widgetRight: "फसल कवरेज",
    widgetRightSub: "45+ महाराष्ट्र की किस्में",
  },
  ur: {
    badge: "50,000+ ترقی پسند کسانوں میں شامل ہوں",
    headingMain: "کیا آپ اپنے فارم کا مستقبل",
    headingItalic: "بدلنے",
    headingEnd: "کے لیے تیار ہیں؟",
    description:
      "کرشی نووا کے AI نظام کے ساتھ آج ہی فصل کے شیڈول کو بہتر بنائیں، پانی کی بچت کریں اور منافع میں اضافہ کریں۔",
    primaryBtn: "فصل کی پیش گوئی شروع کریں",
    secondaryBtn: "سرکاری اسکیمیں دیکھیں",
    perks: ["کوئی فیس نہیں", "فوری AI رہنمائی", "مقامی زبانوں میں سپورٹ"],
    widgetLeft: "لائیو مشورہ فعال",
    widgetLeftSub: "حقیقی وقت کا زرعی ڈیٹا",
    widgetRight: "فصلوں کی حد",
    widgetRightSub: "45+ مہاراشٹر کی اقسام",
  },
  mr: {
    badge: "५०,०००+ प्रगतीशील शेतकऱ्यांसोबत जोडा",
    headingMain: "आपल्या शेतीचे भविष्य",
    headingItalic: "बदलण्यासाठी",
    headingEnd: "तयार आहात का?",
    description:
      "कृषिनोव्हा च्या AI तंत्रज्ञानासह आजच पीक नियोजन सुधारा, पाण्याचे अचूक व्यवस्थापन करा आणि नफा वाढवा.",
    primaryBtn: "पीक भविष्यवाणी सुरू करा",
    secondaryBtn: "शासकीय योजना पहा",
    perks: ["विनामूल्य नोंदणी", "त्वरित AI कृषी सल्ला", "स्थानिक मराठी भाषेत उपलब्ध"],
    widgetLeft: "थेट AI सल्ला सक्रिय",
    widgetLeftSub: "रिअल-टाइम कृषी टेलीमेट्री",
    widgetRight: "पीक व्याप्ती",
    widgetRightSub: "४५+ महाराष्ट्रातील वाण",
  },
}

export default function FinalCTA({
  language,
  onGetStarted,
  onExploreSchemes,
  className = "",
}: FinalCTAProps) {
  const t = translations[language] || translations.en
  const isRtl = language === "ur"
  const { ref, isRevealed } = useReveal<HTMLDivElement>({ threshold: 0.15 })

  const handleScrollToPredict = () => {
    if (onGetStarted) {
      onGetStarted()
      return
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section
      ref={ref}
      dir={isRtl ? "rtl" : "ltr"}
      className={`w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden ${className}`}
    >
      <div
        className={`max-w-6xl mx-auto rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl transition-all duration-700 ${
          isRevealed ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Background Image: premium-farm.avif with multi-stop dark gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/premium-farm.avif"
            alt="Krishinova agricultural landscape"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f13]/92 via-[#0f3d1e]/88 to-[#06150c]/95 backdrop-blur-[3px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_rgba(200,245,60,0.22)_0%,_transparent_55%)]" />
        </div>

        {/* Ambient Glowing Orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#c8f53c]/20 blur-3xl pointer-events-none z-0" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary/30 blur-3xl pointer-events-none z-0" />

        {/* Floating Dynamic Glass Widget (Desktop Left) */}
        <div className="hidden lg:flex items-center gap-3 absolute top-12 left-10 z-10 px-4 py-2.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 text-white shadow-xl animate-float">
          <div className="w-9 h-9 rounded-xl bg-[#c8f53c] text-[#0f3d1e] flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">{t.widgetLeft}</div>
            <div className="text-[10px] text-white/70">{t.widgetLeftSub}</div>
          </div>
        </div>

        {/* Floating Dynamic Glass Widget (Desktop Right) */}
        <div className="hidden lg:flex items-center gap-3 absolute top-12 right-10 z-10 px-4 py-2.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 text-white shadow-xl animate-float animation-delay-2000">
          <div className="w-9 h-9 rounded-xl bg-white/15 text-[#c8f53c] flex items-center justify-center shrink-0 border border-white/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">{t.widgetRight}</div>
            <div className="text-[10px] text-white/70">{t.widgetRightSub}</div>
          </div>
        </div>

        {/* Center Content in Frosted Glass Container */}
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/12 backdrop-blur-xl border border-white/25 text-white text-xs font-semibold mb-6 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#c8f53c]" />
            <span>{t.badge}</span>
          </div>

          {/* Heading with Italic Serif */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight mb-6 drop-shadow-lg">
            {t.headingMain}{" "}
            <span className="font-[family-name:var(--font-serif)] italic font-normal text-[#c8f53c] underline decoration-[#c8f53c]/30 underline-offset-8">
              {t.headingItalic}
            </span>{" "}
            {t.headingEnd}
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed mb-10">
            {t.description}
          </p>

          {/* CTA Buttons with Glass Glow */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              onClick={handleScrollToPredict}
              className="w-full sm:w-auto h-14 px-9 text-base font-bold rounded-full bg-[#c8f53c] hover:bg-[#b8e830] text-[#0a1f13] shadow-[0_8px_30px_rgba(200,245,60,0.35)] hover:shadow-[0_12px_40px_rgba(200,245,60,0.5)] transition-all duration-300 transform hover:-translate-y-1 gap-2"
            >
              <span>{t.primaryBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              onClick={onExploreSchemes || handleScrollToPredict}
              className="w-full sm:w-auto h-14 px-9 text-base font-semibold rounded-full border-2 border-white/40 text-white hover:bg-white/20 bg-white/10 backdrop-blur-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              {t.secondaryBtn}
            </Button>
          </div>

          {/* Perks Bar */}
          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-white/85">
            {t.perks.map((perk, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c8f53c] shrink-0" />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
