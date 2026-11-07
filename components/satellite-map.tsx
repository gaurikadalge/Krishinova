"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import L from "leaflet"
import {
  PenTool,
  Move,
  RotateCcw,
  Check,
  MapPin,
  Crosshair,
  Layers,
  Save,
  Maximize2,
  Trash2,
  Undo2,
  CheckCircle2,
} from "lucide-react"

interface FarmSatelliteMapProps {
  latitude: number
  longitude: number
  locationName: string
  plotName: string
  crop: string
  mode: "true" | "false" | "ndvi"
  ndviScore: number
  onPolygonChange?: (coords: [number, number][], areaAcres: number) => void
}

// Marker icon for farm center
const farmIcon = L.divIcon({
  className: "custom-farm-marker",
  html: `<div style="
    background: #087A4B;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    <div style="background: white; width: 8px; height: 8px; border-radius: 50%;"></div>
  </div>`,
  iconSize: [26, 26],
  iconAnchor: [13, 13],
})

// Draggable corner handle icon
const handleIcon = L.divIcon({
  className: "custom-handle-marker",
  html: `<div style="
    background: #16A36A;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.5);
    cursor: grab;
  "></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

// Drawing vertex icon
const drawingVertexIcon = L.divIcon({
  className: "custom-drawing-vertex",
  html: `<div style="
    background: #F59E0B;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 2px 6px rgba(0,0,0,0.5);
  "></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

/**
 * Calculates geodesic area in acres from an array of [lat, lng] vertices.
 */
function calculatePolygonAreaAcres(coords: [number, number][]): number {
  if (coords.length < 3) return 0
  const R = 6378137 // Earth radius in meters
  let area = 0
  const len = coords.length

  for (let i = 0; i < len; i++) {
    const p1 = coords[i]
    const p2 = coords[(i + 1) % len]

    const lat1 = (p1[0] * Math.PI) / 180
    const lat2 = (p2[0] * Math.PI) / 180
    const dLng = ((p2[1] - p1[1]) * Math.PI) / 180

    area += dLng * (2 + Math.sin(lat1) + Math.sin(lat2))
  }

  area = Math.abs((area * R * R) / 4)
  const acres = area * 0.000247105
  return Math.round(acres * 100) / 100
}

export default function FarmSatelliteMap({
  latitude,
  longitude,
  locationName,
  plotName,
  crop,
  mode,
  ndviScore,
  onPolygonChange,
}: FarmSatelliteMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const polygonLayerRef = useRef<L.Polygon | null>(null)
  const handleGroupRef = useRef<L.LayerGroup | null>(null)
  const drawingLayerGroupRef = useRef<L.LayerGroup | null>(null)
  const centerMarkerRef = useRef<L.Marker | null>(null)

  // Interactive Tools: "view" | "drag" | "draw" | "relocate"
  const [toolMode, setToolMode] = useState<"view" | "drag" | "draw" | "relocate">("view")
  const [polygonCoords, setPolygonCoords] = useState<[number, number][]>([])
  const [drawingPoints, setDrawingPoints] = useState<[number, number][]>([])
  const [areaAcres, setAreaAcres] = useState<number>(2.5)
  const [isCustom, setIsCustom] = useState(false)
  const [saveToast, setSaveToast] = useState<string | null>(null)

  // Storage key based on coordinate pair
  const storageKey = `krishinova_polygon_${latitude.toFixed(3)}_${longitude.toFixed(3)}`

  // Compute default farm boundary around center
  const getDefaultBoundary = useCallback((): [number, number][] => {
    const deltaLat = 0.0016
    const deltaLng = 0.0022
    return [
      [latitude - deltaLat * 0.6, longitude - deltaLng],
      [latitude + deltaLat * 0.7, longitude - deltaLng * 0.8],
      [latitude + deltaLat, longitude + deltaLng * 0.7],
      [latitude - deltaLat * 0.4, longitude + deltaLng],
    ]
  }, [latitude, longitude])

  // Polygon styling per spectral mode
  const getPolygonStyle = useCallback(() => {
    if (mode === "ndvi") {
      return {
        color: "#16A36A",
        weight: 3,
        fillColor: "#22c55e",
        fillOpacity: 0.55,
        dashArray: "4, 4",
      }
    }
    if (mode === "false") {
      return {
        color: "#e11d48",
        weight: 3,
        fillColor: "#f43f5e",
        fillOpacity: 0.5,
        dashArray: "3, 3",
      }
    }
    // True Color Natural Satellite
    return {
      color: "#0284c7",
      weight: 2.5,
      fillColor: "#38bdf8",
      fillOpacity: 0.25,
    }
  }, [mode])

  // Initialize coordinates from localStorage or default
  useEffect(() => {
    let initialCoords: [number, number][] = []
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        initialCoords = JSON.parse(saved)
        setIsCustom(true)
      }
    } catch {
      // ignore
    }

    if (!initialCoords || initialCoords.length < 3) {
      initialCoords = getDefaultBoundary()
      setIsCustom(false)
    }

    setPolygonCoords(initialCoords)
    const initialArea = calculatePolygonAreaAcres(initialCoords)
    setAreaAcres(initialArea)
    if (onPolygonChange) onPolygonChange(initialCoords, initialArea)
    setToolMode("view")
    setDrawingPoints([])
  }, [latitude, longitude, storageKey, getDefaultBoundary, onPolygonChange])

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }

    const map = L.map(mapContainerRef.current, {
      center: [latitude, longitude],
      zoom: 16,
      zoomControl: true,
      attributionControl: false,
      doubleClickZoom: false, // Prevent zoom interfering with manual polygon drawing
    })
    mapInstanceRef.current = map

    // Real high-resolution ESRI World Imagery (Satellite Tiles)
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,
        attribution: "Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics",
      }
    ).addTo(map)

    // Semi-transparent OpenStreetMap hybrid labels for roads/waterways overlay
    L.tileLayer(
      "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,
        opacity: 0.85,
      }
    ).addTo(map)

    // Layer groups for handles and drawing preview
    const handleGroup = L.layerGroup().addTo(map)
    handleGroupRef.current = handleGroup

    const drawingLayerGroup = L.layerGroup().addTo(map)
    drawingLayerGroupRef.current = drawingLayerGroup

    // Center Marker
    const centerMarker = L.marker([latitude, longitude], { icon: farmIcon }).addTo(map)
    centerMarkerRef.current = centerMarker

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [latitude, longitude])

  // Update Polygon on map when polygonCoords change
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map || polygonCoords.length < 3) return

    if (polygonLayerRef.current) {
      polygonLayerRef.current.remove()
    }

    const polygon = L.polygon(polygonCoords, getPolygonStyle()).addTo(map)
    polygonLayerRef.current = polygon

    polygon.bindPopup(`
      <div style="font-family: sans-serif; font-size: 13px; padding: 4px;">
        <b style="color: #073B2A;">${plotName}</b><br/>
        <span>Crop: <b>${crop}</b></span><br/>
        <span>Location: <b>${locationName}</b></span><br/>
        <span>Field Area: <b>${areaAcres} Acres</b></span><br/>
        <span>Mean NDVI: <b style="color: #16A36A;">${ndviScore.toFixed(2)}</b></span>
      </div>
    `)

    // Compute center and update center marker
    const avgLat = polygonCoords.reduce((acc, c) => acc + c[0], 0) / polygonCoords.length
    const avgLng = polygonCoords.reduce((acc, c) => acc + c[1], 0) / polygonCoords.length
    if (centerMarkerRef.current) {
      centerMarkerRef.current.setLatLng([avgLat, avgLng])
    }
  }, [polygonCoords, getPolygonStyle, plotName, crop, locationName, areaAcres, ndviScore])

  // Handle Drag Handles Mode
  useEffect(() => {
    const handleGroup = handleGroupRef.current
    if (!handleGroup) return

    handleGroup.clearLayers()

    if (toolMode === "drag" && polygonCoords.length >= 3) {
      polygonCoords.forEach((coord, idx) => {
        const handle = L.marker(coord, {
          icon: handleIcon,
          draggable: true,
        })

        handle.on("drag", (e: any) => {
          const newLatLng = e.target.getLatLng()
          setPolygonCoords((prev) => {
            const updated = [...prev]
            updated[idx] = [newLatLng.lat, newLatLng.lng]
            const newArea = calculatePolygonAreaAcres(updated)
            setAreaAcres(newArea)
            setIsCustom(true)
            if (onPolygonChange) onPolygonChange(updated, newArea)
            return updated
          })
        })

        handle.addTo(handleGroup)
      })
    }
  }, [toolMode, polygonCoords, onPolygonChange])

  // Handle Drawing Mode and Relocate Mode via Map Click Events
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const clickPoint: [number, number] = [e.latlng.lat, e.latlng.lng]

      if (toolMode === "draw") {
        setDrawingPoints((prev) => [...prev, clickPoint])
      } else if (toolMode === "relocate") {
        // Relocate entire polygon center to clicked point
        if (polygonCoords.length >= 3) {
          const avgLat = polygonCoords.reduce((acc, c) => acc + c[0], 0) / polygonCoords.length
          const avgLng = polygonCoords.reduce((acc, c) => acc + c[1], 0) / polygonCoords.length
          const dLat = clickPoint[0] - avgLat
          const dLng = clickPoint[1] - avgLng

          const relocated = polygonCoords.map(([lat, lng]): [number, number] => [lat + dLat, lng + dLng])
          setPolygonCoords(relocated)
          setIsCustom(true)
          if (onPolygonChange) onPolygonChange(relocated, areaAcres)
          setToolMode("view")
          setSaveToast("Polygon relocated to selected field")
          setTimeout(() => setSaveToast(null), 3500)
        }
      }
    }

    map.on("click", handleMapClick)
    return () => {
      map.off("click", handleMapClick)
    }
  }, [toolMode, polygonCoords, areaAcres, onPolygonChange])

  // Update Drawing Preview Layer
  useEffect(() => {
    const drawingGroup = drawingLayerGroupRef.current
    if (!drawingGroup) return

    drawingGroup.clearLayers()

    if (toolMode === "draw" && drawingPoints.length > 0) {
      drawingPoints.forEach((pt) => {
        L.marker(pt, { icon: drawingVertexIcon }).addTo(drawingGroup)
      })

      if (drawingPoints.length >= 2) {
        L.polyline(drawingPoints, {
          color: "#F59E0B",
          weight: 3,
          dashArray: "4, 4",
        }).addTo(drawingGroup)
      }

      if (drawingPoints.length >= 3) {
        L.polygon(drawingPoints, {
          color: "#F59E0B",
          fillColor: "#FBBF24",
          fillOpacity: 0.35,
          weight: 2,
        }).addTo(drawingGroup)
      }
    }
  }, [toolMode, drawingPoints])

  // Actions
  const handleFinishDrawing = () => {
    if (drawingPoints.length < 3) return
    setPolygonCoords(drawingPoints)
    const newArea = calculatePolygonAreaAcres(drawingPoints)
    setAreaAcres(newArea)
    setIsCustom(true)
    if (onPolygonChange) onPolygonChange(drawingPoints, newArea)
    setDrawingPoints([])
    setToolMode("drag") // Let them fine-tune corners immediately
    try {
      localStorage.setItem(storageKey, JSON.stringify(drawingPoints))
    } catch {
      // ignore
    }
    setSaveToast(`Custom boundary created (${newArea} Acres)`)
    setTimeout(() => setSaveToast(null), 4000)
  }

  const handleCancelDrawing = () => {
    setDrawingPoints([])
    setToolMode("view")
  }

  const handleUndoPoint = () => {
    setDrawingPoints((prev) => prev.slice(0, -1))
  }

  const handleSavePolygon = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(polygonCoords))
      setIsCustom(true)
      setSaveToast("Field boundary saved to Digital Twin")
      setToolMode("view")
      setTimeout(() => setSaveToast(null), 4000)
    } catch {
      setSaveToast("Could not save to local storage")
    }
  }

  const handleResetToDefault = () => {
    try {
      localStorage.removeItem(storageKey)
    } catch {
      // ignore
    }
    const def = getDefaultBoundary()
    setPolygonCoords(def)
    const defArea = calculatePolygonAreaAcres(def)
    setAreaAcres(defArea)
    setIsCustom(false)
    setToolMode("view")
    setDrawingPoints([])
    if (onPolygonChange) onPolygonChange(def, defArea)
    setSaveToast("Reset to default cadastral parcel")
    setTimeout(() => setSaveToast(null), 3000)
  }

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#E5EBE5] shadow-inner select-none">
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0 min-h-[380px]" />

      {/* Top Overlaid Coordinate HUD */}
      <div className="absolute top-3 left-3 z-[450] bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-white text-xs shadow-lg flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <div>
          <span className="font-bold text-emerald-400 block">{locationName}</span>
          <span className="text-[11px] text-zinc-300 font-mono">
            {latitude.toFixed(4)}° N, {longitude.toFixed(4)}° E
          </span>
        </div>
      </div>

      {/* Mode Tag */}
      <div className="absolute top-3 right-3 z-[450] bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5">
        <span
          className={`w-2 h-2 rounded-full ${
            mode === "ndvi" ? "bg-emerald-400" : mode === "false" ? "bg-rose-400" : "bg-sky-400"
          } animate-pulse`}
        />
        {mode === "ndvi" && "NDVI Spectral Filter"}
        {mode === "false" && "Color Infrared NIR"}
        {mode === "true" && "Natural Color High-Res"}
      </div>

      {/* COMPACT SLEEK GIS FLOATING DOCK (Positioned bottom-right above HUD so field is unobstructed) */}
      <div className="absolute bottom-16 right-3 z-[450] flex flex-wrap items-center gap-1 bg-black/75 hover:bg-black/90 backdrop-blur-md p-1 rounded-2xl border border-white/20 shadow-2xl text-white text-xs transition-all">
        <button
          onClick={() => {
            setToolMode("view")
            setDrawingPoints([])
          }}
          className={`px-2.5 py-1 rounded-xl font-semibold flex items-center gap-1.5 transition-all ${
            toolMode === "view"
              ? "bg-[#087A4B] text-white shadow-xs font-bold"
              : "text-zinc-300 hover:text-white hover:bg-white/10"
          }`}
          title="View Current Parcel"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Cadastral</span>
        </button>

        <button
          onClick={() => {
            setToolMode("drag")
            setDrawingPoints([])
          }}
          className={`px-2.5 py-1 rounded-xl font-semibold flex items-center gap-1.5 transition-all ${
            toolMode === "drag"
              ? "bg-[#087A4B] text-white shadow-xs font-bold"
              : "text-zinc-300 hover:text-white hover:bg-white/10"
          }`}
          title="Drag polygon corners directly on map"
        >
          <Move className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Adjust</span>
        </button>

        <button
          onClick={() => {
            setToolMode("draw")
            setDrawingPoints([])
          }}
          className={`px-2.5 py-1 rounded-xl font-semibold flex items-center gap-1.5 transition-all ${
            toolMode === "draw"
              ? "bg-[#F59E0B] text-black shadow-xs font-bold"
              : "text-zinc-300 hover:text-white hover:bg-white/10"
          }`}
          title="Click on green field to draw custom polygon"
        >
          <PenTool className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Draw</span>
        </button>

        <button
          onClick={() => {
            setToolMode("relocate")
            setDrawingPoints([])
          }}
          className={`px-2.5 py-1 rounded-xl font-semibold flex items-center gap-1.5 transition-all ${
            toolMode === "relocate"
              ? "bg-[#38BDF8] text-black shadow-xs font-bold"
              : "text-zinc-300 hover:text-white hover:bg-white/10"
          }`}
          title="Click on map to move polygon center"
        >
          <Crosshair className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Relocate</span>
        </button>

        {/* Action icons */}
        <div className="flex items-center gap-1 border-l border-white/20 pl-1">
          {isCustom && toolMode !== "draw" && (
            <button
              onClick={handleSavePolygon}
              className="p-1 rounded-lg bg-white/15 hover:bg-[#087A4B] text-white transition-colors"
              title="Save Boundary"
            >
              <Save className="w-3 h-3" />
            </button>
          )}

          {isCustom && (
            <button
              onClick={handleResetToDefault}
              className="p-1 rounded-lg bg-white/15 hover:bg-red-500/80 text-white transition-colors"
              title="Reset to Default"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* DRAWING MODE CONTROLS OVERLAY */}
      {toolMode === "draw" && (
        <div className="absolute top-28 left-3 z-[450] bg-black/90 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-amber-400/40 text-white text-xs shadow-xl space-y-2 max-w-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="font-bold text-amber-300">Click Field to Add Corners</span>
          </div>
          <p className="text-[11px] text-zinc-300 leading-tight">
            Click points directly on the green farm parcel to trace the plot boundary.
          </p>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-zinc-400 font-mono font-bold">
              {drawingPoints.length} Point{drawingPoints.length === 1 ? "" : "s"} Placed
            </span>

            <div className="flex items-center gap-1.5">
              {drawingPoints.length > 0 && (
                <button
                  onClick={handleUndoPoint}
                  className="px-2 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[10px] font-bold"
                >
                  <Undo2 className="w-3 h-3 inline mr-0.5" /> Undo
                </button>
              )}

              <button
                onClick={handleCancelDrawing}
                className="px-2 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-zinc-300 text-[10px] font-bold"
              >
                Cancel
              </button>

              <button
                onClick={handleFinishDrawing}
                disabled={drawingPoints.length < 3}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  drawingPoints.length >= 3
                    ? "bg-[#087A4B] text-white hover:bg-[#073B2A] shadow-sm cursor-pointer"
                    : "bg-white/10 text-zinc-500 cursor-not-allowed"
                }`}
              >
                <Check className="w-3 h-3 inline mr-0.5" /> Complete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RELOCATE MODE HELPER OVERLAY */}
      {toolMode === "relocate" && (
        <div className="absolute top-28 left-3 z-[450] bg-black/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-sky-400/40 text-white text-xs shadow-xl flex items-center gap-2.5 animate-in fade-in duration-200">
          <Crosshair className="w-4 h-4 text-sky-400 animate-spin" />
          <div>
            <span className="font-bold text-sky-300 block">Click on Farm Field</span>
            <span className="text-[10px] text-zinc-300">Click anywhere on satellite imagery to shift the farm polygon there.</span>
          </div>
          <button
            onClick={() => setToolMode("view")}
            className="ml-2 px-2 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-zinc-300 text-[10px] font-bold"
          >
            Cancel
          </button>
        </div>
      )}

      {/* DRAG CORNERS HELPER OVERLAY */}
      {toolMode === "drag" && (
        <div className="absolute top-28 left-3 z-[450] bg-black/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-emerald-400/40 text-white text-xs shadow-xl flex items-center gap-2.5 animate-in fade-in duration-200">
          <Move className="w-4 h-4 text-emerald-400" />
          <div>
            <span className="font-bold text-emerald-300 block">Drag Green Handles</span>
            <span className="text-[10px] text-zinc-300">Grab and drag corner handles to align with the agricultural field edges.</span>
          </div>
          <button
            onClick={handleSavePolygon}
            className="ml-2 px-2.5 py-1 rounded-lg bg-[#087A4B] hover:bg-[#073B2A] text-white text-[10px] font-bold flex items-center gap-1"
          >
            <Check className="w-3 h-3" /> Done
          </button>
        </div>
      )}

      {/* FLOATING TOAST NOTIFICATION */}
      {saveToast && (
        <div className="absolute top-28 right-3 z-[450] bg-[#073B2A] text-white px-3.5 py-2 rounded-2xl border border-[#16A36A] text-xs shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{saveToast}</span>
        </div>
      )}

      {/* BOTTOM METRICS & SCALE BAR */}
      <div className="absolute bottom-3 left-3 right-3 z-[400] bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-[#E5EBE5] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[#68766C] font-semibold">Sensor:</span>
          <span className="text-[#25352C] font-medium">ESRI High-Res Satellite + Sentinel-2 L2A</span>
          {isCustom && (
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-300">
              Custom Polygon Active
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span className="text-[#087A4B] font-bold">
            Area: {areaAcres.toFixed(2)} Acres ({polygonCoords.length} Corners)
          </span>
          <span className="text-[#68766C]">
            Cadastral Boundary: Synced
          </span>
        </div>
      </div>
    </div>
  )
}
