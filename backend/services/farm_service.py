import os
import json
from datetime import datetime
from typing import List, Optional
from models.domain import Farm, Plot, SoilProfile, WaterAsset, FarmBudget, ActivityEvent, ScenarioSnapshot

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")
DATA_FILE = os.path.join(DATA_DIR, "farms.json")
ACTIVITIES_FILE = os.path.join(DATA_DIR, "activities.json")
SCENARIOS_FILE = os.path.join(DATA_DIR, "scenarios.json")

def _get_pilot_farm() -> Farm:
    """Pre-seeded realistic pilot farm in Maharashtra (Baramati, Pune) per the Indradhanu Blueprint."""
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
        total_area_acres=5.2,
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
            ),
            Plot(
                id="plot-3",
                name="Homestead & Fallow Buffer",
                area_acres=0.7,
                current_crop="Fallow / Agroforestry Buffer",
                variety="Desi Neem & Grass",
                sowing_date="2026-05-15",
                growth_stage="late_season",
                irrigation_method="furrow",
                soil=SoilProfile(
                    soil_type="Gravelly Loam",
                    ph=7.6,
                    nitrogen=140.0,
                    phosphorus=14.0,
                    potassium=190.0,
                    organic_carbon_pct=0.42,
                    is_measured=False
                )
            )
        ],
        last_updated=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    )

class FarmService:
    def __init__(self):
        self._ensure_storage()

    def _ensure_storage(self):
        os.makedirs(DATA_DIR, exist_ok=True)
        if not os.path.exists(DATA_FILE):
            pilot = _get_pilot_farm()
            with open(DATA_FILE, "w", encoding="utf-8") as f:
                json.dump([pilot.model_dump()], f, indent=2)
        if not os.path.exists(ACTIVITIES_FILE):
            initial_activities = [
                {
                    "id": "act-1",
                    "farm_id": "farm-mh-001",
                    "plot_id": "plot-1",
                    "operation": "Drip Irrigation Pulse Cycle",
                    "status": "completed",
                    "water_used_liters": 12000.0,
                    "cost_inr": 450.0,
                    "date": "2026-11-01",
                    "notes": "Morning drip cycle applied between 06:00 and 07:30 to avoid midday evaporation.",
                    "recorded_at": "2026-11-01 07:45:00"
                },
                {
                    "id": "act-2",
                    "farm_id": "farm-mh-001",
                    "plot_id": "plot-1",
                    "operation": "Organic Mulch Layering",
                    "status": "completed",
                    "water_used_liters": 0.0,
                    "cost_inr": 1800.0,
                    "date": "2026-11-03",
                    "notes": "Spread soybean straw mulch along drip lines to retain 25% soil moisture.",
                    "recorded_at": "2026-11-03 16:30:00"
                }
            ]
            with open(ACTIVITIES_FILE, "w", encoding="utf-8") as f:
                json.dump(initial_activities, f, indent=2)
        if not os.path.exists(SCENARIOS_FILE):
            initial_scenarios = [
                {
                    "id": "scen-1",
                    "farm_id": "farm-mh-001",
                    "name": "Delayed Monsoon Break + Heatwave (+2.5°C)",
                    "rainfall_anomaly_pct": -40.0,
                    "temp_offset_c": 2.5,
                    "water_cap_pct": 60.0,
                    "budget_limit_inr": 28000.0,
                    "recommended_strategy": "Strategy B: Deficit Drip Irrigation + Mulching",
                    "created_at": "2026-11-02 11:20:00"
                }
            ]
            with open(SCENARIOS_FILE, "w", encoding="utf-8") as f:
                json.dump(initial_scenarios, f, indent=2)

    def _load(self) -> List[Farm]:
        self._ensure_storage()
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                return [Farm(**item) for item in data]
        except Exception:
            return [_get_pilot_farm()]

    def _save(self, farms: List[Farm]):
        os.makedirs(DATA_DIR, exist_ok=True)
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

    # --- Activity Logging & State Update ---
    def record_activity(self, farm_id: str, activity: ActivityEvent) -> ActivityEvent:
        self._ensure_storage()
        try:
            with open(ACTIVITIES_FILE, "r", encoding="utf-8") as f:
                activities = json.load(f)
        except Exception:
            activities = []

        activity_data = activity.model_dump()
        activities.insert(0, activity_data)
        with open(ACTIVITIES_FILE, "w", encoding="utf-8") as f:
            json.dump(activities, f, indent=2)

        # Update farm state (water consumption and budget)
        farm = self.get_by_id(farm_id)
        if farm:
            # Deduct water from farm pond if water used
            if activity.water_used_liters > 0 and farm.water_assets:
                for asset in farm.water_assets:
                    if asset.source_type == "farm_pond" and asset.current_storage_liters >= activity.water_used_liters:
                        asset.current_storage_liters = max(0.0, asset.current_storage_liters - activity.water_used_liters)
                        break
            # Add cost to budget
            if activity.cost_inr > 0:
                farm.budget.spent_inr += activity.cost_inr
                farm.budget.remaining_inr = max(0.0, farm.budget.total_budget_inr - farm.budget.spent_inr)
            self.update_farm(farm)

        return activity

    def get_activities(self, farm_id: str) -> List[ActivityEvent]:
        self._ensure_storage()
        try:
            with open(ACTIVITIES_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                return [ActivityEvent(**item) for item in data if item.get("farm_id") == farm_id]
        except Exception:
            return []

    # --- Scenario Snapshots ---
    def save_scenario(self, snapshot: ScenarioSnapshot) -> ScenarioSnapshot:
        self._ensure_storage()
        try:
            with open(SCENARIOS_FILE, "r", encoding="utf-8") as f:
                scenarios = json.load(f)
        except Exception:
            scenarios = []

        scenarios.insert(0, snapshot.model_dump())
        with open(SCENARIOS_FILE, "w", encoding="utf-8") as f:
            json.dump(scenarios, f, indent=2)
        return snapshot

    def get_scenarios(self, farm_id: str) -> List[ScenarioSnapshot]:
        self._ensure_storage()
        try:
            with open(SCENARIOS_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                return [ScenarioSnapshot(**item) for item in data if item.get("farm_id") == farm_id]
        except Exception:
            return []

farm_service = FarmService()
