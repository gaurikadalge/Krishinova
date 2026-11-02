"use client"

import { useState } from "react"
import {
  X,
  MapPin,
  Layers,
  Sprout,
  CheckCircle2,
  Navigation,
  Crosshair,
} from "lucide-react"

interface PlotRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  onPlotAdded: (plot: any) => void
}

export default function PlotRegistrationModal({
  isOpen,
  onClose,
  onPlotAdded,
}: PlotRegistrationModalProps) {
  const [detectingLocation, setDetectingLocation] = useState(false)

  const [formData, setFormData] = useState({
    plotName: "East Field - Kharif Block",
    village: "Malegaon Khurd",
    taluka: "Baramati",
    district: "Pune",
    state: "Maharashtra",
    latitude: 18.1512,
    longitude: 74.5824,
    areaAcres: 3.0,
    crop: "Soybean",
    variety: "JS 335",
    sowingDate: "2026-07-01",
    growthStage: "development",
    irrigationMethod: "drip",
    soilType: "Black Vertisol",
  })

  if (!isOpen) return null

  const handleDetectLocation = () => {
    setDetectingLocation(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: Number(position.coords.latitude.toFixed(4)),
            longitude: Number(position.coords.longitude.toFixed(4)),
          }))
          setDetectingLocation(false)
        },
        () => {
          setFormData((prev) => ({
            ...prev,
            latitude: 18.1528,
            longitude: 74.5841,
          }))
          setDetectingLocation(false)
        },
        { timeout: 5000 }
      )
    } else {
      setDetectingLocation(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPlot = {
      id: `plot-${Date.now()}`,
      name: formData.plotName,
      area_acres: Number(formData.areaAcres),
      current_crop: formData.crop,
      variety: formData.variety,
      sowing_date: formData.sowingDate,
      growth_stage: formData.growthStage,
      irrigation_method: formData.irrigationMethod,
      soil: {
        soil_type: formData.soilType,
        ph: 7.2,
        nitrogen: 180,
        phosphorus: 22,
        potassium: 240,
        is_measured: true,
      },
      coordinates: {
        latitude: formData.latitude,
        longitude: formData.longitude,
      },
    }
    onPlotAdded(newPlot)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-[#E5EBE5] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5EBE5] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#DDF3E6] text-[#073B2A] flex items-center justify-center">
              <Layers className="w-5 h-5 text-[#087A4B]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#25352C] font-heading">Register / Detect New Farm Plot</h3>
              <p className="text-xs text-[#68766C]">
                Connects field boundaries with Sentinel-2 passes & Digital Twin
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5F7F3] text-[#68766C] hover:text-[#25352C] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* STEP 1: LOCATION & AREA DETECTION */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#087A4B] flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                1. Field Location & GPS Coordinates
              </label>
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={detectingLocation}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDF3E6] hover:bg-[#cbeed8] text-[#073B2A] text-xs font-bold transition-colors"
              >
                <Crosshair className={`w-3.5 h-3.5 ${detectingLocation ? "animate-spin" : ""}`} />
                {detectingLocation ? "Detecting GPS..." : "Auto-Detect My Farm GPS"}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-[#68766C] block mb-1 font-medium">Plot Name</span>
                <input
                  type="text"
                  value={formData.plotName}
                  onChange={(e) => setFormData({ ...formData, plotName: e.target.value })}
                  className="w-full bg-[#F5F7F3] border border-[#E5EBE5] rounded-xl px-3 py-2 text-[#25352C] text-xs focus:border-[#087A4B] focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <span className="text-[#68766C] block mb-1 font-medium">Area (Acres)</span>
                <input
                  type="number"
                  step="0.1"
                  value={formData.areaAcres}
                  onChange={(e) => setFormData({ ...formData, areaAcres: Number(e.target.value) })}
                  className="w-full bg-[#F5F7F3] border border-[#E5EBE5] rounded-xl px-3 py-2 text-[#087A4B] text-xs font-bold focus:border-[#087A4B] focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <span className="text-[#68766C] block mb-1 font-medium">Latitude</span>
                <input
                  type="number"
                  step="0.0001"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: Number(e.target.value) })}
                  className="w-full bg-[#F5F7F3] border border-[#E5EBE5] rounded-xl px-3 py-2 text-[#25352C] text-xs font-mono"
                  required
                />
              </div>

              <div>
                <span className="text-[#68766C] block mb-1 font-medium">Longitude</span>
                <input
                  type="number"
                  step="0.0001"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: Number(e.target.value) })}
                  className="w-full bg-[#F5F7F3] border border-[#E5EBE5] rounded-xl px-3 py-2 text-[#25352C] text-xs font-mono"
                  required
                />
              </div>
            </div>

            <div className="p-3 bg-[#F5F7F3] rounded-xl border border-[#E5EBE5] flex items-center justify-between text-xs text-[#25352C]">
              <span className="flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#087A4B]" />
                Village: <b>{formData.village}</b>, Taluka: <b>{formData.taluka}</b> (Dist. <b>{formData.district}</b>)
              </span>
              <span className="text-[11px] text-[#087A4B] font-bold">Maharashtra Pilot Region</span>
            </div>
          </div>

          {/* STEP 2: CROP & SOIL DETAILS */}
          <div className="space-y-3 pt-3 border-t border-[#E5EBE5]">
            <label className="text-xs font-bold uppercase tracking-wider text-[#087A4B] flex items-center gap-1.5">
              <Sprout className="w-4 h-4" />
              2. Cultivated Crop & Agricultural Details
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-[#68766C] block mb-1 font-medium">Crop Type</span>
                <select
                  value={formData.crop}
                  onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                  className="w-full bg-[#F5F7F3] border border-[#E5EBE5] rounded-xl px-3 py-2 text-[#25352C] text-xs focus:border-[#087A4B] focus:bg-white focus:outline-none"
                >
                  <option value="Soybean">Soybean (सोयाबीन)</option>
                  <option value="Onion">Onion (कांदा)</option>
                  <option value="Wheat">Wheat (गहू)</option>
                  <option value="Cotton">Cotton (कापूस)</option>
                  <option value="Sugarcane">Sugarcane (ऊस)</option>
                </select>
              </div>

              <div>
                <span className="text-[#68766C] block mb-1 font-medium">Variety / Hybrid</span>
                <input
                  type="text"
                  value={formData.variety}
                  onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                  className="w-full bg-[#F5F7F3] border border-[#E5EBE5] rounded-xl px-3 py-2 text-[#25352C] text-xs focus:border-[#087A4B] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <span className="text-[#68766C] block mb-1 font-medium">Growth Stage</span>
                <select
                  value={formData.growthStage}
                  onChange={(e) => setFormData({ ...formData, growthStage: e.target.value })}
                  className="w-full bg-[#F5F7F3] border border-[#E5EBE5] rounded-xl px-3 py-2 text-[#25352C] text-xs capitalize"
                >
                  <option value="initial">Initial Sowing (0-20 days)</option>
                  <option value="development">Vegetative Development</option>
                  <option value="mid_season">Mid-Season (Flowering/Reproductive)</option>
                  <option value="late_season">Late Season / Maturation</option>
                </select>
              </div>

              <div>
                <span className="text-[#68766C] block mb-1 font-medium">Sowing Date</span>
                <input
                  type="date"
                  value={formData.sowingDate}
                  onChange={(e) => setFormData({ ...formData, sowingDate: e.target.value })}
                  className="w-full bg-[#F5F7F3] border border-[#E5EBE5] rounded-xl px-3 py-2 text-[#25352C] text-xs"
                />
              </div>

              <div>
                <span className="text-[#68766C] block mb-1 font-medium">Irrigation Method</span>
                <select
                  value={formData.irrigationMethod}
                  onChange={(e) => setFormData({ ...formData, irrigationMethod: e.target.value })}
                  className="w-full bg-[#F5F7F3] border border-[#E5EBE5] rounded-xl px-3 py-2 text-[#25352C] text-xs capitalize"
                >
                  <option value="drip">Drip Irrigation (ठिबक)</option>
                  <option value="sprinkler">Sprinkler (तुषार)</option>
                  <option value="furrow">Furrow / Flood (पाटपाणी)</option>
                </select>
              </div>

              <div>
                <span className="text-[#68766C] block mb-1 font-medium">Soil Classification</span>
                <select
                  value={formData.soilType}
                  onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                  className="w-full bg-[#F5F7F3] border border-[#E5EBE5] rounded-xl px-3 py-2 text-[#25352C] text-xs"
                >
                  <option value="Black Vertisol">Medium Deep Black (Vertisol)</option>
                  <option value="Clay Loam">Clay Loam (चिकणमाती)</option>
                  <option value="Sandy Loam">Sandy Loam (वाळूमिश्रित)</option>
                </select>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5EBE5]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#E5EBE5] text-[#68766C] hover:bg-[#F5F7F3] text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#087A4B] hover:bg-[#06633D] text-white font-bold text-xs shadow-md shadow-[#087A4B]/20 transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              Save & Sync with Digital Twin
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
