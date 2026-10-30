"use client"

import { useState, useEffect } from "react"
import {
  Sprout,
  Activity,
  Layers,
  Leaf,
  ShieldCheck,
  TrendingUp,
  CloudSun,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  PlusCircle,
  Eye,
  Calendar,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import dynamic from "next/dynamic"
import type { Language } from "../language-context"
import { dictionary } from "../translations"
import { AGRICULTURAL_REGIONS, AgroRegion } from "../regions-data"
import { Sun, CloudRain, CloudLightning } from "lucide-react"

const FarmSatelliteMap = dynamic(() => import("../satellite-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] rounded-2xl bg-[#F0F5F0] flex items-center justify-center text-xs text-[#68766C]">
      Loading High-Res Satellite Stream...
    </div>
  ),
})

interface ExecutiveDashboardProps {
  language: Language
  onNavigate: (page: string) => void
  onOpenPlotModal: () => void
}

export default function ExecutiveDashboard({
  language,
  onNavigate,
  onOpenPlotModal,
}: ExecutiveDashboardProps) {
  const [activeLayer, setActiveLayer] = useState<"ndvi" | "true" | "false">("ndvi")
  const [selectedRegion, setSelectedRegion] = useState<AgroRegion>(AGRICULTURAL_REGIONS[0])
  const d = dictionary[language] || dictionary.en

  // Live Weather State
  const [liveWeather, setLiveWeather] = useState<{
    temperature: number
    humidity: number
    wind_speed_kmh: number
    rainfall_today_mm: number
    condition: string
    icon: string
    daily: Array<{
      date: string
      day: string
      temp_max: number
      temp_min: number
      rain_mm: number
      condition: string
      icon: string
    }>
  } | null>(null)

  // Live News & Advisories State
  const [liveNews, setLiveNews] = useState<Array<{
    id: string
    title: string
    source: string
    date: string
    category: string
    summary: string
    url?: string
  }>>([])

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"
    
    // Fetch Live Weather
    fetch(`${apiBase}/api/weather/live`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.current) {
          setLiveWeather({
            temperature: Math.round(data.current.temperature * 10) / 10,
            humidity: data.current.humidity,
            wind_speed_kmh: data.current.wind_speed_kmh,
            rainfall_today_mm: data.current.rainfall_today_mm,
            condition: data.current.condition,
            icon: data.current.icon || "⛅",
            daily: data.daily || [],
          })
        }
      })
      .catch((err) => console.warn("Live weather fetch fallback:", err))

    // Fetch Live Advisories
    fetch(`${apiBase}/api/news/advisories`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLiveNews(data)
        }
      })
      .catch((err) => console.warn("Live news fetch fallback:", err))
  }, [])

  const ndviTrendData = [
    { date: "1 Apr", ndvi: 0.28 },
    { date: "15 Apr", ndvi: 0.35 },
    { date: "1 May", ndvi: 0.42 },
    { date: "15 May", ndvi: 0.52 },
    { date: "1 Jun", ndvi: 0.62 },
    { date: "15 Jun", ndvi: 0.65 },
    { date: "27 Jun", ndvi: 0.68 },
  ]

  const fallbackWeeklyForecast = [
    { day: "Today", temp: "31°/22°", icon: "⛅", rain: "0 mm" },
    { day: "Sat", temp: "31°/22°", icon: "🌦️", rain: "1.2 mm" },
    { day: "Sun", temp: "31°/22°", icon: "⛈️", rain: "4.0 mm" },
    { day: "Mon", temp: "28°/21°", icon: "🌧️", rain: "19 mm" },
    { day: "Tue", temp: "29°/21°", icon: "🌦️", rain: "4.5 mm" },
    { day: "Wed", temp: "29°/21°", icon: "⛅", rain: "1.2 mm" },
    { day: "Thu", temp: "29°/21°", icon: "☀️", rain: "0 mm" },
  ]

  return (
    <div className="space-y-6">
      {/* GREETING BANNER & QUICK STATS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#25352C] tracking-tight font-heading">
            {d.goodMorning}
          </h2>
          <p className="text-xs sm:text-sm text-[#68766C] mt-0.5">
            {d.dashboardSubtitle}
          </p>
        </div>

        <button
          onClick={onOpenPlotModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#087A4B] hover:bg-[#06633D] text-white font-bold text-xs tracking-wide transition-all shadow-md shadow-[#087A4B]/20 shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-white" />
          <span>{d.addDetectPlot}</span>
        </button>
      </div>

      {/* TOP 5 METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-[#E5EBE5] flex items-center gap-3.5 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-[#DDF3E6] text-[#087A4B] flex items-center justify-center shrink-0">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-[#68766C] block font-semibold">{d.currentCrop}</span>
            <span className="text-sm font-bold text-[#25352C] block truncate max-w-[110px]">{selectedRegion.crop.split("/")[0]}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5EBE5] flex items-center gap-3.5 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-[#DDF3E6] text-[#087A4B] flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-[#68766C] block font-semibold">{d.growthStage}</span>
            <span className="text-sm font-bold text-[#25352C] block">{d.vegetativeStage}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5EBE5] flex items-center gap-3.5 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-[#EBF3FC] text-[#2878D0] flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-[#68766C] block font-semibold">{d.totalArea}</span>
            <span className="text-sm font-bold text-[#25352C] block">{selectedRegion.area}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5EBE5] flex items-center gap-3.5 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-[#DDF3E6] text-[#16A36A] flex items-center justify-center shrink-0">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-[#68766C] block font-semibold">{d.ndviVigor}</span>
            <span className="text-sm font-bold text-[#16A36A] block">{selectedRegion.ndviScore >= 0.7 ? "High" : "Good"} ({selectedRegion.ndviScore})</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5EBE5] flex items-center gap-3.5 shadow-sm hover:shadow-md transition-shadow col-span-2 md:col-span-1">
          <div className="w-10 h-10 rounded-xl bg-[#DDF3E6] text-[#087A4B] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-[#68766C] block font-semibold">{d.currentRisk}</span>
            <span className="text-sm font-bold text-[#25352C] block">{d.noAlerts}</span>
          </div>
        </div>
      </div>

      {/* SATELLITE MAP & FIELD INSIGHTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: SATELLITE PLOT VIEWER (7 COLS) */}
        <div className="lg:col-span-7 rounded-3xl bg-white border border-[#E5EBE5] p-5 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-[#25352C]">{d.plot1Title}</h3>
              <p className="text-xs text-[#68766C]">
                {d.pilotLocation}, {d.pilotDistrict} &bull;{" "}
                <span className="text-[#087A4B] font-mono font-bold">18.1512° N, 74.5824° E</span>
              </p>
            </div>

            {/* Layer Toggles */}
            <div className="flex items-center gap-1 bg-[#F5F7F3] p-1 rounded-xl text-xs font-semibold border border-[#E5EBE5]">
              <button
                onClick={() => setActiveLayer("ndvi")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeLayer === "ndvi"
                    ? "bg-[#087A4B] text-white font-bold shadow-sm"
                    : "text-[#68766C] hover:text-[#25352C]"
                }`}
              >
                {d.ndviVigorMap}
              </button>
              <button
                onClick={() => setActiveLayer("true")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeLayer === "true"
                    ? "bg-[#087A4B] text-white font-bold shadow-sm"
                    : "text-[#68766C] hover:text-[#25352C]"
                }`}
              >
                {d.naturalColor}
              </button>
              <button
                onClick={() => setActiveLayer("false")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeLayer === "false"
                    ? "bg-[#087A4B] text-white font-bold shadow-sm"
                    : "text-[#68766C] hover:text-[#25352C]"
                }`}
              >
                {d.colorInfrared}
              </button>
            </div>
          </div>

          {/* Interactive Satellite Canvas */}
          <div className="h-[360px] w-full rounded-2xl overflow-hidden relative border border-[#E5EBE5] shadow-inner">
            <FarmSatelliteMap
              latitude={selectedRegion.latitude}
              longitude={selectedRegion.longitude}
              locationName={selectedRegion.name}
              plotName={selectedRegion.plotName}
              crop={selectedRegion.crop}
              mode={activeLayer}
              ndviScore={selectedRegion.ndviScore}
            />
          </div>
        </div>

        {/* RIGHT: FIELD INSIGHTS & NDVI TREND (5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-white border border-[#E5EBE5] p-5 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-[#25352C] flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#087A4B]" />
                {d.fieldInsights}
              </h3>
              <button
                onClick={() => onNavigate("satellite")}
                className="text-xs text-[#087A4B] font-semibold hover:underline flex items-center gap-1"
              >
                {d.viewDetails} &rarr;
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              <div className="p-3 bg-[#F5F7F3] rounded-2xl border border-[#E5EBE5] text-center">
                <span className="text-xl font-extrabold text-[#16A36A] block">{selectedRegion.ndviScore}</span>
                <span className="text-[10px] text-[#087A4B] block font-semibold">↑ +0.12</span>
                <span className="text-[10px] text-[#68766C] mt-1 block">{d.ndviVigor}</span>
              </div>

              <div className="p-3 bg-[#F5F7F3] rounded-2xl border border-[#E5EBE5] text-center">
                <span className="text-xl font-extrabold text-[#2878D0] block">{selectedRegion.ndmiScore}</span>
                <span className="text-[10px] text-[#2878D0] block font-semibold">↑ +0.08</span>
                <span className="text-[10px] text-[#68766C] mt-1 block">{d.ndmiIndex}</span>
              </div>

              <div className="p-3 bg-[#F5F7F3] rounded-2xl border border-[#E5EBE5] text-center">
                <span className="text-xs font-bold text-[#E6A23C] block mt-1">{d.mediumHealth}</span>
                <span className="text-[10px] text-[#68766C] mt-2 block">{d.cropHealth}</span>
              </div>

              <div className="p-3 bg-[#F5F7F3] rounded-2xl border border-[#E5EBE5] text-center">
                <span className="text-xs font-bold text-[#16A36A] block mt-1">{d.normalMoisture}</span>
                <span className="text-[10px] text-[#68766C] mt-2 block">{d.soilMoisture}</span>
              </div>
            </div>

            {/* NDVI 3-Month Trend Chart */}
            <div className="pt-2">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-semibold text-[#25352C]">{d.ndviTrendTitle}</span>
                <span className="text-[#087A4B] font-mono text-[11px] font-bold">Sentinel-2 L2A</span>
              </div>
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ndviTrendData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} stroke="#E5EBE5" />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#68766C" }} />
                    <YAxis domain={[0, 1]} tick={{ fontSize: 10, fill: "#68766C" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E5EBE5",
                        borderRadius: "12px",
                        fontSize: "11px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="ndvi"
                      stroke="#087A4B"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: "#087A4B" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM 3-COLUMN STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. CURRENT WEATHER */}
        <div className="rounded-3xl bg-white border border-[#E5EBE5] p-5 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-sm text-[#25352C] flex items-center gap-2">
              <CloudSun className="w-4 h-4 text-[#2878D0]" />
              {d.currentWeather}
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1" title="Live Open-Meteo" />
            </h4>
            <button
              onClick={() => onNavigate("weather")}
              className="text-xs text-[#2878D0] font-semibold hover:underline"
            >
              {d.viewForecast} &rarr;
            </button>
          </div>

          <div className="flex items-center gap-4 py-2">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3FC] flex items-center justify-center text-[#2878D0]"><CloudSun className="w-7 h-7" /></div>
            <div>
              <span className="text-3xl font-extrabold text-[#25352C]">
                {liveWeather ? `${liveWeather.temperature}°C` : "30.9°C"}
              </span>
              <p className="text-xs text-[#68766C]">
                {liveWeather?.condition || d.partlyCloudy} &bull; Baramati, Maharashtra
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E5EBE5] text-xs">
            <div>
              <span className="text-[#68766C] block text-[11px]">{d.humidity}</span>
              <span className="font-bold text-[#25352C]">
                {liveWeather ? `${liveWeather.humidity}%` : "45%"}
              </span>
            </div>
            <div>
              <span className="text-[#68766C] block text-[11px]">{d.windSpeed}</span>
              <span className="font-bold text-[#25352C]">
                {liveWeather ? `${liveWeather.wind_speed_kmh} km/h` : "5.5 km/h"}
              </span>
            </div>
            <div>
              <span className="text-[#68766C] block text-[11px]">{d.rainfallToday}</span>
              <span className="font-bold text-[#2878D0]">
                {liveWeather ? `${liveWeather.rainfall_today_mm} mm` : "0.0 mm"}
              </span>
            </div>
          </div>
        </div>

        {/* 2. 7-DAY FORECAST STRIP */}
        <div className="rounded-3xl bg-white border border-[#E5EBE5] p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-sm text-[#25352C]">{d.sevenDayForecast}</h4>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
              ● Live Open-Meteo
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1 pt-2 text-center text-xs">
            {(liveWeather?.daily && liveWeather.daily.length > 0
              ? liveWeather.daily.map((item) => ({
                  day: item.day,
                  temp: `${Math.round(item.temp_max)}°/${Math.round(item.temp_min)}°`,
                  icon: item.icon || "⛅",
                  rain: `${item.rain_mm}mm`,
                }))
              : fallbackWeeklyForecast
            ).map((f, i) => (
              <div key={i} className="p-1.5 bg-[#F5F7F3] rounded-xl flex flex-col items-center gap-1 border border-[#E5EBE5]">
                <span className="text-[10px] text-[#68766C] font-semibold">{f.day}</span>
                <span className="my-0.5">
                  {f.rain.startsWith("0") ? (
                    <Sun className="w-4 h-4 text-amber-500" />
                  ) : f.rain.startsWith("1") ? (
                    <CloudSun className="w-4 h-4 text-[#2878D0]" />
                  ) : (
                    <CloudRain className="w-4 h-4 text-[#2878D0]" />
                  )}
                </span>
                <span className="text-[10px] font-bold text-[#25352C]">{f.temp.split("/")[0]}</span>
                <span className="text-[9px] text-[#2878D0] font-semibold">{f.rain}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. LATEST ADVISORIES & ALERTS */}
        <div className="rounded-3xl bg-white border border-[#E5EBE5] p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-sm text-[#25352C] flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-[#D94B45]" />
              {d.latestNewsAlerts}
            </h4>
            <button
              onClick={() => onNavigate("news")}
              className="text-xs text-[#087A4B] font-semibold hover:underline"
            >
              {d.viewAll} &rarr;
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {liveNews.length > 0 ? (
              liveNews.slice(0, 2).map((item) => (
                <div key={item.id} className="p-2.5 rounded-xl bg-[#F5F7F3] border border-[#E5EBE5] flex items-start justify-between gap-2">
                  <div className="overflow-hidden">
                    <p className="font-bold text-[#25352C] truncate">{item.title}</p>
                    <p className="text-[11px] text-[#68766C] mt-0.5 line-clamp-1">{item.summary}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 border ${
                    item.category.includes("Climate")
                      ? "bg-[#FFF1F0] text-[#D94B45] border-[#D94B45]/20"
                      : "bg-[#DDF3E6] text-[#087A4B] border-[#087A4B]/20"
                  }`}>
                    {item.category.split(" ")[0]}
                  </span>
                </div>
              ))
            ) : (
              <>
                <div className="p-2.5 rounded-xl bg-[#F5F7F3] border border-[#E5EBE5] flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-[#25352C]">{d.drySpellAlertTitle}</p>
                    <p className="text-[11px] text-[#68766C] mt-0.5">{d.drySpellAlertDesc}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFF1F0] text-[#D94B45] font-bold shrink-0 border border-[#D94B45]/20">
                    {d.climateAlertTag}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#F5F7F3] border border-[#E5EBE5] flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-[#25352C]">{d.marketAlertTitle}</p>
                    <p className="text-[11px] text-[#68766C] mt-0.5">{d.marketAlertDesc}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#DDF3E6] text-[#087A4B] font-bold shrink-0 border border-[#087A4B]/20">
                    {d.marketTag}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
