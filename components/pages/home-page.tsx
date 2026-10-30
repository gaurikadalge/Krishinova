"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Droplets, Leaf, Wind, Zap } from "lucide-react"
import FarmBot from "@/components/chatbot/farm-bot"
import MissionStatement from "@/components/sections/mission-statement"
import SmartFarmingSolutions from "@/components/sections/smart-farming-solutions"
import { TrustMarquee, StatsStrip, HomeClosingSections } from "@/components/sections"

interface HomePageProps {
  language: "en" | "hi" | "ur" | "mr"
  user?: any
  onGetStarted?: () => void
  onWatchDemo?: () => void
}

const translations = {
  en: {
    welcome: "Welcome to Krishinova",
    subtitle: "AI-Powered Decision Support System for Precision Agriculture",
    description:
      "Optimize your farming with intelligent crop predictions, water management, and sustainable practices.",
    watchDemo: "Watch Demo",
    getStarted: "Get Started",
    features: "Key Features",
    cropPrediction: "Crop Prediction",
    cropDesc: "AI-powered crop recommendations based on soil and climate data",
    waterManagement: "Water Management",
    waterDesc: "Intelligent irrigation planning and rainwater harvesting design",
    weatherForecast: "Weather Forecast",
    weatherDesc: "16-day weather predictions for your location",
    sustainableFarming: "Sustainable Farming",
    sustainableDesc: "Agroforestry and mixed cropping recommendations",
  },
  hi: {
    welcome: "कृषिनोवा में आपका स्वागत है",
    subtitle: "सटीक कृषि के लिए AI-संचालित निर्णय समर्थन प्रणाली",
    description: "बुद्धिमान फसल भविष्यवाणी, जल प्रबंधन और टिकाऊ प्रथाओं के साथ अपनी खेती को अनुकूलित करें।",
    watchDemo: "डेमो देखें",
    getStarted: "शुरुआत करें",
    features: "मुख्य विशेषताएं",
    cropPrediction: "फसल भविष्यवाणी",
    cropDesc: "मिट्टी और जलवायु डेटा के आधार पर AI-संचालित फसल सिफारिशें",
    waterManagement: "जल प्रबंधन",
    waterDesc: "बुद्धिमान सिंचाई योजना और वर्षा जल संचयन डिजाइन",
    weatherForecast: "मौसम पूर्वानुमान",
    weatherDesc: "आपके स्थान के लिए 16-दिन का मौसम पूर्वानुमान",
    sustainableFarming: "टिकाऊ खेती",
    sustainableDesc: "वनस्पति वृक्षारोपण और मिश्रित फसल सिफारिशें",
  },
  ur: {
    welcome: "کرشی نووا میں خوش آمدید",
    subtitle: "درست زراعت کے لیے AI سے چلنے والا فیصلہ سپورٹ سسٹم",
    description: "ذہین فصل کی پیش گوئی، پانی کی تدبیر اور پائیدار طریقوں کے ساتھ اپنی کھیتی کو بہتر بنائیں۔",
    watchDemo: "ڈیمو دیکھیں",
    getStarted: "شروع کریں",
    features: "اہم خصوصیات",
    cropPrediction: "فصل کی پیش گوئی",
    cropDesc: "مٹی اور آب و ہوا کے ڈیٹا کی بنیاد پر AI سے چلنے والی فصل کی سفارشات",
    waterManagement: "پانی کی تدبیر",
    waterDesc: "ذہین آبپاشی کی منصوبہ بندی اور بارش کے پانی کو جمع کرنے کا ڈیزائن",
    weatherForecast: "موسم کی پیش گوئی",
    weatherDesc: "آپ کے مقام کے لیے 16 دن کی موسم کی پیش گوئی",
    sustainableFarming: "پائیدار زراعت",
    sustainableDesc: "جنگلات کی کاشت اور ملی جلی فصل کی سفارشات",
  },
  mr: {
    welcome: "Krishinova मध्ये स्वागतम्",
    subtitle: "अचूक कृषीसाठी AI-संचालित निर्णय समर्थन प्रणाली",
    description: "बुद्धिमान पीक भविष्यवाणी, जल व्यवस्थापन आणि टिकाऊ पद्धतींसह आपल्या शेतीचे अनुकूलन करा।",
    watchDemo: "डेमो पहा",
    getStarted: "सुरुवात करा",
    features: "मुख्य वैशिष्ट्ये",
    cropPrediction: "पीक भविष्यवाणी",
    cropDesc: "मातीचे आणि हवामान डेटा आधारित AI-संचालित पीक शिफारसी",
    waterManagement: "जल व्यवस्थापन",
    waterDesc: "बुद्धिमान सिंचन नियोजन आणि वर्षाजल संचयन डिजाइन",
    weatherForecast: "हवामान पूर्वानुमान",
    weatherDesc: "आपल्या स्थानासाठी 16-दिवसीय हवामान भविष्यवाणी",
    sustainableFarming: "टिकाऊ शेती",
    sustainableDesc: "वनस्पती वृक्षारोपण आणि मिश्र पीक शिफारसी",
  },
}

export default function HomePage({ language, user, onGetStarted, onWatchDemo }: HomePageProps) {
  const t = translations[language] || translations.en
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false])
  const [bgOpacity, setBgOpacity] = useState<number>(1)

  useEffect(() => {
    const handleScroll = () => {
      // Animate feature cards
      const cards = document.querySelectorAll(".feature-card")
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.85) {
          setVisibleCards((prev) => {
            const newState = [...prev]
            newState[index] = true
            return newState
          })
        }
      })

      // Gradually increase features background opacity
      const featuresSection = document.getElementById("features-section")
      if (featuresSection) {
        const rect = featuresSection.getBoundingClientRect()
        const windowHeight = window.innerHeight
        let opacity = 1 - rect.top / windowHeight
        if (opacity < 0) opacity = 0
        if (opacity > 1) opacity = 1
        setBgOpacity(opacity)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    { icon: Leaf, title: t.cropPrediction, description: t.cropDesc },
    { icon: Droplets, title: t.waterManagement, description: t.waterDesc },
    { icon: Wind, title: t.weatherForecast, description: t.weatherDesc },
    { icon: Zap, title: t.sustainableFarming, description: t.sustainableDesc },
  ]

  return (
    <div className="min-h-screen scroll-smooth">
      {/* HERO SECTION */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center bg-[url('/Land.jpeg')]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 backdrop-blur-[2px]"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10">
          <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-lg animate-fade-in-up">
            {t.welcome}
          </h1>
          <p className="text-xl md:text-3xl font-semibold mb-6 text-secondary drop-shadow-md animate-fade-in-up animate-delay-100">
            {t.subtitle}
          </p>
          <p className="text-lg md:text-xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-sm animate-fade-in-up animate-delay-200">
            {t.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-in-up animate-delay-300">
            <Button
              onClick={onGetStarted}
              className="w-full sm:w-auto bg-[#087A4B] hover:bg-[#06633D] text-white px-10 h-14 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-full cursor-pointer"
            >
              {t.getStarted} &rarr;
            </Button>
            <Button
              onClick={() => {
                if (onWatchDemo) {
                  onWatchDemo()
                } else {
                  const el = document.getElementById("features-section")
                  if (el) el.scrollIntoView({ behavior: "smooth" })
                }
              }}
              variant="outline"
              className="w-full sm:w-auto px-10 h-14 text-lg font-semibold border-2 border-white/80 text-white hover:bg-white hover:text-[#073B2A] bg-transparent shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-full backdrop-blur-sm cursor-pointer"
            >
              {t.watchDemo}
            </Button>
          </div>
        </div>
      </section>

      <TrustMarquee language={language} />
      <StatsStrip language={language} />

      {/* SECTION 1: MISSION STATEMENT */}
      <MissionStatement language={language} />

      {/* SECTION 2: SMART FARMING SOLUTIONS */}
      <SmartFarmingSolutions language={language} />

      {/* FEATURES SECTION — HIGH-CONTRAST BOTANICAL INTELLIGENCE */}
      <section
        id="features-section"
        className="w-full py-20 md:py-28 bg-[#F5F7F3] border-b border-[#E5EBE5]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#DDF3E6] text-[#073B2A] border border-[#16A36A]/20 mb-3 shadow-sm">
              <Leaf className="w-3.5 h-3.5 text-[#087A4B]" />
              Core Agricultural Capabilities
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#25352C] tracking-tight mb-4">
              {t.features}
            </h2>
            <div className="w-20 h-1.5 bg-[#087A4B] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="h-full p-8 rounded-3xl bg-white border border-[#E5EBE5] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#DDF3E6] text-[#087A4B] flex items-center justify-center mb-6 group-hover:bg-[#087A4B] group-hover:text-white transition-all shadow-sm">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#25352C] mb-3 group-hover:text-[#087A4B] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#68766C] leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ADDITIVE SECTIONS: HOW IT WORKS & FINAL CTA */}
      <HomeClosingSections language={language} />
      <section className="py-16 bg-gradient-to-b from-background to-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground text-lg font-medium">
            Trusted by farmers across Maharashtra for precision agriculture
          </p>
        </div>
      </section>

      {/* Floating Chatbot */}
      <FarmBot />
    </div>
  )
}
