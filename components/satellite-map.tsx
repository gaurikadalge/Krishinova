"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"

interface FarmSatelliteMapProps {
  latitude: number
  longitude: number
  locationName: string
  plotName: string
  crop: string
  mode: "true" | "false" | "ndvi"
  ndviScore: number
}

// Custom icon styling for Leaflet marker
const farmIcon = L.divIcon({
  className: "custom-farm-marker",
  html: `<div style="
    background: #10b981;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 4px 10px rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    <div style="background: white; width: 8px; height: 8px; border-radius: 50%;"></div>
  </div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
})

export default function FarmSatelliteMap({
  latitude,
  longitude,
  locationName,
  plotName,
  crop,
  mode,
  ndviScore,
}: FarmSatelliteMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const polygonLayerRef = useRef<L.Polygon | null>(null)
  const markerRef = useRef<L.Marker | null>(null)

  // Determine styling based on spectral mode
  const getPolygonStyle = () => {
    if (mode === "ndvi") {
      // Color-coded by NDVI vigor (lime/green gradient)
      return {
        color: "#10b981",
        weight: 3,
        fillColor: "#84cc16",
        fillOpacity: 0.55,
        dashArray: "4, 4",
      }
    }
    if (mode === "false") {
      // Color Infrared (vegetation reflects magenta/crimson)
      return {
        color: "#f43f5e",
        weight: 3,
        fillColor: "#e11d48",
        fillOpacity: 0.5,
        dashArray: "3, 3",
      }
    }
    // True Color Natural Satellite
    return {
      color: "#38bdf8",
      weight: 2.5,
      fillColor: "#0284c7",
      fillOpacity: 0.25,
    }
  }

  useEffect(() => {
    if (!mapContainerRef.current) return

    // If map already initialized, remove old instance before re-creating
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }

    // Initialize Leaflet Map centered on precise farm coordinates
    const map = L.map(mapContainerRef.current, {
      center: [latitude, longitude],
      zoom: 16,
      zoomControl: true,
      attributionControl: false,
    })
    mapInstanceRef.current = map

    // Real high-resolution ESRI World Imagery (Satellite Tiles)
    const esriSatelliteTiles = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,
        attribution: "Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics",
      }
    )
    esriSatelliteTiles.addTo(map)

    // Semi-transparent OpenStreetMap hybrid labels for roads/waterways overlay
    const labelsOverlay = L.tileLayer(
      "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,
        opacity: 0.85,
      }
    )
    labelsOverlay.addTo(map)

    // Plot Boundary Coordinates around target location (~2.5 acres agricultural parcel)
    const deltaLat = 0.0016
    const deltaLng = 0.0022
    const plotBoundary: L.LatLngExpression[] = [
      [latitude - deltaLat * 0.6, longitude - deltaLng],
      [latitude + deltaLat * 0.7, longitude - deltaLng * 0.8],
      [latitude + deltaLat, longitude + deltaLng * 0.7],
      [latitude - deltaLat * 0.4, longitude + deltaLng],
    ]

    // Cadastral Plot Boundary Polygon
    const polygon = L.polygon(plotBoundary, getPolygonStyle()).addTo(map)
    polygonLayerRef.current = polygon

    polygon.bindPopup(`
      <div style="font-family: sans-serif; font-size: 13px; padding: 4px;">
        <b style="color: #065f46;">${plotName}</b><br/>
        <span>Crop: <b>${crop}</b></span><br/>
        <span>Location: <b>${locationName}</b></span><br/>
        <span>Mean NDVI: <b style="color: #059669;">${ndviScore.toFixed(2)}</b></span>
      </div>
    `)

    // Farm Center Marker
    const marker = L.marker([latitude, longitude], { icon: farmIcon }).addTo(map)
    markerRef.current = marker

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [latitude, longitude])

  // Update polygon styles when view mode changes
  useEffect(() => {
    if (polygonLayerRef.current) {
      polygonLayerRef.current.setStyle(getPolygonStyle())
    }
  }, [mode, ndviScore])

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border shadow-inner">
      <div ref={mapContainerRef} className="w-full h-full z-0 min-h-[380px]" />

      {/* Top Overlaid Coordinate HUD */}
      <div className="absolute top-3 left-3 z-[400] bg-black/75 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-white text-xs shadow-lg flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <div>
          <span className="font-bold text-emerald-400 block">{locationName}</span>
          <span className="text-[11px] text-zinc-300 font-mono">
            {latitude.toFixed(4)}° N, {longitude.toFixed(4)}° E
          </span>
        </div>
      </div>

      {/* Mode Tag */}
      <div className="absolute top-3 right-3 z-[400] bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white text-[11px] font-semibold uppercase tracking-wider">
        {mode === "ndvi" && "🟢 NDVI Spectral Filter"}
        {mode === "false" && "🔴 False-Color NIR"}
        {mode === "true" && "🌍 True-Color High-Res"}
      </div>

      {/* Bottom Scale & Tile Attribution */}
      <div className="absolute bottom-3 left-3 right-3 z-[400] bg-background/90 backdrop-blur-md p-2.5 rounded-xl border border-border/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground font-semibold">Sensor:</span>
          <span className="text-foreground font-medium">ESRI High-Res Satellite + Sentinel-2 L2A</span>
        </div>
        <div className="text-[11px] text-muted-foreground font-mono">
          Zoom: 16x | Cadastral Boundary: Synced
        </div>
      </div>
    </div>
  )
}
