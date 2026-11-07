"use client"

import { useState } from "react"
import {
  MapPin,
  CheckCircle2,
  Droplets,
  Coins,
  Layers,
  Sprout,
  Calendar,
  Activity,
  PlusCircle,
  Eye,
  Edit3,
} from "lucide-react"
import type { Language } from "../language-context"
import { dictionary } from "../translations"

interface MyFarmViewProps {
  language: Language
  onOpenPlotModal: () => void
  onNavigateToSatellite: () => void
}

export default function MyFarmView({
  language,
  onOpenPlotModal,
  onNavigateToSatellite,
}: MyFarmViewProps) {
  const [activeTab, setActiveTab] = useState<"plots" | "assets" | "identity" | "settings">("plots")
  const d = dictionary[language] || dictionary.en

  const plots = [
    {
      id: "plot-1",
      name: d.plot1Title,
      acres: 2.5,
      crop: "Soybean",
      variety: "JS 335",
      stage: language === "mr" ? "मध्यम वाढ (शेंगा धरणे)" : language === "hi" ? "मध्यम वृद्धि (फली विकास)" : "Mid-season (Pod Formation)",
      sowingDate: "25 Jun 2026",
      irrigation: d.drip,
      soilType: language === "mr" ? "काळी कसदार माती" : language === "hi" ? "काली कपास मिट्टी" : "Medium Deep Black (Vertisol)",
      ph: 7.4,
      organicCarbon: "0.58%",
      soilMoisture: language === "mr" ? "मध्यम" : language === "hi" ? "मध्यम" : "Medium",
      aerialImg: "/crops/soybean-plot.jpg",
      ndviScore: 0.68,
      provenance: "Lab Tested (KVK Baramati)"
    },
    {
      id: "plot-2",
      name: d.plot2Title,
      acres: 2.0,
      crop: "Onion",
      variety: "Bhima Super",
      stage: language === "mr" ? "शाकीय वाढ" : language === "hi" ? "वानस्पतिक विकास" : "Development (Vegetative)",
      sowingDate: "10 Aug 2026",
      irrigation: d.sprinkler,
      soilType: language === "mr" ? "गाळाची चिकणमाती" : language === "hi" ? "दोमट मिट्टी" : "Clay Loam",
      ph: 7.1,
      organicCarbon: "0.52%",
      soilMoisture: language === "mr" ? "उच्च" : language === "hi" ? "उच्च" : "High",
      aerialImg: "/crops/onion-plot.jpg",
      ndviScore: 0.46,
      provenance: "Lab Tested (KVK Baramati)"
    },
    {
      id: "plot-3",
      name: language === "mr" ? "घर परिसर व पडीक बफर" : "Homestead & Fallow Buffer",
      acres: 0.7,
      crop: "Fallow / Agroforestry Buffer",
      variety: "Desi Neem & Grass",
      stage: language === "mr" ? "उशिराचा टप्पा" : "Late-season (Border)",
      sowingDate: "15 May 2026",
      irrigation: language === "mr" ? "पाटपाणी/बफर" : "Furrow Buffer",
      soilType: language === "mr" ? "मुरुमाड जमीन" : "Gravelly Loam",
      ph: 7.6,
      organicCarbon: "0.42%",
      soilMoisture: language === "mr" ? "कमी" : "Low",
      aerialImg: "/crops/agroforestry-buffer.jpg",
      ndviScore: 0.32,
      provenance: "Regional Assumption"
    },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* PAGE TITLE & ACTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#25352C] tracking-tight font-heading">
            {d.myFarm}
          </h1>
          <p className="text-xs sm:text-sm text-[#68766C] mt-0.5">
            {d.manageFarmSubtitle}
          </p>
        </div>
        <button
          onClick={onNavigateToSatellite}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#F5F7F3] border border-[#E5EBE5] text-[#087A4B] font-bold text-xs tracking-wide transition-all shadow-sm shrink-0"
        >
          <Eye className="w-4 h-4 text-[#087A4B]" />
          <span>{d.viewFarmOnMap}</span>
        </button>
      </div>

      {/* TOP OVERVIEW CARD */}
      <div className="rounded-3xl bg-white border border-[#E5EBE5] p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Farm Photo Banner */}
          <div className="lg:col-span-4 relative h-36 rounded-2xl overflow-hidden border border-[#E5EBE5] shadow-inner group">
            <img
              src="/crops/soybean-plot.jpg"
              alt="Farm Aerial View"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-2.5 left-3 text-white text-xs font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#16A36A] animate-pulse" />
              Live Farm Plot Parcel &bull; 5.2 Acres Total
            </div>
          </div>

          {/* Farm Identity Info */}
          <div className="lg:col-span-4 space-y-2 text-left">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-[#25352C]">{d.sahyadriFarm}</h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#DDF3E6] text-[#073B2A] border border-[#087A4B]/20">
                <CheckCircle2 className="w-3 h-3 text-[#087A4B]" />
                {d.twinSynchronized}
              </span>
            </div>

            <p className="text-xs text-[#25352C] flex items-center gap-2">
              <span className="font-semibold">{d.farmerName}</span> &bull;{" "}
              <span className="flex items-center gap-1 text-[#68766C]">
                <MapPin className="w-3 h-3 text-[#087A4B]" />
                {d.pilotLocation}, {d.pilotDistrict}
              </span>
            </p>

            <div className="pt-1 flex items-center gap-2">
              <span className="text-[11px] px-3 py-1 rounded-md bg-[#FFF7E8] text-[#A86B12] border border-[#E6A23C]/30 font-semibold inline-block">
                {d.pilotBadge}
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-[#DDF3E6] text-[#073B2A] border border-[#087A4B]/20 font-bold">
                5.2 Acres Total
              </span>
            </div>

            <p className="text-[11px] text-[#68766C]">
              📅 {d.lastTwinSynced}: <span className="text-[#25352C] font-mono font-semibold">2026-11-06 22:50:00</span>
            </p>
          </div>

          {/* KPI Gauges: Total Water & Remaining Budget */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3.5">
            {/* Water Gauge */}
            <div className="p-4 bg-[#F5F7F3] rounded-2xl border border-[#E5EBE5] text-left">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#EBF3FC] text-[#2878D0] flex items-center justify-center">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#68766C] block font-semibold">{d.totalAvailableWater}</span>
                  <span className="text-lg font-extrabold text-[#2878D0]">80,000 L</span>
                </div>
              </div>
              <div className="w-full bg-[#E5EBE5] rounded-full h-2 overflow-hidden">
                <div className="bg-[#2878D0] h-2 rounded-full w-[62%]" />
              </div>
              <span className="text-[10px] text-[#68766C] mt-1.5 block font-medium">Pond: 65K L + Borewell: 15K L</span>
            </div>

            {/* Budget Gauge */}
            <div className="p-4 bg-[#F5F7F3] rounded-2xl border border-[#E5EBE5] text-left">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#FFF7E8] text-[#E6A23C] flex items-center justify-center">
                  <Coins className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#68766C] block font-semibold">{d.remainingBudget}</span>
                  <span className="text-lg font-extrabold text-[#A86B12]">₹38,000</span>
                </div>
              </div>
              <div className="w-full bg-[#E5EBE5] rounded-full h-2 overflow-hidden">
                <div className="bg-[#E6A23C] h-2 rounded-full w-[41%]" />
              </div>
              <span className="text-[10px] text-[#68766C] mt-1.5 block font-medium">Spent: ₹22,000 / ₹60,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* HORIZONTAL SUB-NAVIGATION TABS */}
      <div className="flex border-b border-[#E5EBE5] gap-4 text-xs font-semibold overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("plots")}
          className={`flex items-center gap-2 pb-3 border-b-2 transition-all ${
            activeTab === "plots"
              ? "border-[#087A4B] text-[#073B2A] font-bold"
              : "border-transparent text-[#68766C] hover:text-[#25352C]"
          }`}
        >
          <Layers className="w-4 h-4" />
          {d.plotLedgerTab}
        </button>

        <button
          onClick={() => setActiveTab("assets")}
          className={`flex items-center gap-2 pb-3 border-b-2 transition-all ${
            activeTab === "assets"
              ? "border-[#087A4B] text-[#073B2A] font-bold"
              : "border-transparent text-[#68766C] hover:text-[#25352C]"
          }`}
        >
          <Droplets className="w-4 h-4" />
          {d.waterBudgetTab}
        </button>

        <button
          onClick={() => setActiveTab("identity")}
          className={`flex items-center gap-2 pb-3 border-b-2 transition-all ${
            activeTab === "identity"
              ? "border-[#087A4B] text-[#073B2A] font-bold"
              : "border-transparent text-[#68766C] hover:text-[#25352C]"
          }`}
        >
          <span>👤</span>
          {d.farmerIdentityTab}
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 pb-3 border-b-2 transition-all ${
            activeTab === "settings"
              ? "border-[#087A4B] text-[#073B2A] font-bold"
              : "border-transparent text-[#68766C] hover:text-[#25352C]"
          }`}
        >
          <span>⚙️</span>
          {d.settingsTab}
        </button>
      </div>

      {/* FARM PLOTS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#25352C]">{d.farmPlots}</h3>
            <p className="text-xs text-[#68766C]">{d.farmPlotsDesc}</p>
          </div>
          <button
            onClick={onOpenPlotModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#087A4B] hover:bg-[#06633D] text-white font-bold text-xs tracking-wide transition-all shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-white" />
            <span>{d.addPlot}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plots.map((plot) => (
            <div
              key={plot.id}
              className="rounded-3xl bg-white border border-[#E5EBE5] p-5 space-y-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Plot Header */}
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="text-[11px] font-bold text-[#073B2A] bg-[#DDF3E6] px-2.5 py-0.5 rounded-full border border-[#087A4B]/20">
                      {plot.id.toUpperCase()} &bull; {plot.acres} Acres
                    </span>
                    <h4 className="text-base font-bold text-[#25352C] mt-1.5">{plot.name}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#EBF3FC] text-[#2878D0] border border-[#2878D0]/20">
                      {plot.irrigation}
                    </span>
                  </div>
                </div>

                {/* Aerial Boundary Image */}
                <div className="relative h-36 rounded-2xl overflow-hidden border border-[#E5EBE5] shadow-inner group mb-3">
                  <img
                    src={plot.aerialImg}
                    alt={plot.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-3 border-2 border-dashed border-white/90 rounded-xl pointer-events-none drop-shadow-md" />
                  <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white font-mono font-bold">
                    NDVI {plot.ndviScore.toFixed(2)}
                  </div>
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded text-[9px] text-[#073B2A] font-bold">
                    {plot.provenance}
                  </div>
                </div>

                {/* Plot Agricultural Details */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#68766C]">{d.cropVariety}:</span>
                    <span className="font-bold text-[#25352C]">{plot.crop} ({plot.variety})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#68766C]">{d.growthStage}:</span>
                    <span className="font-bold text-[#087A4B]">{plot.stage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#68766C]">{d.sowingDate}:</span>
                    <span className="font-semibold text-[#25352C]">{plot.sowingDate}</span>
                  </div>
                </div>

                {/* Soil Chips */}
                <div className="grid grid-cols-4 gap-1.5 pt-3 mt-3 border-t border-[#E5EBE5] text-center text-xs">
                  <div className="p-1.5 bg-[#F5F7F3] rounded-xl border border-[#E5EBE5]">
                    <span className="text-[#68766C] block text-[9px] font-medium">{d.soilType}</span>
                    <span className="font-bold text-[#25352C] block text-[10px] truncate mt-0.5">{plot.soilType}</span>
                  </div>
                  <div className="p-1.5 bg-[#F5F7F3] rounded-xl border border-[#E5EBE5]">
                    <span className="text-[#68766C] block text-[9px] font-medium">{d.phLevel}</span>
                    <span className="font-extrabold text-[#087A4B] block text-[10px] mt-0.5">{plot.ph}</span>
                  </div>
                  <div className="p-1.5 bg-[#F5F7F3] rounded-xl border border-[#E5EBE5]">
                    <span className="text-[#68766C] block text-[9px] font-medium">{d.organicCarbon}</span>
                    <span className="font-bold text-[#25352C] block text-[10px] mt-0.5">{plot.organicCarbon}</span>
                  </div>
                  <div className="p-1.5 bg-[#F5F7F3] rounded-xl border border-[#E5EBE5]">
                    <span className="text-[#68766C] block text-[9px] font-medium">{d.soilMoisture}</span>
                    <span className="font-bold text-[#2878D0] block text-[10px] mt-0.5">{plot.soilMoisture}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E5EBE5]">
                <button
                  onClick={onNavigateToSatellite}
                  className="py-2 px-3 rounded-xl bg-[#DDF3E6] hover:bg-[#cbeed8] text-[#073B2A] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-[#087A4B]" />
                  <span>{d.viewDetails}</span>
                </button>
                <button
                  onClick={onOpenPlotModal}
                  className="py-2 px-3 rounded-xl bg-[#F5F7F3] hover:bg-[#eef3ee] text-[#25352C] font-semibold text-xs flex items-center justify-center gap-1.5 border border-[#E5EBE5] transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#68766C]" />
                  <span>{d.editPlot}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
