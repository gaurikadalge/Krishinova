from typing import List, Optional
from pydantic import BaseModel, Field

class SoilProfile(BaseModel):
    soil_type: str = Field(default="Black Soil (Vertisol)", description="Dominant soil classification")
    ph: float = Field(default=7.2, ge=3.0, le=10.0, description="pH level")
    nitrogen: float = Field(default=180.0, ge=0.0, description="Available Nitrogen in kg/ha")
    phosphorus: float = Field(default=22.0, ge=0.0, description="Available Phosphorus in kg/ha")
    potassium: float = Field(default=240.0, ge=0.0, description="Available Potassium in kg/ha")
    organic_carbon_pct: float = Field(default=0.55, ge=0.0, le=10.0, description="Organic Carbon percentage")
    is_measured: bool = Field(default=True, description="True if based on laboratory soil test, False if estimated")

class Plot(BaseModel):
    id: str
    name: str
    area_acres: float = Field(gt=0.0, description="Plot size in acres")
    current_crop: str = Field(description="Currently cultivated crop")
    variety: Optional[str] = Field(default=None, description="Crop variety/hybrid")
    sowing_date: str = Field(description="Date of sowing (YYYY-MM-DD)")
    growth_stage: str = Field(default="mid_season", description="initial, development, mid_season, late_season")
    irrigation_method: str = Field(default="drip", description="drip, sprinkler, furrow, flood")
    soil: SoilProfile = Field(default_factory=SoilProfile)

class WaterAsset(BaseModel):
    id: str
    source_type: str = Field(description="borewell, open_well, farm_pond, canal, storage_tank")
    current_storage_liters: float = Field(ge=0.0, description="Currently available water in Liters")
    max_capacity_liters: float = Field(ge=0.0, description="Maximum holding capacity")
    daily_replenishment_liters: float = Field(default=0.0, ge=0.0, description="Estimated daily recharge/yield")

class FarmBudget(BaseModel):
    total_budget_inr: float = Field(ge=0.0, description="Total allocated seasonal budget in INR")
    spent_inr: float = Field(default=0.0, ge=0.0, description="Expenditure so far")
    remaining_inr: float = Field(ge=0.0, description="Remaining liquidity")

class Farm(BaseModel):
    id: str
    name: str
    farmer_name: str
    phone: Optional[str] = None
    state: str = "Maharashtra"
    district: str = "Pune"
    taluka: str = "Baramati"
    village: str = "Malegaon"
    latitude: float = 18.1500
    longitude: float = 74.5800
    total_area_acres: float = Field(gt=0.0)
    plots: List[Plot] = []
    water_assets: List[WaterAsset] = []
    budget: FarmBudget
    last_updated: str
