"use client"

import { useState } from "react"
import {
  Play,
  RotateCcw,
  Sliders,
  Droplets,
  Coins,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Info,
  Layers,
  ArrowRight,
  Sun,
  Flame,
  Wallet,
  Sprout,
  Activity,
  Gauge,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import type { Language } from "../language-context"
import { dictionary } from "../translations"

interface ScenarioSimulatorProps {
  language: Language
  onApplyPlan: () => void
}

export default function ScenarioSimulator({ language, onApplyPlan }: ScenarioSimulatorProps) {
  const [selectedScenario, setSelectedScenario] = useState<
    "baseline" | "dry_spell" | "heatwave" | "water_cut" | "budget_cut"
  >("dry_spell")
  const d = dictionary[language] || dictionary.en

  const [rainfallAnomaly, setRainfallAnomaly] = useState(-40)
  const [tempOffset, setTempOffset] = useState(2.5)
  const [availableWaterPct, setAvailableWaterPct] = useState(60)
  const [budgetLimit, setBudgetLimit] = useState(28000)

  const simulatedWaterBalance = [
    { day: "Day 1", waterNeed: 35, soilWater: 65, deficit: 0 },
    { day: "Day 5", waterNeed: 44, soilWater: 48, deficit: 5 },
    { day: "Day 10", waterNeed: 62, soilWater: 32, deficit: 18 },
    { day: "Day 15", waterNeed: 74, soilWater: 18, deficit: 38 },
    { day: "Day 20", waterNeed: 80, soilWater: 10, deficit: 52 },
    { day: "Day 25", waterNeed: 65, soilWater: 8, deficit: 45 },
    { day: "Day 30", waterNeed: 48, soilWater: 12, deficit: 28 },
  ]

  const strategies = [
    {
      id: "strat-1",
      name: language === "mr" ? "पर्याय अ: पारंपारिक पाटपाणी (मूळ पद्धत)" : language === "hi" ? "विकल्प अ: पारंपरिक खुला पानी (मूल पद्धति)" : "Strategy A: Conventional Furrow (Baseline)",
      cost: 34000,
      waterUseLiters: 92000,
      cropStress: language === "mr" ? "उच्च (ताण वाढेल)" : language === "hi" ? "उच्च (तनाव बढ़ेगा)" : "High (Under Dry Spell)",
      feasible: false,
      infeasibilityReason: language === "mr" ? "पाणी साठ्यापेक्षा १२,००० लिटर आणि बजेटपेक्षा ₹६,००० जास्त" : "Exceeds Water Storage by 12,000 L & Budget by ₹6,000",
      recommended: false,
    },
    {
      id: "strat-2",
      name: language === "mr" ? "पर्याय ब: नियंत्रित ठिबक सिंचन + आच्छादन" : language === "hi" ? "विकल्प ब: नियंत्रित ड्रिप सिंचाई + मल्चिंग" : "Strategy B: Deficit Drip Irrigation + Mulch",
      cost: 21500,
      waterUseLiters: 58000,
      cropStress: language === "mr" ? "कमी (ओलावा टिकून राहील)" : language === "hi" ? "कम (नमी सुरक्षित रहेगी)" : "Low (Moisture Preserved)",
      feasible: true,
      infeasibilityReason: null,
      recommended: true,
      savings: language === "mr" ? "३४,००० लिटर पाणी आणि ₹१२,५०० ची बचत" : language === "hi" ? "३४,००० लीटर पानी और ₹१२,५०० की बचत" : "Save 34,000 L water & ₹12,500 budget",
    },
    {
      id: "strat-3",
      name: language === "mr" ? "पर्याय क: केवळ फुलोरा अवस्थेत संरक्षणात्मक पाणी" : language === "hi" ? "विकल्प स: केवल फूल आने पर सुरक्षात्मक सिंचाई" : "Strategy C: Protective Irrigation at Flowering Only",
      cost: 16000,
      waterUseLiters: 42000,
      cropStress: language === "mr" ? "मध्यम (फुलोरा संरक्षित)" : language === "hi" ? "मध्यम (फूल सुरक्षित)" : "Moderate (Flowering Protected)",
      feasible: true,
      infeasibilityReason: null,
      recommended: false,
      savings: language === "mr" ? "कमी खर्च, उत्पादनात अल्प तफावत" : "Minimal cost, minor yield trade-off",
    },
  ]

  const handleScenarioChange = (scenarioId: "baseline" | "dry_spell" | "heatwave" | "water_cut" | "budget_cut") => {
    setSelectedScenario(scenarioId)
    if (scenarioId === "baseline") {
      setRainfallAnomaly(0)
      setTempOffset(0)
      setAvailableWaterPct(100)
      setBudgetLimit(38000)
    } else if (scenarioId === "dry_spell") {
      setRainfallAnomaly(-40)
      setTempOffset(2.5)
      setAvailableWaterPct(60)
      setBudgetLimit(28000)
    } else if (scenarioId === "heatwave") {
      setRainfallAnomaly(-20)
      setTempOffset(3.5)
      setAvailableWaterPct(70)
      setBudgetLimit(30000)
    } else if (scenarioId === "water_cut") {
      setRainfallAnomaly(-10)
      setTempOffset(1.0)
      setAvailableWaterPct(50)
      setBudgetLimit(32000)
    } else if (scenarioId === "budget_cut") {
      setRainfallAnomaly(0)
      setTempOffset(0)
      setAvailableWaterPct(80)
      setBudgetLimit(18000)
    }
  }

  const handleResetToBaseline = () => {
    handleScenarioChange("baseline")
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER BANNER & TELEMETRY STRIP */}
      <div className="rounded-3xl bg-white border border-[#E5EBE5] p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#DDF3E6] text-[#073B2A] border border-[#087A4B]/20">
                <Activity className="w-3.5 h-3.5 text-[#087A4B]" />
                <span>Agricultural Digital Twin &bull; In-Silico Engine</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F5F7F3] text-[#475549] border border-[#E5EBE5] font-semibold">
                {d.faoBadge || "FAO-56 Dual Crop-Water Model"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#25352C] tracking-tight mt-1.5 font-heading">
              {d.scenarioHead || "Agro-Climatic Digital Twin & Stress Simulator"}
            </h1>
            <p className="text-xs sm:text-sm text-[#68766C] mt-0.5">
              {d.scenarioSub || "Simulate climate anomalies, test farm water-budget thresholds, and evaluate candidate mitigation policies in real-time."}
            </p>
          </div>

          <button
            onClick={handleResetToBaseline}
            className="px-4 py-2 rounded-xl bg-[#F5F7F3] hover:bg-[#E5EBE5] text-[#25352C] text-xs font-bold transition-all border border-[#E5EBE5] flex items-center gap-1.5 shrink-0 shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#087A4B]" />
            <span>Reset Baseline</span>
          </button>
        </div>

        {/* Real-time Telemetry Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#E5EBE5]">
          <div className="p-3 rounded-2xl bg-[#F5F7F3] border border-[#E5EBE5]">
            <span className="text-[10px] font-bold text-[#68766C] uppercase tracking-wider block">
              Reference ET (ET₀)
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-extrabold text-[#25352C] font-mono">
                {(4.2 + (tempOffset * 0.4)).toFixed(1)}
              </span>
              <span className="text-xs font-semibold text-[#68766C]">mm/day</span>
            </div>
            <span className="text-[10px] text-[#087A4B] font-semibold block mt-0.5">
              Penman-Monteith Model
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[#F5F7F3] border border-[#E5EBE5]">
            <span className="text-[10px] font-bold text-[#68766C] uppercase tracking-wider block">
              Field Water Reserve
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-extrabold text-[#2878D0] font-mono">
                {Math.round(80000 * (availableWaterPct / 100)).toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-[#68766C]">Litres</span>
            </div>
            <span className="text-[10px] text-[#68766C] font-semibold block mt-0.5">
              Farm Pond + Borewell
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[#F5F7F3] border border-[#E5EBE5]">
            <span className="text-[10px] font-bold text-[#68766C] uppercase tracking-wider block">
              Water Stress Index
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className={`text-xl font-extrabold font-mono ${rainfallAnomaly < -30 ? "text-[#D94B45]" : "text-[#E6A23C]"}`}>
                {rainfallAnomaly < -30 ? "0.68" : "0.34"}
              </span>
              <span className="text-xs font-semibold text-[#68766C]">CWSI (0-1)</span>
            </div>
            <span className={`text-[10px] font-bold block mt-0.5 ${rainfallAnomaly < -30 ? "text-[#D94B45]" : "text-[#087A4B]"}`}>
              {rainfallAnomaly < -30 ? "Severe Stress Risk" : "Manageable Window"}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[#F5F7F3] border border-[#E5EBE5]">
            <span className="text-[10px] font-bold text-[#68766C] uppercase tracking-wider block">
              Target Yield Retention
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-extrabold text-[#087A4B] font-mono">
                {selectedScenario === "dry_spell" ? "92%" : selectedScenario === "baseline" ? "98%" : "89%"}
              </span>
              <span className="text-xs font-semibold text-[#68766C]">Protected</span>
            </div>
            <span className="text-[10px] text-[#087A4B] font-semibold block mt-0.5">
              Under Recommended Strategy
            </span>
          </div>
        </div>
      </div>

      {/* PRESET SCENARIO BUTTONS (Clean Modern Cards with Lucide Icons) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { 
            id: "baseline", 
            label: d.normalSeason || "Normal Season", 
            tag: "Standard Baseline",
            icon: Sprout 
          },
          { 
            id: "dry_spell", 
            label: d.drySpell15 || "15-Day Dry Spell", 
            tag: "-40% Rain Anomaly",
            icon: Sun 
          },
          { 
            id: "heatwave", 
            label: d.heatwave3 || "+3°C Heatwave", 
            tag: "+3.5°C Elevated ET",
            icon: Flame 
          },
          { 
            id: "water_cut", 
            label: d.waterCut50 || "50% Water Cut", 
            tag: "Canal Restriction",
            icon: Droplets 
          },
          { 
            id: "budget_cut", 
            label: d.budgetSqueeze || "Budget Squeeze", 
            tag: "Cap ₹18,000",
            icon: Wallet 
          },
        ].map((item) => {
          const Icon = item.icon
          const isSelected = selectedScenario === item.id
          return (
            <button
              key={item.id}
              onClick={() => handleScenarioChange(item.id as any)}
              className={`p-4 rounded-3xl border text-left transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? "bg-[#087A4B] text-white font-bold border-[#087A4B] shadow-md shadow-[#087A4B]/20 -translate-y-0.5"
                  : "bg-white text-[#25352C] border-[#E5EBE5] hover:border-[#087A4B]/40 hover:bg-[#F5F7F3]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                    isSelected ? "bg-white/20 text-white" : "bg-[#DDF3E6] text-[#087A4B]"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  )}
                </div>
                <h4 className="text-xs font-bold block">{item.label}</h4>
              </div>
              <span className={`text-[10px] font-semibold mt-2 block ${isSelected ? "text-emerald-100" : "text-[#68766C]"}`}>
                {item.tag}
              </span>
            </button>
          )
        })}
      </div>

      {/* INTERACTIVE TWIN SLIDERS & WATER BALANCE CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SLIDERS (4 COLS) */}
        <div className="lg:col-span-4 rounded-3xl bg-white border border-[#E5EBE5] p-5 space-y-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#E5EBE5] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#087A4B]" />
                <h3 className="font-bold text-sm text-[#25352C] font-heading">{d.adjustVariables || "Adjust Scenario Variables"}</h3>
              </div>
              <span className="text-[10px] font-bold text-[#087A4B] bg-[#DDF3E6] px-2 py-0.5 rounded-full">
                Interactive
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[#68766C] font-medium">{d.rainfallAnomaly || "Rainfall Anomaly"}</span>
                  <span className={`font-bold font-mono px-2 py-0.5 rounded ${rainfallAnomaly < 0 ? "bg-red-50 text-[#D94B45]" : "bg-emerald-50 text-[#087A4B]"}`}>
                    {rainfallAnomaly > 0 ? `+${rainfallAnomaly}%` : `${rainfallAnomaly}%`}
                  </span>
                </div>
                <input
                  type="range"
                  min="-80"
                  max="50"
                  value={rainfallAnomaly}
                  onChange={(e) => setRainfallAnomaly(Number(e.target.value))}
                  className="w-full accent-[#087A4B] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#68766C] mt-1 font-mono">
                  <span>-80% Severe Drought</span>
                  <span>+50% Wet</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[#68766C] font-medium">{d.tempOffset || "Temperature Offset"}</span>
                  <span className="font-bold text-[#E6A23C] font-mono bg-amber-50 px-2 py-0.5 rounded">
                    +{tempOffset}°C
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={tempOffset}
                  onChange={(e) => setTempOffset(Number(e.target.value))}
                  className="w-full accent-[#E6A23C] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#68766C] mt-1 font-mono">
                  <span>0°C Normal</span>
                  <span>+5°C Extreme</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[#68766C] font-medium">{d.usableStorage || "Usable Tank Storage"}</span>
                  <span className="font-bold text-[#2878D0] font-mono bg-sky-50 px-2 py-0.5 rounded">
                    {availableWaterPct}% ({Math.round(80 * (availableWaterPct / 100))}k L)
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={availableWaterPct}
                  onChange={(e) => setAvailableWaterPct(Number(e.target.value))}
                  className="w-full accent-[#2878D0] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#68766C] mt-1 font-mono">
                  <span>20% Low</span>
                  <span>100% Full</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[#68766C] font-medium">{d.workingBudget || "Available Working Budget"}</span>
                  <span className="font-bold text-[#087A4B] font-mono bg-emerald-50 px-2 py-0.5 rounded">
                    ₹{budgetLimit.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="50000"
                  step="2000"
                  value={budgetLimit}
                  onChange={(e) => setBudgetLimit(Number(e.target.value))}
                  className="w-full accent-[#087A4B] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#68766C] mt-1 font-mono">
                  <span>₹10,000</span>
                  <span>₹50,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#F5F7F3] rounded-2xl border border-[#E5EBE5] text-[11px] text-[#68766C] space-y-1">
            <span className="font-bold text-[#25352C] block">Calibrated Crop Parameters:</span>
            <div className="flex justify-between">
              <span>Plot 1 Root Depth:</span>
              <span className="font-bold text-[#25352C]">60 cm (Soybean)</span>
            </div>
            <div className="flex justify-between">
              <span>Readily Available Water (RAW):</span>
              <span className="font-bold text-[#087A4B]">45 mm</span>
            </div>
          </div>
        </div>

        {/* WATER STRESS TRAJECTORY CHART (8 COLS) */}
        <div className="lg:col-span-8 rounded-3xl bg-white border border-[#E5EBE5] p-5 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5EBE5] pb-3">
            <div>
              <h3 className="font-bold text-sm text-[#25352C] flex items-center gap-2 font-heading">
                <Droplets className="w-4 h-4 text-[#2878D0]" />
                {d.waterDeficitCurve || "Root-Zone Soil Moisture & Crop Water Deficit Curve"}
              </h3>
              <p className="text-[11px] text-[#68766C]">
                Soybean Plot 1 &bull; Critical flowering window (Days 10-25) &bull; 30-Day Predictive Horizon
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-[#087A4B]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#087A4B]" /> {d.availableSoilWater || "Available Soil Water"}
              </span>
              <span className="flex items-center gap-1.5 text-[#D94B45]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D94B45]" /> {d.waterDeficit || "Water Deficit (Stress)"}
              </span>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={simulatedWaterBalance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="soilWaterGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#087A4B" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#087A4B" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="deficitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D94B45" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#D94B45" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} stroke="#E5EBE5" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#68766C" }} />
                <YAxis tick={{ fontSize: 11, fill: "#68766C" }} unit=" mm" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E5EBE5",
                    borderRadius: "14px",
                    fontSize: "11px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  }}
                />
                <ReferenceLine y={25} stroke="#E6A23C" strokeDasharray="3 3" label={{ value: d.wiltingLine || "Wilting Point Stress Line", fill: "#A86B12", fontSize: 10 }} />
                <Area type="monotone" dataKey="soilWater" stroke="#087A4B" strokeWidth={2.5} fillOpacity={1} fill="url(#soilWaterGrad)" />
                <Area type="monotone" dataKey="deficit" stroke="#D94B45" strokeWidth={2} fillOpacity={1} fill="url(#deficitGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3.5 bg-[#FFF7E8] border border-[#E6A23C]/30 rounded-2xl text-xs text-[#A86B12] flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#E6A23C]" />
            <div>
              <span className="font-bold text-[#8A5A00] block">Simulation Telemetry Alert:</span>
              <span className="text-[#8A5A00]">
                Under the simulated {selectedScenario.replace("_", " ")} conditions, root-zone soil water breaches the <b>25mm wilting threshold by Day 12</b> without precision irrigation scheduling. Strategy B mitigates 100% of this deficit.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DECISION ENGINE: FEASIBLE STRATEGY COMPARISON */}
      <div className="rounded-3xl bg-white border border-[#E5EBE5] p-6 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5EBE5] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-[#DDF3E6] text-[#087A4B] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-[#087A4B]" />
              </div>
              <h3 className="font-bold text-base text-[#25352C] font-heading">
                {d.candidateStrategies || "Decision Engine: Candidate Strategies under Constraints"}
              </h3>
            </div>
            <p className="text-xs text-[#68766C] mt-0.5">
              Filtered against Usable Storage (&le; {Math.round(80000 * (availableWaterPct / 100)).toLocaleString()} L) and Budget (&le; ₹{budgetLimit.toLocaleString()})
            </p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-[#DDF3E6] text-[#073B2A] font-bold border border-[#087A4B]/20 self-start sm:self-auto">
            {d.recommendedOptimal || "Recommended Optimal Policy"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {strategies.map((strat) => (
            <div
              key={strat.id}
              className={`p-5 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                strat.recommended
                  ? "bg-gradient-to-br from-[#F0F8F3] to-white border-[#087A4B] shadow-md shadow-[#087A4B]/10 hover:shadow-lg"
                  : strat.feasible
                  ? "bg-white border-[#E5EBE5] text-[#25352C] hover:border-[#087A4B]/30"
                  : "bg-[#FFF5F5] border-[#D94B45]/20 text-[#68766C] opacity-80"
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      strat.recommended
                        ? "bg-[#087A4B] text-white shadow-xs"
                        : strat.feasible
                        ? "bg-[#EBF3FC] text-[#2878D0] border border-[#2878D0]/20"
                        : "bg-[#FFF1F0] text-[#D94B45] border border-[#D94B45]/20"
                    }`}
                  >
                    {strat.recommended ? (d.recommendedOptimal || "Recommended Policy") : strat.feasible ? "Feasible Alternative" : "Infeasible"}
                  </span>
                  {strat.recommended && (
                    <Sparkles className="w-4 h-4 text-[#087A4B]" />
                  )}
                </div>

                <h4 className="font-bold text-sm text-[#25352C] font-heading">{strat.name}</h4>

                <div className="space-y-2 text-xs py-3 border-y border-[#E5EBE5]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#68766C]">{d.estimatedCost || "Estimated Cost"}:</span>
                    <span className="font-bold text-[#25352C] font-mono text-sm">₹{strat.cost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#68766C]">Water Consumption:</span>
                    <span className="font-bold text-[#2878D0] font-mono">{strat.waterUseLiters.toLocaleString()} L</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#68766C]">Crop Stress:</span>
                    <span className={`font-bold ${strat.recommended ? "text-[#087A4B]" : strat.feasible ? "text-[#E6A23C]" : "text-[#D94B45]"}`}>
                      {strat.cropStress}
                    </span>
                  </div>
                </div>

                {strat.savings && (
                  <div className="text-[11px] text-[#073B2A] font-bold bg-[#DDF3E6] p-2.5 rounded-xl flex items-center gap-1.5 border border-[#087A4B]/20">
                    <Sparkles className="w-3.5 h-3.5 text-[#087A4B] shrink-0" />
                    <span>{strat.savings}</span>
                  </div>
                )}

                {strat.infeasibilityReason && (
                  <div className="text-[11px] text-[#D94B45] font-semibold bg-white p-2.5 rounded-xl border border-[#D94B45]/20 flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#D94B45] shrink-0 mt-0.5" />
                    <span>{strat.infeasibilityReason}</span>
                  </div>
                )}
              </div>

              <div className="mt-5">
                {strat.recommended ? (
                  <button
                    onClick={onApplyPlan}
                    className="w-full py-2.5 rounded-2xl bg-[#087A4B] hover:bg-[#06633D] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#087A4B]/20 transition-all cursor-pointer"
                  >
                    <span>{d.adoptStrategyBtn || "Adopt Recommended Strategy"}</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                ) : (
                  <button
                    disabled={!strat.feasible}
                    className="w-full py-2.5 rounded-2xl border border-[#E5EBE5] bg-[#F5F7F3] text-[#68766C] text-xs font-semibold disabled:opacity-50"
                  >
                    {strat.feasible ? "Select Secondary Plan" : "Constraint Exceeded"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
