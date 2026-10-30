"use client"

import { useEffect, useState } from "react"
import { LanguageProvider, useLanguage } from "@/components/language-context"
import LanguageModal from "@/components/language-modal"
import Header from "@/components/layout/header"
import AuthPages from "@/components/auth-pages"
import MainApp from "@/components/main-app"

// Public Presentation Pages
import HomePage from "@/components/pages/home-page"
import PredictionPage from "@/components/pages/prediction-page"
import WeatherPage from "@/components/pages/weather-page"
import SatellitePage from "@/components/pages/satellite-page"
import SchemesPage from "@/components/pages/schemes-page"
import MarketPage from "@/components/pages/market-page"
import AboutPage from "@/components/pages/about-page"
import ContactPage from "@/components/pages/contact-page"

function AppContent() {
  const { language, setLanguage } = useLanguage()
  const [view, setView] = useState<"public" | "auth" | "dashboard">("public")
  const [publicPage, setPublicPage] = useState("home")
  const [user, setUser] = useState<any>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        // ignore
      }
    }
    setIsInitialized(true)
  }, [])

  const handleAuthSuccess = (userData: any) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    localStorage.setItem("isAuthenticated", "true")
    setView("dashboard")
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("isAuthenticated")
    setView("public")
    setPublicPage("home")
  }

  // Initialized ready to render immediately

  // 1. DASHBOARD VIEW (Full Botanical Digital Twin)
  if (view === "dashboard") {
    return (
      <MainApp
        user={user || { fullName: "Ganesh Kadlag", mobile: "+91 98220 12345", role: "Progressive Farmer" }}
        onLogout={handleLogout}
        onBackToHome={() => setView("public")}
      />
    )
  }

  // 2. AUTH VIEW (Login / Sign-up)
  if (view === "auth") {
    return (
      <AuthPages
        onAuthSuccess={handleAuthSuccess}
        onBackToHome={() => setView("public")}
      />
    )
  }

  // 3. PUBLIC GENERAL WEBSITE VIEW
  const renderPublicPage = () => {
    switch (publicPage) {
      case "home":
        return (
          <HomePage
            language={language}
            user={user}
            onGetStarted={() => setView("auth")}
            onWatchDemo={() => {
              const el = document.getElementById("features-section")
              if (el) el.scrollIntoView({ behavior: "smooth" })
            }}
          />
        )
      case "prediction":
        return <PredictionPage language={language} user={user} />
      case "weather":
        return <WeatherPage language={language} user={user} />
      case "satellite":
        return <SatellitePage language={language} user={user} />
      case "schemes":
        return <SchemesPage language={language} />
      case "market":
        return <MarketPage language={language} user={user} />
      case "about":
        return <AboutPage language={language} />
      case "contact":
        return <ContactPage language={language} />
      default:
        return (
          <HomePage
            language={language}
            user={user}
            onGetStarted={() => setView("auth")}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7F3] flex flex-col">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        currentPage={publicPage}
        onNavigate={setPublicPage}
        onLogin={() => setView(user ? "dashboard" : "auth")}
        user={user}
      />
      <main className="pt-20 flex-1">{renderPublicPage()}</main>
    </div>
  )
}

export default function Home() {
  return (
    <LanguageProvider>
      <LanguageModal />
      <AppContent />
    </LanguageProvider>
  )
}
