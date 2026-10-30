"use client"

import { useState } from "react"
import { useLanguage } from "./language-context"
import AppSidebarLayout from "./layout/app-sidebar-layout"
import ExecutiveDashboard from "./dashboard/executive-dashboard"
import MyFarmView from "./dashboard/my-farm-view"
import PlotRegistrationModal from "./dashboard/plot-registration-modal"
import ScenarioSimulator from "./dashboard/scenario-simulator"
import ActionPlanView from "./dashboard/action-plan-view"
import OllamaAssistant from "./dashboard/ollama-assistant"
import SatellitePage from "./pages/satellite-page"
import WeatherPage from "./pages/weather-page"
import SchemesPage from "./pages/schemes-page"
import MarketPage from "./pages/market-page"

interface MainAppProps {
  user: any
  onLogout: () => void
}

export default function MainApp({ user, onLogout }: MainAppProps) {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [isPlotModalOpen, setIsPlotModalOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  const handlePlotAdded = (newPlot: any) => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"
    fetch(`${apiBase}/api/farms/farm-mh-001/plots`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlot),
    }).catch((err) => console.warn("Failed to sync plot to backend", err))
  }

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <ExecutiveDashboard
            language={language}
            onNavigate={setCurrentPage}
            onOpenPlotModal={() => setIsPlotModalOpen(true)}
          />
        )
      case "my-farm":
        return (
          <MyFarmView
            language={language}
            onOpenPlotModal={() => setIsPlotModalOpen(true)}
            onNavigateToSatellite={() => setCurrentPage("satellite")}
          />
        )
      case "satellite":
        return <SatellitePage language={language} user={user} />
      case "twin":
        return (
          <ScenarioSimulator
            language={language}
            onApplyPlan={() => setCurrentPage("recommendations")}
          />
        )
      case "recommendations":
        return (
          <ActionPlanView
            language={language}
            onBackToSim={() => setCurrentPage("twin")}
          />
        )
      case "weather":
        return <WeatherPage language={language} user={user} />
      case "news":
        return <SchemesPage language={language} />
      case "market":
        return <MarketPage language={language} user={user} />
      case "assistant":
        return <OllamaAssistant />
      default:
        return (
          <ExecutiveDashboard
            language={language}
            onNavigate={setCurrentPage}
            onOpenPlotModal={() => setIsPlotModalOpen(true)}
          />
        )
    }
  }

  return (
    <AppSidebarLayout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      language={language}
      onLanguageChange={setLanguage}
      user={user}
    >
      {renderContent()}

      {/* PLOT REGISTRATION MODAL */}
      <PlotRegistrationModal
        isOpen={isPlotModalOpen}
        onClose={() => setIsPlotModalOpen(false)}
        onPlotAdded={handlePlotAdded}
      />
    </AppSidebarLayout>
  )
}
