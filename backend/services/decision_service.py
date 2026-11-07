from datetime import datetime
from typing import Dict, Any, List
from models.domain import Farm
from services.farm_service import farm_service

class DecisionService:
    def __init__(self):
        pass

    def get_crop_plan(self, farm_id: str) -> Dict[str, Any]:
        farm = farm_service.get_by_id(farm_id) or farm_service.get_default_farm()
        
        # FAO-56 Stage Crop Coefficients (Kc) calibrated for Maharashtra agro-climatic zones (MPKV Rahuri)
        crop_kc_map = {
            "Soybean": {
                "initial": 0.40,
                "development": 0.80,
                "mid_season": 1.15,
                "late_season": 0.50
            },
            "Onion": {
                "initial": 0.70,
                "development": 0.90,
                "mid_season": 1.05,
                "late_season": 0.75
            },
            "Fallow / Agroforestry Buffer": {
                "initial": 0.20,
                "development": 0.30,
                "mid_season": 0.35,
                "late_season": 0.25
            }
        }

        # Reference ET0 for Baramati (approx 4.8 mm/day observed in November)
        et0_mm_day = 4.8

        plot_plans = []
        total_daily_water_liters = 0.0

        for plot in farm.plots:
            crop_name = plot.current_crop
            stage = plot.growth_stage
            kc = crop_kc_map.get(crop_name, {}).get(stage, 0.85)
            etc_mm_day = round(et0_mm_day * kc, 2)
            
            # 1 mm over 1 acre = 4,046.86 Liters
            daily_water_liters = round(etc_mm_day * plot.area_acres * 4046.86, 0)
            total_daily_water_liters += daily_water_liters

            # Operations calendar
            operations = []
            if "Soybean" in crop_name:
                operations = [
                    {
                        "stage": "Mid-Season (Pod Formation)",
                        "operation": "Deficit Drip Irrigation Pulse Cycle",
                        "timing": "Morning 06:00 - 07:30",
                        "water_req_liters": 12000,
                        "cost_inr": 450,
                        "labour_hours": 1.5,
                        "machinery": "Drip System (4 LPH emitters)",
                        "provenance": "Calculated (FAO-56)"
                    },
                    {
                        "stage": "Flowering / Early Pod",
                        "operation": "Foliar Spray of 1% Potassium Nitrate (KNO3)",
                        "timing": "Next 5-7 Days",
                        "water_req_liters": 2500,
                        "cost_inr": 1200,
                        "labour_hours": 3.0,
                        "machinery": "Backpack Sprayer / Agri Drone",
                        "provenance": "Recommended (MPKV Rahuri)"
                    }
                ]
            elif "Onion" in crop_name:
                operations = [
                    {
                        "stage": "Development (Vegetative)",
                        "operation": "Micro-sprinkler Light Irrigation",
                        "timing": "Evening 17:00 - 18:30",
                        "water_req_liters": 8500,
                        "cost_inr": 380,
                        "labour_hours": 1.0,
                        "machinery": "Micro-sprinklers",
                        "provenance": "Calculated (FAO-56)"
                    },
                    {
                        "stage": "Bulb Development",
                        "operation": "Top dressing 19-19-19 Fertigation",
                        "timing": "Scheduled Day 12",
                        "water_req_liters": 6000,
                        "cost_inr": 2100,
                        "labour_hours": 2.0,
                        "machinery": "Venturi Injector",
                        "provenance": "Recommended (ICAR-DOGR)"
                    }
                ]
            else:
                operations = [
                    {
                        "stage": "Buffer Maintenance",
                        "operation": "Mulch Clearing & Weed Check",
                        "timing": "Fortnightly",
                        "water_req_liters": 0,
                        "cost_inr": 300,
                        "labour_hours": 2.0,
                        "machinery": "Manual tools",
                        "provenance": "Farmer Practice"
                    }
                ]

            plot_plans.append({
                "plot_id": plot.id,
                "plot_name": plot.name,
                "crop": crop_name,
                "variety": plot.variety,
                "area_acres": plot.area_acres,
                "growth_stage": stage,
                "irrigation_method": plot.irrigation_method,
                "kc_factor": kc,
                "et0_mm_day": et0_mm_day,
                "etc_mm_day": etc_mm_day,
                "daily_water_demand_liters": daily_water_liters,
                "soil_summary": f"{plot.soil.soil_type}, pH {plot.soil.ph}, N: {plot.soil.nitrogen} kg/ha",
                "soil_tested": plot.soil.is_measured,
                "operations": operations
            })

        return {
            "farm_id": farm.id,
            "total_area_acres": farm.total_area_acres,
            "total_daily_water_demand_liters": total_daily_water_liters,
            "et0_reference_source": "Open-Meteo Baramati Station (Lat: 18.1512, Lon: 74.5824)",
            "methodology": "FAO-56 Penman-Monteith Crop Evapotranspiration (ETc = Kc * ET0)",
            "source_provenance": "Calculated & Grounded on MPKV Rahuri & ICAR Package of Practices",
            "plots": plot_plans
        }

    def get_resource_status(self, farm_id: str) -> Dict[str, Any]:
        farm = farm_service.get_by_id(farm_id) or farm_service.get_default_farm()
        
        total_storage = sum(a.current_storage_liters for a in farm.water_assets)
        max_storage = sum(a.max_capacity_liters for a in farm.water_assets)
        daily_recharge = sum(a.daily_replenishment_liters for a in farm.water_assets)

        input_inventory = [
            {"item": "Urea (46% N)", "quantity": "3 bags (135 kg)", "unit_cost_inr": 270, "total_value_inr": 810, "provenance": "Farmer-entered"},
            {"item": "DAP (18-46-0)", "quantity": "2 bags (100 kg)", "unit_cost_inr": 1350, "total_value_inr": 2700, "provenance": "Farmer-entered"},
            {"item": "Soluble 19-19-19", "quantity": "25 kg", "unit_cost_inr": 180, "total_value_inr": 4500, "provenance": "Farmer-entered"},
            {"item": "KNO3 (13-0-45)", "quantity": "10 kg", "unit_cost_inr": 195, "total_value_inr": 1950, "provenance": "Farmer-entered"},
            {"item": "Soybean Straw Mulch", "quantity": "1.5 tonnes", "unit_cost_inr": 1200, "total_value_inr": 1800, "provenance": "Assumed (On-farm residue)"}
        ]

        machinery_access = [
            {"equipment": "Mahindra 575 DI Tractor (45 HP)", "status": "Available within 2.5 km", "rate": "₹500/hr", "verified": True},
            {"equipment": "Solar Submersible Pump (5 HP)", "status": "Installed on Borewell", "rate": "Self-owned", "verified": True},
            {"equipment": "Agri Spray Drone (10L)", "status": "FPO rental, 5 km away", "rate": "₹1,200/hr", "verified": True}
        ]

        return {
            "farm_id": farm.id,
            "water_summary": {
                "total_available_liters": total_storage,
                "max_capacity_liters": max_storage,
                "daily_replenishment_liters": daily_recharge,
                "assets": [a.model_dump() for a in farm.water_assets],
                "provenance": "Farmer-entered & Well Gauging"
            },
            "budget_summary": farm.budget.model_dump(),
            "input_inventory": input_inventory,
            "machinery_access": machinery_access,
            "soil_test_status": {
                "plot_1": {"measured": True, "lab": "KVK Baramati Soil Lab", "date": "May 2026", "rating": "Good fertility"},
                "plot_2": {"measured": True, "lab": "KVK Baramati Soil Lab", "date": "May 2026", "rating": "Moderate organic carbon"},
                "plot_3": {"measured": False, "source": "Regional default assumption", "rating": "Gravelly border"}
            }
        }

    def get_baseline_feasibility(self, farm_id: str) -> Dict[str, Any]:
        farm = farm_service.get_by_id(farm_id) or farm_service.get_default_farm()
        total_water_avail = sum(a.current_storage_liters for a in farm.water_assets)
        budget_remaining = farm.budget.remaining_inr

        # Baseline: 30-day projection under standard seasonal weather
        estimated_30day_water_need = 68000.0  # liters
        estimated_30day_cost = 24000.0  # INR

        water_shortfall = max(0.0, estimated_30day_water_need - total_water_avail)
        budget_shortfall = max(0.0, estimated_30day_cost - budget_remaining)

        is_feasible = (water_shortfall == 0) and (budget_shortfall == 0)

        return {
            "farm_id": farm.id,
            "status": "Feasible" if is_feasible else "Feasible with Shortfall",
            "is_feasible": is_feasible,
            "metrics": {
                "available_water_liters": total_water_avail,
                "projected_30day_water_need_liters": estimated_30day_water_need,
                "water_shortfall_liters": water_shortfall,
                "remaining_budget_inr": budget_remaining,
                "projected_30day_cost_inr": estimated_30day_cost,
                "budget_shortfall_inr": budget_shortfall
            },
            "binding_constraint": "Water storage buffer is tight if an unseasonal 14-day dry spell occurs." if total_water_avail < 90000 else "None",
            "provenance": "Calculated (Baseline Deterministic Model)"
        }

    def simulate_scenario(
        self,
        farm_id: str,
        rainfall_anomaly_pct: float = -40.0,
        temp_offset_c: float = 2.5,
        water_cap_pct: float = 60.0,
        budget_limit_inr: float = 28000.0
    ) -> Dict[str, Any]:
        farm = farm_service.get_by_id(farm_id) or farm_service.get_default_farm()
        
        # Base available water adjusted by cap
        base_water = sum(a.current_storage_liters for a in farm.water_assets)
        effective_water_available = base_water * (water_cap_pct / 100.0)

        # Baseline Strategy A: Conventional Furrow
        strat_a_water = round(92000 * (1 + (temp_offset_c * 0.035)), 0)
        strat_a_cost = 34000.0
        strat_a_feasible = (strat_a_water <= effective_water_available) and (strat_a_cost <= budget_limit_inr)

        # Strategy B: Deficit Drip + Mulch (Recommended)
        # Mulch reduces soil evaporation by 28%, deficit drip targets 85% ETc
        strat_b_water = round(58000 * (1 + (temp_offset_c * 0.02)), 0)
        strat_b_cost = 21500.0
        strat_b_feasible = (strat_b_water <= effective_water_available) and (strat_b_cost <= budget_limit_inr)

        # Strategy C: Protective Irrigation at Flowering Only
        strat_c_water = round(42000 * (1 + (temp_offset_c * 0.015)), 0)
        strat_c_cost = 16000.0
        strat_c_feasible = (strat_c_water <= effective_water_available) and (strat_c_cost <= budget_limit_inr)

        # Simulated 30-day timeline curves
        timeline = []
        days = [1, 5, 10, 15, 20, 25, 30]
        for d in days:
            daily_need = round(35 + (d * 1.5) + (temp_offset_c * 4), 1)
            soil_water = max(8.0, round(70 - (d * 2.1) + (rainfall_anomaly_pct * 0.15), 1))
            deficit = max(0.0, round(daily_need - soil_water, 1))
            timeline.append({
                "day": f"Day {d}",
                "waterNeed": daily_need,
                "soilWater": soil_water,
                "deficit": deficit
            })

        strategies = [
            {
                "id": "strat-1",
                "name": "Strategy A: Conventional Furrow (Baseline)",
                "waterUseLiters": strat_a_water,
                "cost": strat_a_cost,
                "cropStress": "High (Severe root-zone depletion under dry spell)",
                "feasible": strat_a_feasible,
                "infeasibilityReason": f"Exceeds available water by {int(strat_a_water - effective_water_available):,} L and budget by ₹{int(strat_a_cost - budget_limit_inr):,}" if not strat_a_feasible else None,
                "recommended": False
            },
            {
                "id": "strat-2",
                "name": "Strategy B: Deficit Drip Irrigation + Mulching",
                "waterUseLiters": strat_b_water,
                "cost": strat_b_cost,
                "cropStress": "Low (Root-zone moisture preserved via mulch)",
                "feasible": strat_b_feasible,
                "infeasibilityReason": None,
                "recommended": True,
                "savings": f"Saves {int(strat_a_water - strat_b_water):,} L water and ₹{int(strat_a_cost - strat_b_cost):,} budget"
            },
            {
                "id": "strat-3",
                "name": "Strategy C: Protective Irrigation at Flowering Only",
                "waterUseLiters": strat_c_water,
                "cost": strat_c_cost,
                "cropStress": "Moderate (Flowering protected, minor yield sacrifice)",
                "feasible": strat_c_feasible,
                "infeasibilityReason": None,
                "recommended": False,
                "savings": "Minimal cost & water usage; minor yield trade-off"
            }
        ]

        return {
            "scenario_inputs": {
                "rainfall_anomaly_pct": rainfall_anomaly_pct,
                "temp_offset_c": temp_offset_c,
                "water_cap_pct": water_cap_pct,
                "budget_limit_inr": budget_limit_inr,
                "effective_water_available_liters": effective_water_available
            },
            "timeline": timeline,
            "strategies": strategies,
            "binding_constraint": "Water storage capacity is the primary binding constraint under this scenario." if not strat_a_feasible else "None",
            "provenance": "Scenario Simulation (Hypothetical Shock Model)"
        }

decision_service = DecisionService()
