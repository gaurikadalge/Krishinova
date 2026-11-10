"use client"

import { useState } from "react"
import { useLanguage } from "./language-context"
import AppSidebarLayout from "./layout/app-sidebar-layout"
import ExecutiveDashboard from "./dashboard/executive-dashboard"
import MyFarmView from "./dashboard/my-farm-view"
import PlotRegistrationModal from "./dashboard/plot-registration-modal"
import ScenarioSimulator from "./dashboard/scenario-simulator"
import ActionPlanView from "./dashboard/action-plan-view"
import CropDemandView from "./dashboard/crop-demand-view"
import OllamaAssistant from "./dashboard/ollama-assistant"
import SatellitePage from "./pages/satellite-page"
import WeatherPage from "./pages/weather-page"
import SchemesPage from "./pages/schemes-page"
import MarketPage from "./pages/market-page"

interface MainAppProps {
  user: any
  onLogout: () => void
  onBackToHome?: () => void
}

export default function MainApp({ user, onLogout, onBackToHome }: MainAppProps) {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [isPlotModalOpen, setIsPlotModalOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  const handlePlotAdded = (newPlot: any) => {
    // 1. Persist to localStorage so it survives refresh & restart
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("krishinova_registered_plots")
        const existing = stored ? JSON.parse(stored) : []
        const formattedPlot = {
          id: newPlot.id || `plot-${Date.now()}`,
          name: newPlot.name,
          acres: Number(newPlot.area_acres),
          crop: newPlot.current_crop,
          variety: newPlot.variety,
          stage: newPlot.growth_stage,
          sowingDate: newPlot.sowing_date,
          irrigation: newPlot.irrigation_method,
          soilType: newPlot.soil?.soil_type || "Medium Deep Black (Vertisol)",
          ph: newPlot.soil?.ph || 7.2,
          organicCarbon: `${newPlot.soil?.organic_carbon_pct || 0.5}%`,
          soilMoisture: "Medium",
          aerialImg: "/crops/soybean-plot.jpg",
          ndviScore: 0.55,
          provenance: "Farmer Registered",
        }
        localStorage.setItem("krishinova_registered_plots", JSON.stringify([...existing, formattedPlot]))
      } catch (e) {
        console.warn("Failed to persist plot to localStorage", e)
      }
    }

    // 2. Sync to backend API if reachable
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
      case "crop-demand":
        return (
          <CropDemandView
            language={language}
            onNavigateToScenario={() => setCurrentPage("twin")}
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
        return <OllamaAssistant language={language} />
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
      onLogout={onLogout}
      onBackToHome={onBackToHome}
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
