import os
import json
from datetime import datetime
from typing import List, Optional
from models.domain import Farm, Plot, SoilProfile, WaterAsset, FarmBudget

DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "farms.json")

def _get_pilot_farm() -> Farm:
    """Pre-seeded realistic pilot farm in Maharashtra (Baramati, Pune) per the Blueprint."""
    return Farm(
        id="farm-mh-001",
        name="Sahyadri Krishi Farm",
        farmer_name="Ganesh Kadlag",
        phone="+91 98765 43210",
        state="Maharashtra",
        district="Pune",
        taluka="Baramati",
        village="Malegaon Khurd",
        latitude=18.1512,
        longitude=74.5824,
        total_area_acres=4.5,
        budget=FarmBudget(
            total_budget_inr=60000.0,
            spent_inr=22000.0,
            remaining_inr=38000.0
        ),
        water_assets=[
            WaterAsset(
                id="wa-1",
                source_type="farm_pond",
                current_storage_liters=65000.0,
                max_capacity_liters=100000.0,
                daily_replenishment_liters=0.0
            ),
            WaterAsset(
                id="wa-2",
                source_type="borewell",
                current_storage_liters=15000.0,
                max_capacity_liters=20000.0,
                daily_replenishment_liters=3000.0
            )
        ],
        plots=[
            Plot(
                id="plot-1",
                name="North Plot - Kharif Cash Crop",
                area_acres=2.5,
                current_crop="Soybean",
                variety="JS 335",
                sowing_date="2026-06-25",
                growth_stage="mid_season",
                irrigation_method="drip",
                soil=SoilProfile(
                    soil_type="Medium Deep Black (Vertisol)",
                    ph=7.4,
                    nitrogen=195.0,
                    phosphorus=24.0,
                    potassium=280.0,
                    organic_carbon_pct=0.58,
                    is_measured=True
                )
            ),
            Plot(
                id="plot-2",
                name="South Valley Plot",
                area_acres=2.0,
                current_crop="Onion",
                variety="Bhima Super",
                sowing_date="2026-08-10",
                growth_stage="development",
                irrigation_method="sprinkler",
                soil=SoilProfile(
                    soil_type="Clay Loam",
                    ph=7.1,
                    nitrogen=170.0,
                    phosphorus=19.5,
                    potassium=210.0,
                    organic_carbon_pct=0.52,
                    is_measured=True
                )
            )
        ],
        last_updated=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    )

class FarmService:
    def __init__(self):
        self._ensure_storage()

    def _ensure_storage(self):
        os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
        if not os.path.exists(DATA_FILE):
            pilot = _get_pilot_farm()
            with open(DATA_FILE, "w", encoding="utf-8") as f:
                json.dump([pilot.model_dump()], f, indent=2)

    def _load(self) -> List[Farm]:
        self._ensure_storage()
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                return [Farm(**item) for item in data]
        except Exception:
            return [_get_pilot_farm()]

    def _save(self, farms: List[Farm]):
        os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump([f.model_dump() for f in farms], f, indent=2)

    def get_all(self) -> List[Farm]:
        return self._load()

    def get_by_id(self, farm_id: str) -> Optional[Farm]:
        for farm in self._load():
            if farm.id == farm_id:
                return farm
        return None

    def get_default_farm(self) -> Farm:
        farms = self._load()
        if farms:
            return farms[0]
        pilot = _get_pilot_farm()
        self._save([pilot])
        return pilot

    def update_farm(self, farm_update: Farm) -> Farm:
        farms = self._load()
        found = False
        farm_update.last_updated = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        for i, f in enumerate(farms):
            if f.id == farm_update.id:
                farms[i] = farm_update
                found = True
                break
        if not found:
            farms.append(farm_update)
        self._save(farms)
        return farm_update

    def add_plot(self, farm_id: str, plot: Plot) -> Optional[Farm]:
        farm = self.get_by_id(farm_id)
        if not farm:
            return None
        # Replace if ID exists or append
        existing = [p for p in farm.plots if p.id == plot.id]
        if existing:
            farm.plots = [plot if p.id == plot.id else p for p in farm.plots]
        else:
            farm.plots.append(plot)
        return self.update_farm(farm)

    def update_budget(self, farm_id: str, budget: FarmBudget) -> Optional[Farm]:
        farm = self.get_by_id(farm_id)
        if not farm:
            return None
        farm.budget = budget
        return self.update_farm(farm)

    def update_water_assets(self, farm_id: str, assets: List[WaterAsset]) -> Optional[Farm]:
        farm = self.get_by_id(farm_id)
        if not farm:
            return None
        farm.water_assets = assets
        return self.update_farm(farm)

farm_service = FarmService()
