from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class SpectralIndices(BaseModel):
    mean_ndvi: float = Field(ge=-1.0, le=1.0, description="Normalized Difference Vegetation Index (B8-B4)/(B8+B4)")
    min_ndvi: float = Field(ge=-1.0, le=1.0)
    max_ndvi: float = Field(ge=-1.0, le=1.0)
    mean_ndmi: float = Field(ge=-1.0, le=1.0, description="Normalized Difference Moisture Index (B8-B11)/(B8+B11)")
    vegetation_vigor: str = Field(description="Low / Moderate / High / Dense")
    moisture_status: str = Field(description="Moisture Deficit / Adequate / Saturated")

class SatelliteScene(BaseModel):
    scene_id: str
    satellite: str = "Sentinel-2 L2A"
    provider: str = "Copernicus Data Space Ecosystem (Sentinel Hub)"
    acquisition_date: str
    cloud_cover_pct: float = Field(ge=0.0, le=100.0)
    resolution_meters: int = 10
    true_color_url: str
    false_color_url: Optional[str] = None
    ndvi_map_url: Optional[str] = None
    bounds: List[List[float]] = []  # [[lat_min, lng_min], [lat_max, lng_max]]

class PlotSatelliteAnalysis(BaseModel):
    plot_id: str
    plot_name: str
    crop: str
    latest_scene: SatelliteScene
    indices: SpectralIndices
    anomalies_detected: List[str] = []
    historical_ndvi_trend: List[Dict[str, Any]] = []
    integration_notes: str

class FarmSatelliteSummary(BaseModel):
    farm_id: str
    farm_name: str
    last_updated: str
    overall_health: str
    latest_acquisition_date: str
    cloud_cover_pct: float
    plots_analysis: List[PlotSatelliteAnalysis]
    scientific_disclaimer: str = (
        "Scientific Notice: NDVI reflects canopy greenness and chlorophyll density, "
        "not deterministic yield. NDMI reflects canopy water content, not direct root-zone moisture. "
        "Combine satellite observations with ground soil tests and weather observations before taking field actions."
    )
