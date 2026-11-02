"use client"

import {
  FileText,
  Calendar,
  CheckCircle2,
  Droplets,
  Coins,
  Printer,
  Info,
} from "lucide-react"
import type { Language } from "../language-context"
import { dictionary } from "../translations"

interface ActionPlanProps {
  language: Language
  onBackToSim: () => void
}

export default function ActionPlanView({ language, onBackToSim }: ActionPlanProps) {
  const d = dictionary[language] || dictionary.en

  const steps = [
    {
      day: language === "mr" ? "आज (दिवस १)" : language === "hi" ? "आज (दिन १)" : "Today (Day 1)",
      task: language === "mr" ? "सोयाबीन प्लॉट १ वर नियंत्रित ठिबक सिंचन सुरू करा" : language === "hi" ? "सोयाबीन प्लॉट १ पर नियंत्रित ड्रिप सिंचाई शुरू करें" : "Switch Soybean Plot 1 to Deficit Drip Cycle",
      duration: "45 min",
      waterLitres: "12,000 L",
      detail: language === "mr" ? "बाष्पीभवन रोखण्यासाठी सकाळी ६:०० ते ७:३० दरम्यान पाणी द्या." : "Apply pulse drip irrigation during early morning (6:00 AM - 7:30 AM) to minimize midday evaporation.",
      status: language === "mr" ? "सज्ज" : "Ready",
    },
    {
      day: language === "mr" ? "दिवस ३ - दिवस ४" : language === "hi" ? "दिन ३ - दिन ४" : "Day 3 - Day 4",
      task: language === "mr" ? "सेंद्रिय आच्छादन (मल्चिंग) पसरवा" : language === "hi" ? "जैविक मल्चिंग (आच्छादन) करें" : "Apply Organic Mulch / Crop Residue",
      duration: "Field Operation",
      waterLitres: "0 L",
      detail: language === "mr" ? "ओलावा २५-३०% जास्त टिकवून ठेवण्यासाठी ओळींमध्ये भुसा किंवा पेंढा पसरावा." : "Spread dry straw or husk between crop rows to preserve 25-30% additional root-zone moisture during the dry spell.",
      status: language === "mr" ? "नियोजित" : "Scheduled",
    },
    {
      day: language === "mr" ? "दिवस ८" : language === "hi" ? "दिन ८" : "Day 8",
      task: language === "mr" ? "पोटॅशियम नायट्रेट (१%) फवारणी" : language === "hi" ? "पोटैशियम नाइट्रेट (१%) छिड़काव" : "Verify Soil Moisture & Foliar Spray",
      duration: "30 min",
      waterLitres: "2,500 L",
      detail: language === "mr" ? "उष्णतेचा ताण सहन करण्यासाठी पानांवर फवारणी करा." : "Optional 1% Potassium Nitrate (KNO₃) spray to induce stomatal closure and boost heat resistance.",
      status: language === "mr" ? "आवश्यकतेनुसार" : "Contingent",
    },
    {
      day: language === "mr" ? "दिवस १४" : language === "hi" ? "दिन १४" : "Day 14",
      task: language === "mr" ? "फुलोरा अवस्थेत संरक्षणात्मक सिंचन" : language === "hi" ? "फूल आने पर सुरक्षात्मक सिंचाई" : "Peak Flowering Protective Irrigation",
      duration: "1 hour",
      waterLitres: "18,000 L",
      detail: language === "mr" ? "शेंगांची गळती रोखण्यासाठी शेततळ्यातील पाण्याचा वापर करा." : "Critical watering stage. Allocates stored water from farm pond to prevent pod abortion.",
      status: language === "mr" ? "अंतिम टप्पा" : "Planned",
    },
  ]

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
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
          </div>
          <h2 className="text-2xl font-bold text-[#25352C] font-heading">
            {d.actionPlanTitle}
          </h2>
          <p className="text-xs text-[#68766C] mt-1">
            {language === "mr" ? "शेत:" : "Generated for:"} <b>{d.sahyadriFarm} (Plot 1: 2.5 Acres Soybean)</b> &bull; Valid: Oct 30 - Nov 20, 2026
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl border border-[#E5EBE5] text-[#25352C] hover:bg-[#F5F7F3] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-[#68766C]" />
            {d.printPlan}
          </button>
          <button
            onClick={onBackToSim}
            className="px-4 py-2 rounded-xl bg-[#087A4B] hover:bg-[#06633D] text-white text-xs font-bold transition-all shadow-sm"
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
            <span className="text-[10px] text-[#087A4B] font-semibold">47,500 L Kept in Reserve</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5EBE5] flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#FFF7E8] text-[#E6A23C] flex items-center justify-center shrink-0">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-[#68766C] block font-medium">{d.estimatedCost}</span>
            <span className="text-base font-bold text-[#A86B12] block">₹21,500</span>
            <span className="text-[10px] text-[#087A4B] font-semibold">₹16,500 Budget Left</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5EBE5] flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#DDF3E6] text-[#087A4B] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-[#68766C] block font-medium">{d.expectedOutcome}</span>
            <span className="text-base font-bold text-[#25352C] block">{d.zeroPodRisk}</span>
            <span className="text-[10px] text-[#68766C]">Yield Protected Under Stress</span>
          </div>
        </div>
      </div>

      {/* Sequential Action Schedule */}
      <div className="rounded-3xl bg-white border border-[#E5EBE5] p-6 space-y-4 shadow-sm">
        <h3 className="font-bold text-base text-[#25352C] flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#087A4B]" />
          {d.timelineTitle}
        </h3>

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

              <div className="text-right shrink-0 pl-10 sm:pl-0">
                <span className="text-xs text-[#2878D0] font-mono font-bold block">{s.waterLitres}</span>
                <span className="text-[10px] uppercase font-bold text-[#073B2A] bg-[#DDF3E6] px-2.5 py-0.5 rounded-full border border-[#087A4B]/20 inline-block mt-1">
                  {s.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
