# KRISHINOVA: Climate Intelligence & Agricultural Digital Twin
## Strategic Implementation Plan & Execution Blueprint

**Project Title:** Krishinova — Agricultural Digital Twin & Climate Scenario Laboratory  
**Document Reference:** `Krishinova_Implementation_Approach_and_Study_Guide.md`  
**Target Codebase:** `Krishinova-gauri`  
**Status:** Saved & Approved Strategy (Pending Execution)

---

## 1. Executive Summary & Paradigm Shift

Krishinova is transitioning from a set of disconnected, toy prediction screens to an **integrated, farm-specific Agricultural Digital Twin and Climate Scenario Laboratory**.

### The Core Loop
The system operates on a continuous, closed-loop decision architecture:
$$\text{Observe} \longrightarrow \text{Update Digital Twin} \longrightarrow \text{Simulate Scenarios} \longrightarrow \text{Compare Feasible Decisions} \longrightarrow \text{Action Plan} \longrightarrow \text{Observe Again}$$

```text
               +---------------------------------------+
               |        1. Real & Ingested Data        |
               | (Weather, Agromet News, Soil, Budget) |
               +-------------------+-------------------+
                                   |
                                   v
               +---------------------------------------+
               |       2. Farm Digital Twin State      |
               | (Crop Stage, Water Balance, Depletion)|
               +-------------------+-------------------+
                                   |
                                   v
               +---------------------------------------+
               |          3. Scenario Lab              |
               |  (Dry Spell, Heatwave, Water Cuts)    |
               +-------------------+-------------------+
                                   |
                                   v
               +---------------------------------------+
               |          4. Decision Engine           |
               | (Feasibility Check: Budget & Water)   |
               +-------------------+-------------------+
                                   |
                                   v
               +---------------------------------------+
               |     5. Multilingual Action Plan       |
               |  (Traceable, Grounded, Non-Halluc.)   |
               +---------------------------------------+
```

---

## 2. Gap Analysis: Current Codebase vs. Blueprint

| Dimension | Current Codebase (`Krishinova-gauri`) | Target Plan (`Study Guide Blueprint`) |
| :--- | :--- | :--- |
| **System Identity** | Isolated ML model + toy water calculator. | Farm-specific Digital Twin & virtual decision laboratory. |
| **Farm Profile** | Single flat user profile with static N, P, K, pH inputs. | Multi-plot registration with measured vs estimated soil tests, water assets (well/canal/tank), and financial budgets. |
| **Weather** | `Math.random()` 16-day dummy generator in `weather-page.tsx`. | Real/calibrated regional weather data (IMD / Open-Meteo) with documented provenance, forecast horizon, and hazard alerts. |
| **Advisories & News** | Static government scheme cards and mock articles. | Official Agromet/KVK advisories with **News-to-Farm Impact Translation** matching hazard & crop stage to plot risk. |
| **Water Modeling** | Oversimplified linear formula `(temp*0.4 - hum*0.05)`. | Scientific **FAO-56 dual crop coefficient** calculation ($ET_c = ET_0 \times K_c$) and daily root-zone soil water depletion model. |
| **Decision Engine** | Single crop classifier (XGBoost). | **Constrained Strategy Evaluator**: tests candidate farming strategies against water and budget limits, ranking feasible options with trade-offs. |
| **Explanation Layer** | Hardcoded text with basic UI translation strings. | Grounded, non-hallucinatory explanations tied directly to model outputs in English, Marathi (मराठी), and Hindi (हिंदी). |

---

## 3. System Architecture & Service Boundaries

### Backend Services (`FastAPI`)
1. **`farm_service`**: Manages farm profiles, multi-plot configurations, soil chemistry records, water assets, and farm budget.
2. **`weather_service`**: Fetches and caches verified regional weather observations, 7-day forecasts, and climate context (ENSO/IOD).
3. **`news_service`**: Ingests official IMD/KVK Agromet advisories, tags them by hazard and crop stage, and executes the News-to-Farm matching logic.
4. **`twin_service`**: Maintains the digital twin state per plot (root-zone water depletion, daily $ET_c$, accumulated GDD, crop coefficient $K_c$). Runs what-if scenarios.
5. **`decision_service`**: Evaluates candidate management strategies under hard budget and water constraints, calculating feasibility and trade-offs.
6. **`explanation_service`**: Provides structured, grounded multilingual explanations without hallucinated agronomic numbers.

### Frontend Navigation Layout (`Next.js`)
Per Section 14 of the blueprint, the UI is organized into:
1. **Overview / Dashboard**: Farm overview, current twin health status, active hazard alerts, and recent observations.
2. **My Farm & Plots**: Detailed plot manager, soil test logger, water asset ledger, and input budget tracker.
3. **Climate & Weather**: Regional observed weather, 7-day forecast, climate anomalies, and data provenance badges.
4. **Agri Intelligence**: Curated Agromet advisories with automated farm-relevance impact indicators.
5. **Digital Twin Scenario Lab**: Interactive laboratory allowing users to trigger dry spells, heatwaves, delayed monsoons, and water rationing.
6. **Decision Comparison**: Side-by-side strategy matrix showing feasibility, cost, water deficit, and stress risk.
7. **Action Plan & Observation Log**: Downloadable farm advisory in Marathi/Hindi/English with quick-log buttons for actual field actions.

---

## 4. Scientific Modeling & Optimization Formulations

### 4.1. FAO-56 Reference Evapotranspiration & Crop Water Demand
$$\text{Crop Evapotranspiration: } ET_c = ET_0 \times K_c(\text{stage})$$
Where:
- $ET_0$: Reference evapotranspiration estimated using Hargreaves-Samani / Penman-Monteith equation based on temperature, humidity, and solar radiation.
- $K_c$: Stage-specific crop coefficient for pilot crops (e.g., Soybean: Initial 0.40, Mid 1.15, Late 0.50; Onion: Initial 0.70, Mid 1.05, Late 0.75).

### 4.2. Root-Zone Soil Water Balance
$$D_{r, t} = D_{r, t-1} - (P_t - RO_t) - I_t + ET_{c, t} + DP_t$$
Where:
- $D_{r, t}$: Root-zone depletion at end of day $t$ (mm).
- $P_t$: Precipitation (mm).
- $RO_t$: Surface runoff (mm).
- $I_t$: Net irrigation applied (mm).
- $DP_t$: Deep percolation below root zone (mm).

### 4.3. Constrained Decision Optimization Formulation
$$\max_{a \in \mathcal{A}} \; \mathbb{E}_{\omega}[U(a, \omega)]$$
$$\text{Subject to: } \quad C(a) \le B \quad \text{and} \quad W(a, \omega) \le W_{\text{available}}$$
Where:
- $a$: Candidate strategy (e.g., Conventional Furrow, Deficit Drip Irrigation, Mulching + Protective Watering, Area Rationing).
- $\omega$: Climate scenario (Baseline, Dry Spell, Heatwave, Water Deficit).
- $C(a)$: Total financial expenditure of strategy $a$.
- $B$: Available farm working budget.
- $W(a, \omega)$: Total water demanded by strategy $a$ under scenario $\omega$.
- $W_{\text{available}}$: Total stored water in assets (well capacity + farm pond/tank).

---

## 5. Phased Implementation Roadmap

### Phase 1: Domain Modeling & Database Schema
- Implement structured models (`Farm`, `Plot`, `SoilProfile`, `WaterAsset`, `FarmBudget`, `ObservationLog`, `TwinState`).
- Establish SQLite/PostgreSQL storage in `backend/` with pre-seeded pilot data for a Maharashtra farm (Pune/Ahmednagar district, Soybean + Onion).

### Phase 2: Scientific Digital Twin & Scenario Engine
- Replace simplistic formulas in `backend/models/water_calculator.py` with `backend/services/twin_service.py` and `fao56_calculator.py`.
- Build scenario runners:
  1. *Baseline Season*
  2. *15-day Dry Spell during flowering*
  3. *Heatwave ($+3^\circ\text{C}$)*
  4. *50% Water Cut*
  5. *30% Budget Reduction*

### Phase 3: Decision & Constraint Optimization Engine
- Implement `backend/services/decision_service.py`.
- Define candidate management strategies with realistic cost and water requirements.
- Build hard constraint validation ($C \le B$, $W \le W_{\text{available}}$) and trade-off metric calculations.

### Phase 4: Weather & Advisory Intelligence Services
- Replace randomized mock data in `weather-page.tsx` with `backend/services/weather_service.py` connected to real/calibrated regional weather data with provenance.
- Build `backend/services/news_service.py` with official Agromet advisories and automated farm-impact tagging.

### Phase 5: Next.js Frontend Transformation
- Reorganize main navigation in [`components/main-app.tsx`](file:///c:/Users/Utkarsh%20Ghom/Downloads/krishinova/Krishinova-gauri/components/main-app.tsx) and [`components/layout/header.tsx`](file:///c:/Users/Utkarsh%20Ghom/Downloads/krishinova/Krishinova-gauri/components/layout/header.tsx).
- Build the **Digital Twin Scenario Lab** page with interactive scenario toggles and Recharts water deficit curves.
- Build the **Decision Comparison** page featuring side-by-side feasibility badges and trade-off charts.
- Upgrade the **My Farm & Plots** interface for multi-plot, soil, water asset, and budget management.

### Phase 6: Grounded Multilingual Explanation & Verification
- Implement `backend/services/explanation_service.py` to produce non-hallucinatory explanations grounded in twin metrics.
- Support complete translations in English, Marathi, and Hindi.
- Create automated `pytest` test suites verifying unit conversions, water balance consistency, and constraint rules.

---

## 6. Hackathon MVP Demonstration Workflow (9-Step Story)

1. **Register/Open Demo Farm**: Display Pune pilot farm with 2 plots (Soybean & Onion), 50,000L water tank, and ₹25,000 budget.
2. **Review Weather & Advisories**: Show live/calibrated regional forecast and an IMD Agromet advisory warning of dry conditions.
3. **Open Digital Twin Lab**: Inspect baseline twin state (current root-zone water level and crop water demand).
4. **Trigger Dry Spell Scenario**: Select "15-Day Mid-Season Dry Spell" scenario and run simulation.
5. **Observe Twin Stress Response**: Digital twin highlights critical water deficit in the flowering plot.
6. **Run Decision Engine**: Engine evaluates 4 candidate strategies under water and budget constraints.
7. **Inspect Feasibility & Trade-offs**: System flags "Conventional Furrow" as infeasible (violates water storage limit) and recommends "Deficit Drip + Mulching" with clear trade-offs.
8. **Adjust Budget/Water Constraints**: Reduce tank volume or budget slider to demonstrate dynamic re-ranking of alternatives.
9. **Log Field Observation & Action Plan**: Record an actual 20mm rainfall observation, watch the twin update its root-zone balance, and generate the final bilingual action plan.

---

## 7. Next Steps
This plan is saved. When you are ready to begin, we will kick off with **Phase 1 (Domain Modeling & Backend Data Layer)** and execute incrementally.
