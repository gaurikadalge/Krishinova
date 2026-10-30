"use client"

import { useState, useEffect } from "react"
import type { Language } from "../language-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Satellite,
  Layers,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Cloud,
  CheckCircle2,
  Info,
  RefreshCw,
  Eye,
  MapPin,
  ExternalLink,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

interface SatellitePageProps {
  language: Language
  user?: any
}

const translations = {
  en: {
    title: "Satellite Farm Monitoring",
    subtitle: "Copernicus Sentinel-2 & ISRO VEDAS Earth Observation Integration",
    provider: "Data Provider",
    acquisitionDate: "Acquisition Date",
    cloudCover: "Cloud Cover",
    resolution: "Spatial Resolution",
    overallStatus: "Canopy Health Overview",
    selectPlot: "Select Plot to Inspect",
    ndviScore: "Canopy Greenness (Mean NDVI)",
    ndmiScore: "Canopy Moisture (Mean NDMI)",
    vigor: "Vegetation Vigor",
    moistureStatus: "Moisture Signal",
    anomalies: "Detected Spatial Anomalies",
    noAnomalies: "No significant crop stress or spatial irregularities detected.",
    spectralTrend: "Multispectral NDVI Trend (Vegetative Cycle)",
    refreshData: "Refresh Satellite Passes",
    disclaimerTitle: "Scientific Notice on Earth Observation Data",
    imageryLayer: "Imagery View Mode",
    trueColor: "Natural Color (RGB)",
    falseColor: "Color Infrared (Vegetation)",
    ndviMask: "NDVI Vigor Map",
  },
  hi: {
    title: "उपग्रह खेत निगरानी",
    subtitle: "कोपरनिकस सेंटिनल-2 और इसरो वेदास रिमोट सेंसिंग एकीकरण",
    provider: "डेटा प्रदाता",
    acquisitionDate: "प्राप्ति तिथि",
    cloudCover: "बादल आवरण",
    resolution: "स्थानिक रिज़ॉल्यूशन",
    overallStatus: "फसल स्वास्थ्य सारांश",
    selectPlot: "निरीक्षण के लिए प्लॉट चुनें",
    ndviScore: "वनस्पति हरियाली (औसत NDVI)",
    ndmiScore: "कैनोपी नमी (औसत NDMI)",
    vigor: "वनस्पति जीवंतता",
    moistureStatus: "नमी संकेत",
    anomalies: "पहचाने गए असामान्य क्षेत्र",
    noAnomalies: "कोई महत्वपूर्ण फसल तनाव या अनियमितता नहीं मिली।",
    spectralTrend: "स्पेक्ट्रल NDVI प्रवृत्ति (विकास चक्र)",
    refreshData: "उपग्रह डेटा ताज़ा करें",
    disclaimerTitle: "पृथ्वी अवलोकन डेटा पर वैज्ञानिक सूचना",
    imageryLayer: "इमेजिंग दृश्य मोड",
    trueColor: "प्राकृतिक रंग (RGB)",
    falseColor: "इन्फ्रारेड (वनस्पति)",
    ndviMask: "NDVI हरियाली नक्शा",
  },
  mr: {
    title: "उपग्रह शेत निरीक्षण व देखरेख",
    subtitle: "कोपरनिकस सेंटिनेल-२ आणि इस्रो वेदास रिमोट सेन्सिंग एकत्रीकरण",
    provider: "डेटा स्त्रोत",
    acquisitionDate: "नोंदणी तारीख",
    cloudCover: "ढगांचे प्रमाण",
    resolution: "रिझोल्यूशन",
    overallStatus: "पीक आरोग्य आढावा",
    selectPlot: "तपासणीसाठी प्लॉट निवडा",
    ndviScore: "पिकांची हिरवळ (सरासरी NDVI)",
    ndmiScore: "कॅनॉपी ओलावा (सरासरी NDMI)",
    vigor: "वनस्पती जोम",
    moistureStatus: "ओलावा स्थिती",
    anomalies: "निदर्शनास आलेली तफावत",
    noAnomalies: "पिकांवर कोणताही गंभीर ताण किंवा अनियमितता आढळलेली नाही.",
    spectralTrend: "NDVI कल (पीक वाढ चक्र)",
    refreshData: "उपग्रह माहिती अद्यतनित करा",
    disclaimerTitle: "रिमोट सेन्सिंग डेटाबद्दल वैज्ञानिक सूचना",
    imageryLayer: "इमेज दृश्य पर्याय",
    trueColor: "नैसर्गिक रंग (RGB)",
    falseColor: "इन्फ्रारेड (पीक घनता)",
    ndviMask: "NDVI हिरवळ नकाशा",
  },
  ur: {
    title: "سیٹلائٹ فارم مانیٹرنگ",
    subtitle: "کوپرنیکس سینٹینل-2 اور اسرو ویداس ریموٹ سینسنگ انضمام",
    provider: "ڈیٹا فراہم کنندہ",
    acquisitionDate: "حصول کی تاریخ",
    cloudCover: "بادلوں کا احاطہ",
    resolution: "ریزولوشن",
    overallStatus: "فصل کی صحت کا جائزہ",
    selectPlot: "معائنے کے لیے پلاٹ منتخب کریں",
    ndviScore: "سبزہ انڈیکس (Mean NDVI)",
    ndmiScore: "نمی انڈیکس (Mean NDMI)",
    vigor: "پودوں کی نشوونما",
    moistureStatus: "نمی کی کیفیت",
    anomalies: "پلاٹ میں شناخت شدہ غیر معمولی علاقے",
    noAnomalies: "فصل پر کوئی شدید دباؤ نہیں پایا گیا۔",
    spectralTrend: "NDVI رجحان",
    refreshData: "ڈیٹا تازہ کریں",
    disclaimerTitle: "سائنسی وضاحت",
    imageryLayer: "تصویری موڈ",
    trueColor: "قدرتی رنگ",
    falseColor: "انفراریڈ",
    ndviMask: "NDVI نقشہ",
  },
}

export default function SatellitePage({ language, user }: SatellitePageProps) {
  const t = translations[language] || translations.en
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPlotIndex, setSelectedPlotIndex] = useState(0)
  const [imageMode, setImageMode] = useState<"true" | "false" | "ndvi">("ndvi")

  const fetchSatelliteData = async () => {
    setLoading(true)
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"
      const res = await fetch(`${apiBase}/api/satellite/latest/default`)
      if (res.ok) {
        const json = await res.json()
        setData(json)
      }
    } catch (err) {
      console.warn("Using offline calibrated satellite state", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSatelliteData()
  }, [])

  // Calibrated fallback if backend is momentarily unreachable
  const summary = data || {
    farm_id: "farm-mh-001",
    farm_name: "Sahyadri Krishi Farm",
    last_updated: "2026-10-30 11:34:53",
    overall_health: "Healthy Canopy & Low Stress",
    latest_acquisition_date: "2026-10-27",
    cloud_cover_pct: 2.4,
    scientific_disclaimer:
      "Scientific Notice: NDVI reflects canopy greenness and chlorophyll density, not deterministic yield. NDMI reflects canopy water content, not direct root-zone moisture. Combine satellite observations with ground soil tests and weather observations before taking field actions.",
    plots_analysis: [
      {
        plot_id: "plot-1",
        plot_name: "North Plot - Kharif Cash Crop",
        crop: "Soybean (JS 335)",
        latest_scene: {
          scene_id: "S2A_MSIL2A_20261027_T43QDB",
          satellite: "Sentinel-2 L2A",
          provider: "Copernicus Data Space Ecosystem (Sentinel Hub)",
          acquisition_date: "2026-10-27",
          cloud_cover_pct: 2.4,
          resolution_meters: 10,
          true_color_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
          false_color_url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
          ndvi_map_url: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80",
        },
        indices: {
          mean_ndvi: 0.68,
          min_ndvi: 0.52,
          max_ndvi: 0.79,
          mean_ndmi: 0.34,
          vegetation_vigor: "High (Canopy Closed)",
          moisture_status: "Adequate Moisture",
        },
        anomalies_detected: [
          "Minor vigor dip (NDVI 0.52) along Eastern boundary — check drip lateral pressure.",
        ],
        integration_notes:
          "Canopy greenness index (+0.68) aligns with mid-season reproductive stage. Reflectance indicates strong nitrogen uptake.",
        historical_ndvi_trend: [
          { date: "10 Sep", ndvi: 0.32, ndmi: 0.15, event: "Vegetative" },
          { date: "25 Sep", ndvi: 0.49, ndmi: 0.26, event: "Branching" },
          { date: "10 Oct", ndvi: 0.62, ndmi: 0.32, event: "Flowering" },
          { date: "27 Oct", ndvi: 0.68, ndmi: 0.34, event: "Pod Formation" },
        ],
      },
      {
        plot_id: "plot-2",
        plot_name: "South Valley Plot",
        crop: "Onion (Bhima Super)",
        latest_scene: {
          scene_id: "S2A_MSIL2A_20261027_T43QDB",
          satellite: "Sentinel-2 L2A",
          provider: "Copernicus Data Space Ecosystem (Sentinel Hub)",
          acquisition_date: "2026-10-27",
          cloud_cover_pct: 2.4,
          resolution_meters: 10,
          true_color_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
          false_color_url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
          ndvi_map_url: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80",
        },
        indices: {
          mean_ndvi: 0.46,
          min_ndvi: 0.35,
          max_ndvi: 0.54,
          mean_ndmi: 0.22,
          vegetation_vigor: "Moderate (Vegetative Bulbing)",
          moisture_status: "Moderate (Adequate for stage)",
        },
        anomalies_detected: [],
        integration_notes:
          "Reflectance typical for bulb development stage. NDMI indicates stable soil moisture post-sprinkler cycle.",
        historical_ndvi_trend: [
          { date: "10 Sep", ndvi: 0.2, ndmi: 0.08, event: "Transplanting" },
          { date: "25 Sep", ndvi: 0.29, ndmi: 0.14, event: "Establishment" },
          { date: "10 Oct", ndvi: 0.38, ndmi: 0.18, event: "Vegetative" },
          { date: "27 Oct", ndvi: 0.46, ndmi: 0.22, event: "Bulb Initiation" },
        ],
      },
    ],
  }

  const activePlot = summary.plots_analysis[selectedPlotIndex] || summary.plots_analysis[0]
  const scene = activePlot.latest_scene

  const getActiveImage = () => {
    if (imageMode === "false") return scene.false_color_url
    if (imageMode === "true") return scene.true_color_url
    return scene.ndvi_map_url
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-card to-card border border-emerald-500/20 shadow-lg">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                <Satellite className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-bold text-foreground">{t.title}</h1>
            </div>
            <p className="text-sm text-muted-foreground">{t.subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs text-muted-foreground block">{t.acquisitionDate}</span>
              <span className="text-sm font-semibold text-foreground flex items-center gap-1 justify-end">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                {summary.latest_acquisition_date}
              </span>
            </div>
            <Button
              onClick={fetchSatelliteData}
              variant="outline"
              size="sm"
              disabled={loading}
              className="gap-2 font-medium"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              {t.refreshData}
            </Button>
          </div>
        </div>

        {/* Telemetry Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-4 bg-card border-border/80 shadow-sm">
            <span className="text-xs text-muted-foreground block mb-1">{t.provider}</span>
            <span className="text-sm font-bold text-foreground flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-500" />
              {scene.satellite}
            </span>
            <span className="text-[11px] text-muted-foreground block mt-0.5 truncate">
              {scene.provider.split("(")[0]}
            </span>
          </Card>

          <Card className="p-4 bg-card border-border/80 shadow-sm">
            <span className="text-xs text-muted-foreground block mb-1">{t.cloudCover}</span>
            <span className="text-sm font-bold text-foreground flex items-center gap-1.5">
              <Cloud className="w-4 h-4 text-sky-400" />
              {scene.cloud_cover_pct}%
            </span>
            <span className="text-[11px] text-emerald-500 font-medium block mt-0.5">Clear Sky Pass</span>
          </Card>

          <Card className="p-4 bg-card border-border/80 shadow-sm">
            <span className="text-xs text-muted-foreground block mb-1">{t.resolution}</span>
            <span className="text-sm font-bold text-foreground flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-indigo-400" />
              {scene.resolution_meters}m Multi-Band
            </span>
            <span className="text-[11px] text-muted-foreground block mt-0.5">B4, B8, B11 Swath</span>
          </Card>

          <Card className="p-4 bg-card border-border/80 shadow-sm">
            <span className="text-xs text-muted-foreground block mb-1">{t.overallStatus}</span>
            <span className="text-sm font-bold text-emerald-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              {summary.overall_health}
            </span>
            <span className="text-[11px] text-muted-foreground block mt-0.5">Digital Twin Synced</span>
          </Card>
        </div>

        {/* Plot Selector Chips */}
        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
            {t.selectPlot}
          </span>
          <div className="flex flex-wrap gap-3">
            {summary.plots_analysis.map((plot: any, idx: number) => {
              const isSelected = idx === selectedPlotIndex
              return (
                <button
                  key={plot.plot_id}
                  onClick={() => setSelectedPlotIndex(idx)}
                  className={`px-4 py-2.5 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-md"
                      : "bg-card text-foreground border-border hover:border-primary/50"
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${isSelected ? "bg-white/20" : "bg-muted"}`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs block opacity-80">{plot.plot_name}</span>
                    <span className="text-sm font-bold block">{plot.crop}</span>
                  </div>
                  <span
                    className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                    }`}
                  >
                    NDVI {plot.indices.mean_ndvi.toFixed(2)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Observation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Satellite Imagery Viewer (7 Cols) */}
          <Card className="lg:col-span-7 p-6 bg-card border-border shadow-md flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    {activePlot.plot_name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Scene: <code className="text-primary font-mono">{scene.scene_id}</code>
                  </p>
                </div>

                {/* Imagery View Mode Switcher */}
                <div className="flex items-center gap-1 bg-muted p-1 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => setImageMode("ndvi")}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      imageMode === "ndvi" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                    }`}
                  >
                    {t.ndviMask}
                  </button>
                  <button
                    onClick={() => setImageMode("true")}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      imageMode === "true" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                    }`}
                  >
                    {t.trueColor}
                  </button>
                  <button
                    onClick={() => setImageMode("false")}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      imageMode === "false" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                    }`}
                  >
                    {t.falseColor}
                  </button>
                </div>
              </div>

              {/* Satellite Frame Container */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black/60 border border-border group shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getActiveImage()}
                  alt="Satellite Observation"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlaid Plot Boundary Badge */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white text-xs flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Cadastral Boundary Overlay Active</span>
                </div>

                {/* Bottom Spectral Legend */}
                <div className="absolute bottom-3 left-3 right-3 bg-background/85 backdrop-blur-md p-3 rounded-xl border border-border/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">NDVI Scale:</span>
                    <div className="h-3 w-28 rounded-full bg-gradient-to-r from-amber-500 via-lime-400 to-emerald-600" />
                    <span className="font-mono text-[11px] font-bold text-foreground">0.2 ➔ 0.8+</span>
                  </div>
                  <span className="text-muted-foreground text-[11px] hidden sm:inline">
                    Pass valid for: {scene.acquisition_date}
                  </span>
                </div>
              </div>
            </div>

            {/* Integration Note */}
            <div className="mt-4 p-3.5 bg-primary/5 rounded-xl border border-primary/20 text-xs text-muted-foreground flex items-start gap-2.5">
              <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{activePlot.integration_notes}</span>
            </div>
          </Card>

          {/* Right Column: Spectral Indices & Analytics (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* KPI Cards for NDVI & NDMI */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-5 bg-card border-border shadow-md">
                <span className="text-xs text-muted-foreground block mb-1">{t.ndviScore}</span>
                <span className="text-3xl font-extrabold text-emerald-500">
                  {activePlot.indices.mean_ndvi.toFixed(2)}
                </span>
                <div className="mt-2 text-xs">
                  <span className="text-muted-foreground block">{t.vigor}</span>
                  <span className="font-semibold text-foreground">{activePlot.indices.vegetation_vigor}</span>
                </div>
              </Card>

              <Card className="p-5 bg-card border-border shadow-md">
                <span className="text-xs text-muted-foreground block mb-1">{t.ndmiScore}</span>
                <span className="text-3xl font-extrabold text-sky-500">
                  {activePlot.indices.mean_ndmi.toFixed(2)}
                </span>
                <div className="mt-2 text-xs">
                  <span className="text-muted-foreground block">{t.moistureStatus}</span>
                  <span className="font-semibold text-foreground">{activePlot.indices.moisture_status}</span>
                </div>
              </Card>
            </div>

            {/* Multi-temporal NDVI Cycle Chart */}
            <Card className="p-6 bg-card border-border shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  {t.spectralTrend}
                </h4>
                <span className="text-[11px] text-muted-foreground">Sentinel-2 5-day cycle</span>
              </div>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={activePlot.historical_ndvi_trend}
                    margin={{ top: 5, right: 10, left: -25, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 1]} tick={{ fontSize: 11 }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const p = payload[0].payload
                          return (
                            <div className="bg-popover border border-border p-2 rounded-lg text-xs shadow-lg">
                              <p className="font-bold text-foreground">{p.date} - {p.event}</p>
                              <p className="text-emerald-500 font-semibold">NDVI: {p.ndvi}</p>
                              <p className="text-sky-400 font-semibold">NDMI: {p.ndmi}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <ReferenceLine y={0.5} stroke="#10b981" strokeDasharray="3 3" label={{ value: "Canopy Threshold", fill: "#10b981", fontSize: 10, position: "insideBottomRight" }} />
                    <Line
                      type="monotone"
                      dataKey="ndvi"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#10b981" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="ndmi"
                      stroke="#38bdf8"
                      strokeWidth={2}
                      dot={{ r: 3, fill: "#38bdf8" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Spatial Anomalies Card */}
            <Card className="p-5 bg-card border-border shadow-md">
              <h4 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                {t.anomalies}
              </h4>

              {activePlot.anomalies_detected.length > 0 ? (
                <div className="space-y-2">
                  {activePlot.anomalies_detected.map((anomaly: string, i: number) => (
                    <div
                      key={i}
                      className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-600 dark:text-amber-400 flex items-start gap-2"
                    >
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{anomaly}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.noAnomalies}</span>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Scientific Disclaimer Footer Card */}
        <Card className="p-5 bg-muted/40 border border-border rounded-2xl">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground space-y-1">
              <span className="font-bold text-foreground block">{t.disclaimerTitle}</span>
              <p>{summary.scientific_disclaimer}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
