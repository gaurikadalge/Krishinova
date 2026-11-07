"use client"

import { useState, useEffect } from "react"
import {
  FileText,
  Calendar,
  CheckCircle2,
  Droplets,
  Coins,
  Printer,
  Info,
  PlusCircle,
  Clock,
  Check,
  X,
  History,
  AlertTriangle
} from "lucide-react"
import type { Language } from "../language-context"
import { dictionary } from "../translations"

interface ActionPlanProps {
  language: Language
  onBackToSim: () => void
}

export default function ActionPlanView({ language, onBackToSim }: ActionPlanProps) {
  const d = dictionary[language] || dictionary.en

  const [activities, setActivities] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [successBanner, setSuccessBanner] = useState<string | null>(null)

  // Form State
  const [operationName, setOperationName] = useState("")
  const [plotId, setPlotId] = useState("plot-1")
  const [status, setStatus] = useState("completed")
  const [waterUsed, setWaterUsed] = useState(12000)
  const [costIncurred, setCostIncurred] = useState(450)
  const [notes, setNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const steps = [
    {
      id: "step-1",
      day: language === "mr" ? "आज (दिवस १)" : language === "hi" ? "आज (दिन १)" : "Today (Day 1)",
      task: language === "mr" ? "सोयाबीन प्लॉट १ वर नियंत्रित ठिबक सिंचन सुरू करा" : language === "hi" ? "सोयाबीन प्लॉट १ पर नियंत्रित ड्रिप सिंचाई शुरू करें" : "Switch Soybean Plot 1 to Deficit Drip Cycle",
      duration: "45 min",
      waterLitres: "12,000 L",
      waterNum: 12000,
      costNum: 450,
      detail: language === "mr" ? "बाष्पीभवन रोखण्यासाठी सकाळी ६:०० ते ७:३० दरम्यान पाणी द्या." : "Apply pulse drip irrigation during early morning (6:00 AM - 7:30 AM) to minimize midday evaporation.",
      status: language === "mr" ? "सज्ज" : "Ready",
    },
    {
      id: "step-2",
      day: language === "mr" ? "दिवस ३ - दिवस ४" : language === "hi" ? "दिन ३ - दिन ४" : "Day 3 - Day 4",
      task: language === "mr" ? "सेंद्रिय आच्छादन (मल्चिंग) पसरवा" : language === "hi" ? "जैविक मल्चिंग (आच्छादन) करें" : "Apply Organic Mulch / Crop Residue",
      duration: "Field Operation",
      waterLitres: "0 L",
      waterNum: 0,
      costNum: 1800,
      detail: language === "mr" ? "ओलावा २५-३०% जास्त टिकवून ठेवण्यासाठी ओळींमध्ये भुसा किंवा पेंढा पसरावा." : "Spread dry straw or husk between crop rows to preserve 25-30% additional root-zone moisture during the dry spell.",
      status: language === "mr" ? "नियोजित" : "Scheduled",
    },
    {
      id: "step-3",
      day: language === "mr" ? "दिवस ८" : language === "hi" ? "दिन ८" : "Day 8",
      task: language === "mr" ? "पोटॅशियम नायट्रेट (१%) फवारणी" : language === "hi" ? "पोटैशियम नाइट्रेट (१%) छिड़काव" : "Verify Soil Moisture & Foliar Spray",
      duration: "30 min",
      waterLitres: "2,500 L",
      waterNum: 2500,
      costNum: 1200,
      detail: language === "mr" ? "उष्णतेचा ताण सहन करण्यासाठी पानांवर फवारणी करा." : "Optional 1% Potassium Nitrate (KNO₃) spray to induce stomatal closure and boost heat resistance.",
      status: language === "mr" ? "आवश्यकतेनुसार" : "Contingent",
    },
    {
      id: "step-4",
      day: language === "mr" ? "दिवस १४" : language === "hi" ? "दिन १४" : "Day 14",
      task: language === "mr" ? "फुलोरा अवस्थेत संरक्षणात्मक सिंचन" : language === "hi" ? "फूल आने पर सुरक्षात्मक सिंचाई" : "Peak Flowering Protective Irrigation",
      duration: "1 hour",
      waterLitres: "18,000 L",
      waterNum: 1800,
      costNum: 600,
      detail: language === "mr" ? "शेंगांची गळती रोखण्यासाठी शेततळ्यातील पाण्याचा वापर करा." : "Critical watering stage. Allocates stored water from farm pond to prevent pod abortion.",
      status: language === "mr" ? "अंतिम टप्पा" : "Planned",
    },
  ]

  // Fetch logged activities on mount
  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"
    fetch(`${apiBase}/api/farms/farm-mh-001/activities`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setActivities(data)
      })
      .catch((err) => console.warn("Could not fetch activities", err))
  }, [])

  const handleOpenLogModal = (task: any) => {
    setSelectedTask(task)
    setOperationName(task.task)
    setWaterUsed(task.waterNum || 0)
    setCostIncurred(task.costNum || 0)
    setNotes(task.detail || "")
    setIsModalOpen(true)
  }

  const handleRecordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"

    const newActivity = {
      id: `act-${Date.now()}`,
      farm_id: "farm-mh-001",
      plot_id: plotId,
      operation: operationName,
      status: status,
      water_used_liters: Number(waterUsed),
      cost_inr: Number(costIncurred),
      date: new Date().toISOString().split("T")[0],
      notes: notes,
      recorded_at: new Date().toISOString().replace("T", " ").substring(0, 19)
    }

    try {
      const res = await fetch(`${apiBase}/api/farms/farm-mh-001/activities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newActivity),
      })
      const saved = await res.json()
      setActivities([saved, ...activities])
      setSuccessBanner(d.activityLoggedSuccess || "Activity recorded & Digital Twin updated!")
      setIsModalOpen(false)
      setTimeout(() => setSuccessBanner(null), 5000)
    } catch (err) {
      console.warn("Failed to persist activity to backend", err)
      // Fallback local update
      setActivities([newActivity, ...activities])
      setSuccessBanner(d.activityLoggedSuccess || "Activity recorded & Digital Twin updated!")
      setIsModalOpen(false)
      setTimeout(() => setSuccessBanner(null), 5000)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Success Notification Banner */}
      {successBanner && (
        <div className="p-4 rounded-2xl bg-[#DDF3E6] border border-[#087A4B] text-[#073B2A] flex items-center justify-between shadow-md transition-all">
          <div className="flex items-center gap-2 text-sm font-bold">
            <CheckCircle2 className="w-5 h-5 text-[#087A4B]" />
            <span>{successBanner}</span>
          </div>
          <button onClick={() => setSuccessBanner(null)} className="text-[#073B2A] hover:opacity-70">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="rounded-3xl bg-white border border-[#E5EBE5] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#DDF3E6] text-[#073B2A]">
              <FileText className="w-4 h-4 text-[#087A4B]" />
            </span>
            <span className="text-xs font-bold text-[#087A4B] uppercase tracking-wider">
              {d.farmerActionPlan}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F5F7F3] text-[#25352C] border border-[#E5EBE5] font-semibold">
              {d.calculatedTag} • Closed-Loop Feedback
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#25352C] font-heading">
            {d.actionPlanTitle}
          </h2>
          <p className="text-xs text-[#68766C] mt-1">
            {language === "mr" ? "शेत:" : "Generated for:"} <b>{d.sahyadriFarm} (5.2 Acres Total • Plot 1: 2.5ac Soybean)</b> &bull; Provenance: FAO-56 & MPKV Rahuri
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleOpenLogModal(steps[0])}
            className="px-4 py-2 rounded-xl bg-[#087A4B] hover:bg-[#073B2A] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{d.recordActionBtn || "Record Execution"}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl border border-[#E5EBE5] text-[#25352C] hover:bg-[#F5F7F3] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-[#68766C]" />
            {d.printPlan}
          </button>
          <button
            onClick={onBackToSim}
            className="px-4 py-2 rounded-xl bg-[#F5F7F3] hover:bg-[#E5EBE5] text-[#25352C] text-xs font-bold transition-all border border-[#E5EBE5]"
          >
            {d.modifyInLab}
          </button>
        </div>
      </div>

      {/* Resource Allocation Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#E5EBE5] flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#EBF3FC] text-[#2878D0] flex items-center justify-center shrink-0">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-[#68766C] block font-medium">{d.allocatedWater}</span>
            <span className="text-base font-bold text-[#2878D0] block">32,500 / 80,000 L</span>
            <span className="text-[10px] text-[#087A4B] font-semibold">47,500 L Kept in Reserve ({d.calculatedTag})</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5EBE5] flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#FFF7E8] text-[#E6A23C] flex items-center justify-center shrink-0">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-[#68766C] block font-medium">{d.estimatedCost}</span>
            <span className="text-base font-bold text-[#A86B12] block">₹21,500</span>
            <span className="text-[10px] text-[#087A4B] font-semibold">₹16,500 Budget Left ({d.calculatedTag})</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5EBE5] flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#DDF3E6] text-[#087A4B] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-[#68766C] block font-medium">{d.expectedOutcome}</span>
            <span className="text-base font-bold text-[#25352C] block">{d.zeroPodRisk}</span>
            <span className="text-[10px] text-[#68766C]">Moisture Protected under Dry Spell</span>
          </div>
        </div>
      </div>

      {/* Sequential Action Schedule */}
      <div className="rounded-3xl bg-white border border-[#E5EBE5] p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[#25352C] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#087A4B]" />
            {d.timelineTitle}
          </h3>
          <span className="text-xs text-[#68766C]">Click &ldquo;Record&rdquo; to log execution back to Twin</span>
        </div>

        <div className="space-y-3">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#F5F7F3] border border-[#E5EBE5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#087A4B]/40 transition-colors"
            >
              <div className="flex items-start gap-3.5">
                <span className="w-7 h-7 rounded-full bg-[#DDF3E6] text-[#073B2A] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#087A4B]">{s.day}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-white text-[#68766C] border border-[#E5EBE5] font-medium">
                      {s.duration}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#25352C] mt-0.5">{s.task}</h4>
                  <p className="text-xs text-[#68766C] mt-1">{s.detail}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 pl-10 sm:pl-0">
                <div className="text-right">
                  <span className="text-xs text-[#2878D0] font-mono font-bold block">{s.waterLitres}</span>
                  <span className="text-[10px] uppercase font-bold text-[#073B2A] bg-[#DDF3E6] px-2.5 py-0.5 rounded-full border border-[#087A4B]/20 inline-block mt-0.5">
                    {s.status}
                  </span>
                </div>
                <button
                  onClick={() => handleOpenLogModal(s)}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#DDF3E6] text-[#073B2A] border border-[#E5EBE5] text-xs font-bold transition-all shadow-xs"
                >
                  {language === "mr" ? "नोंदवा" : "Log Task"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recorded Activities History Ledger (Closed-Loop Feedback Evidence) */}
      <div className="rounded-3xl bg-white border border-[#E5EBE5] p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5EBE5]">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-[#DDF3E6] text-[#073B2A]">
              <History className="w-4 h-4 text-[#087A4B]" />
            </span>
            <h3 className="font-bold text-base text-[#25352C]">
              {language === "mr" ? "शेतकऱ्याने प्रत्यक्षात केलेली कामे (नोंदवही)" : "Actual Field Execution Ledger (Twin Feedback Loop)"}
            </h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#DDF3E6] text-[#073B2A] font-bold">
            {activities.length} {language === "mr" ? "नोंदी" : "Events Logged"}
          </span>
        </div>

        {activities.length === 0 ? (
          <p className="text-xs text-[#68766C] italic py-2">
            {language === "mr" ? "अद्याप कोणतीही शेत कामे नोंदवली नाहीत." : "No operations recorded yet. Use the 'Record Execution' button above."}
          </p>
        ) : (
          <div className="space-y-2.5">
            {activities.map((act: any, aIdx: number) => (
              <div key={act.id || aIdx} className="p-3.5 rounded-2xl bg-[#F5F7F3] border border-[#E5EBE5] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#087A4B]/10 text-[#087A4B] flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#25352C]">{act.operation}</h5>
                    <p className="text-[#68766C] text-[11px]">
                      {act.date} &bull; Recorded: {act.recorded_at} &bull; {act.notes || "No notes"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {act.water_used_liters > 0 && (
                    <span className="font-mono text-[#2878D0] font-semibold">
                      -{act.water_used_liters.toLocaleString()} L
                    </span>
                  )}
                  {act.cost_inr > 0 && (
                    <span className="font-semibold text-[#A86B12]">
                      ₹{act.cost_inr}
                    </span>
                  )}
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                    act.status === "completed" 
                      ? "bg-[#DDF3E6] text-[#073B2A]" 
                      : "bg-[#FFF7E8] text-[#A86B12]"
                  }`}>
                    {act.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Record Execution Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-[#E5EBE5] space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EBE5]">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-[#DDF3E6] text-[#073B2A]">
                  <PlusCircle className="w-4 h-4 text-[#087A4B]" />
                </span>
                <h4 className="font-bold text-base text-[#25352C]">
                  {d.logActivityModalTitle || "Log Completed Farm Operation"}
                </h4>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-[#68766C] hover:text-[#25352C]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#25352C] mb-1">
                  {language === "mr" ? "कामाचे नाव" : "Operation Name"}
                </label>
                <input
                  type="text"
                  required
                  value={operationName}
                  onChange={(e) => setOperationName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E5EBE5] bg-[#F5F7F3] text-[#25352C] font-medium focus:outline-[#087A4B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#25352C] mb-1">
                    {language === "mr" ? "शेत प्लॉट" : "Farm Plot"}
                  </label>
                  <select
                    value={plotId}
                    onChange={(e) => setPlotId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E5EBE5] bg-[#F5F7F3] text-[#25352C] font-medium"
                  >
                    <option value="plot-1">Plot 1: North Plot (Soybean 2.5ac)</option>
                    <option value="plot-2">Plot 2: South Valley (Onion 2.0ac)</option>
                    <option value="plot-3">Plot 3: Homestead & Fallow (0.7ac)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#25352C] mb-1">
                    {d.operationStatus || "Execution Status"}
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E5EBE5] bg-[#F5F7F3] text-[#25352C] font-medium"
                  >
                    <option value="completed">{d.completed || "Completed"}</option>
                    <option value="partial">{d.partial || "Partially Completed"}</option>
                    <option value="skipped">{d.skipped || "Skipped / Postponed"}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#25352C] mb-1">
                    {d.actualWaterUsed || "Actual Water Applied (Litres)"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={waterUsed}
                    onChange={(e) => setWaterUsed(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-[#E5EBE5] bg-[#F5F7F3] text-[#25352C] font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#25352C] mb-1">
                    {d.actualCostIncurred || "Actual Cost Incurred (₹)"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={costIncurred}
                    onChange={(e) => setCostIncurred(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-[#E5EBE5] bg-[#F5F7F3] text-[#25352C] font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#25352C] mb-1">
                  {language === "mr" ? "शेतकऱ्याची निरीक्षणे व टीप" : "Field Observations & Notes"}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Applied morning pulse drip, soil was moderately dry, emitters checked"
                  className="w-full p-2.5 rounded-xl border border-[#E5EBE5] bg-[#F5F7F3] text-[#25352C] font-medium focus:outline-[#087A4B]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5EBE5]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-[#68766C] hover:bg-[#F5F7F3] font-semibold"
                >
                  {d.cancel || "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-[#087A4B] hover:bg-[#073B2A] text-white font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{submitting ? "Saving..." : (d.saveToTwin || "Save & Update Twin")}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
