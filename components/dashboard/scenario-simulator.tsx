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

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[#DDF3E6] text-[#073B2A] font-bold text-xs">
            🧪 {d.scenarioLabTitle}
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-white text-[#7251A5] border border-[#7251A5]/30 font-semibold">
            {d.faoBadge}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#25352C] tracking-tight mt-1 font-heading">
          {d.scenarioHead}
        </h2>
        <p className="text-xs sm:text-sm text-[#68766C] mt-0.5">
          {d.scenarioSub}
        </p>
      </div>

      {/* PRESET SCENARIO BUTTONS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { id: "baseline", label: d.normalSeason, icon: "🌱" },
          { id: "dry_spell", label: d.drySpell15, icon: "☀️" },
          { id: "heatwave", label: d.heatwave3, icon: "🔥" },
          { id: "water_cut", label: d.waterCut50, icon: "💧" },
          { id: "budget_cut", label: d.budgetSqueeze, icon: "🪙" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedScenario(item.id as any)}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              selectedScenario === item.id
                ? "bg-[#087A4B] text-white font-bold border-[#087A4B] shadow-md shadow-[#087A4B]/20"
                : "bg-white text-[#25352C] border-[#E5EBE5] hover:border-[#087A4B]/50 hover:bg-[#F5F7F3]"
            }`}
          >
            <span className="text-xl block mb-1">{item.icon}</span>
            <span className="text-xs font-bold block">{item.label}</span>
          </button>
        ))}
      </div>

      {/* INTERACTIVE TWIN SLIDERS & WATER BALANCE CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SLIDERS (4 COLS) */}
        <div className="lg:col-span-4 rounded-3xl bg-white border border-[#E5EBE5] p-5 space-y-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 border-b border-[#E5EBE5] pb-3">
            <Sliders className="w-4 h-4 text-[#087A4B]" />
            <h3 className="font-bold text-sm text-[#25352C]">{d.adjustVariables}</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[#68766C] font-medium">{d.rainfallAnomaly}</span>
                <span className="font-bold text-[#D94B45] font-mono">{rainfallAnomaly}%</span>
              </div>
              <input
                type="range"
                min="-80"
                max="50"
                value={rainfallAnomaly}
                onChange={(e) => setRainfallAnomaly(Number(e.target.value))}
                className="w-full accent-[#087A4B] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[#68766C] font-medium">{d.tempOffset}</span>
                <span className="font-bold text-[#E6A23C] font-mono">+{tempOffset}°C</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={tempOffset}
                onChange={(e) => setTempOffset(Number(e.target.value))}
                className="w-full accent-[#087A4B] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[#68766C] font-medium">{d.usableStorage}</span>
                <span className="font-bold text-[#2878D0] font-mono">{availableWaterPct}% (48k L)</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={availableWaterPct}
                onChange={(e) => setAvailableWaterPct(Number(e.target.value))}
                className="w-full accent-[#2878D0] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[#68766C] font-medium">{d.workingBudget}</span>
                <span className="font-bold text-[#087A4B] font-mono">₹{budgetLimit.toLocaleString()}</span>
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
            </div>
          </div>
        </div>

        {/* WATER STRESS TRAJECTORY CHART (8 COLS) */}
        <div className="lg:col-span-8 rounded-3xl bg-white border border-[#E5EBE5] p-5 space-y-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-sm text-[#25352C] flex items-center gap-2">
                <Droplets className="w-4 h-4 text-[#2878D0]" />
                {d.waterDeficitCurve}
              </h3>
              <p className="text-[11px] text-[#68766C]">
                Soybean Plot 1 &bull; Critical flowering window (Days 10-25)
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-[#087A4B]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#087A4B]" /> {d.availableSoilWater}
              </span>
              <span className="flex items-center gap-1.5 text-[#D94B45]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D94B45]" /> {d.waterDeficit}
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
                <YAxis tick={{ fontSize: 11, fill: "#68766C" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E5EBE5",
                    borderRadius: "12px",
                    fontSize: "11px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />
                <ReferenceLine y={25} stroke="#E6A23C" strokeDasharray="3 3" label={{ value: d.wiltingLine, fill: "#A86B12", fontSize: 10 }} />
                <Area type="monotone" dataKey="soilWater" stroke="#087A4B" strokeWidth={2.5} fillOpacity={1} fill="url(#soilWaterGrad)" />
                <Area type="monotone" dataKey="deficit" stroke="#D94B45" strokeWidth={2} fillOpacity={1} fill="url(#deficitGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-[#FFF7E8] border border-[#E6A23C]/30 rounded-xl text-xs text-[#A86B12] flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#E6A23C]" />
            <span>
              <b>Simulation Warning:</b> In this dry spell scenario, soil water drops below the 25mm wilting threshold by <b>Day 12</b> without irrigation intervention.
            </span>
          </div>
        </div>
      </div>

      {/* DECISION ENGINE: FEASIBLE STRATEGY COMPARISON */}
      <div className="rounded-3xl bg-white border border-[#E5EBE5] p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5EBE5] pb-4">
          <div>
            <h3 className="font-bold text-base text-[#25352C] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#087A4B]" />
              {d.candidateStrategies}
            </h3>
            <p className="text-xs text-[#68766C]">
              Filtered against Water Storage (&le; 80,000 L) and Budget (&le; ₹{budgetLimit.toLocaleString()})
            </p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-[#DDF3E6] text-[#073B2A] font-bold border border-[#087A4B]/20">
            {d.recommendedOptimal}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {strategies.map((strat) => (
            <div
              key={strat.id}
              className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                strat.recommended
                  ? "bg-[#F0F8F3] border-[#087A4B] shadow-md shadow-[#087A4B]/10"
                  : strat.feasible
                  ? "bg-white border-[#E5EBE5] text-[#25352C]"
                  : "bg-[#FFF1F0] border-[#D94B45]/20 text-[#68766C] opacity-80"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      strat.recommended
                        ? "bg-[#087A4B] text-white font-extrabold"
                        : strat.feasible
                        ? "bg-[#EBF3FC] text-[#2878D0]"
                        : "bg-[#FFF1F0] text-[#D94B45] border border-[#D94B45]/20"
                    }`}
                  >
                    {strat.recommended ? d.recommendedOptimal : strat.feasible ? "Feasible" : "Infeasible"}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-[#25352C] mb-3">{strat.name}</h4>

                <div className="space-y-2 text-xs py-2 border-y border-[#E5EBE5]">
                  <div className="flex justify-between">
                    <span className="text-[#68766C]">{d.estimatedCost}:</span>
                    <span className="font-bold text-[#25352C] font-mono">₹{strat.cost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#68766C]">Water Consumption:</span>
                    <span className="font-bold text-[#2878D0] font-mono">{strat.waterUseLiters.toLocaleString()} L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#68766C]">Crop Stress:</span>
                    <span className="font-semibold text-[#25352C]">{strat.cropStress}</span>
                  </div>
                </div>

                {strat.savings && (
                  <p className="text-[11px] text-[#087A4B] font-bold mt-3 bg-[#DDF3E6] p-2 rounded-lg">
                    ✨ {strat.savings}
                  </p>
                )}

                {strat.infeasibilityReason && (
                  <p className="text-[11px] text-[#D94B45] font-semibold mt-3 bg-white p-2 rounded-lg border border-[#D94B45]/20">
                    ⚠️ {strat.infeasibilityReason}
                  </p>
                )}
              </div>

              <div className="mt-5">
                {strat.recommended ? (
                  <button
                    onClick={onApplyPlan}
                    className="w-full py-2.5 rounded-xl bg-[#087A4B] hover:bg-[#06633D] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#087A4B]/20 transition-all"
                  >
                    {d.adoptStrategyBtn}
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                ) : (
                  <button
                    disabled={!strat.feasible}
                    className="w-full py-2 rounded-xl border border-[#E5EBE5] bg-[#F5F7F3] text-[#68766C] text-xs font-semibold disabled:opacity-50"
                  >
                    {strat.feasible ? "Select Alternative" : "Not Feasible"}
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
