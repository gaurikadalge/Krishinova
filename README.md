# KRISHINOVA

## Climate-Resilient Agricultural Intelligence & Farm Digital Twin

**Indradhanu -- PCCOE International Grand Challenge \| Prototype Build &
Demo Plan**

> **Tagline:** Understand the farm. Anticipate climate risk. Plan with
> the resources available.

------------------------------------------------------------------------

## 1. Product definition

Krishinova is a farm-specific agricultural decision-support system that
combines crop demand, climate conditions, water availability, farm
resources and economic constraints to help farmers compare feasible
cultivation and management decisions.

It is not just a weather dashboard, satellite viewer, irrigation
calculator or chatbot. Its central capability is to connect these
separate information sources to a continuously updated representation of
a farm and answer a practical question:

**Given what this farm plans to grow, what the climate may bring, and
the resources the farmer actually has, which farming plan is feasible
and what should be done next?**

The digital twin represents the farm at both farm and plot level. It
stores the crop plan, soil assumptions or test results, water assets,
input and machinery availability, costs and recorded activities. Weather
and other observations update the context. A simulation engine evaluates
scenarios and compares the consequences of different plans. A
recommendation layer converts the results into understandable actions.

### Core value proposition

Krishinova helps a farmer move from disconnected information to a
farm-specific decision:

**Farm profile + crop demand + climate outlook + water + soil + inputs +
budget + labour/equipment → scenario evaluation → feasible plan →
recorded action → updated farm twin.**

The system should explain not only what it recommends, but also: - Which
data and assumptions informed the recommendation. - Which constraints
were considered. - Which requirements cannot be met with the current
resources. - What changes if rainfall, temperature, water, budget or
input availability changes.

------------------------------------------------------------------------

## 2. The problem Krishinova addresses

Farm decisions are interdependent. Crop choice and crop stage determine
water and input requirements. Weather affects crop development,
evapotranspiration, field operations and risk. Water assets, soil
properties, labour, machinery and budget limit what can be done. Market
signals can influence the commercial attractiveness of a crop, but do
not remove agronomic or resource constraints.

Farmers often receive these pieces of information through separate
sources and must mentally combine them. A weather forecast does not tell
a farmer whether the planned crop mix is feasible with the available
water and budget. A soil report does not show how a heatwave or delayed
monsoon changes the plan. A market price alone does not establish
whether a crop is suitable for a particular plot.

Krishinova connects these dimensions around the farmer's actual farm and
evaluates decisions under changing conditions.

### Problem statement

**Small and marginal farmers lack an integrated, farm-specific way to
evaluate whether their crop plans and farm operations remain feasible
under changing climate conditions and limited resources.**

### Target users

-   Smallholder and marginal farmers managing multiple plots.
-   Farmer Producer Organisations (FPOs) supporting groups of farms.
-   Agricultural advisors and extension workers who help farmers compare
    plans.
-   Later: cooperatives, local institutions and agricultural programmes.

### Initial geography and pilot context

The existing product plan uses Malegaon Khurd, Baramati, Pune district
as its pilot context. The original plan lists: - Soybean plot: 2.5
acres. - Onion plot: 2.0 acres. - Total landholding: 5.2 acres.

The listed plots total 4.5 acres, not 5.2 acres. Before using this
profile as a real pilot, verify the farm details and clarify the
remaining 0.7 acre. If the information is illustrative, label it as a
sample/demo farm. Do not publish a farmer's name, precise coordinates,
soil report or other personal farm information without permission.

------------------------------------------------------------------------

## 3. The Krishinova decision engine

The product should be organised around one central decision engine, not
a collection of unrelated modules.

### 3.1 Five connected intelligence layers

  -----------------------------------------------------------------------------
  Layer             What it           Example inputs          Output
                    understands                               
  ----------------- ----------------- ----------------------- -----------------
  **1. Crop and     What the farm     Crop, variety, area,    Crop-wise
  demand            plans to grow and sowing date, growth     seasonal
  intelligence**    what each crop    stage, crop calendar,   requirements and
                    requires          crop coefficients,      timing
                                      nutrient/input plan,    
                                      optional verified       
                                      market signals          

  **2. Climate      What weather      Forecast and historical Climate outlook,
  intelligence**    conditions are    weather, rainfall,      hazard windows
                    occurring or      temperature, humidity,  and scenario
                    forecast, and     wind, heat/rainfall     inputs
                    what hazards may  alerts, official        
                    affect operations agromet advisories      

  **3. Natural      What the farm can Soil test or labelled   Plot and farm
  resource          draw on and what  soil assumptions, soil  resource status
  intelligence**    condition its     water capacity,         
                    plots are in      well/pond/canal         
                                      availability,           
                                      irrigation method,      
                                      satellite-derived       
                                      vegetation observations 
                                      when available          

  **4. Operational  What the farmer   Budget,                 Feasibility
  and economic      can afford and    seed/fertilizer/input   constraints and
  intelligence**    execute           stock, labour,          resource gaps
                                      machinery access,       
                                      irrigation capacity,    
                                      input prices and        
                                      operating costs         

  **5. Simulation   Which plan        Crop plan + climate     Comparison of
  and decision      performs better   scenario + resource     feasible plans,
  intelligence**    under the         limits + costs          risks, unmet
                    selected                                  requirements and
                    conditions                                recommended
                                                              actions
  -----------------------------------------------------------------------------

### 3.2 Outputs should be decision-oriented

Krishinova should generate: 1. **Farm readiness summary:** whether the
planned crop and operations are supported by the current resource
profile. 2. **Crop demand sheet:** estimated water, nutrient/input,
labour and operation requirements by plot and crop stage. 3. **Climate
risk view:** forecast hazards and their likely operational relevance,
with uncertainty and source labels. 4. **Resource balance:** available
versus required water, budget, inputs, labour and machinery capacity. 5.
**Scenario comparison:** how the plan changes under different rainfall,
heat, water, input-price or budget conditions. 6. **Ranked action
plan:** practical next actions, timing, resource requirement, priority
and reason. 7. **Feedback record:** what was actually carried out, so
future farm-state calculations use recorded activities.

Do not imply that every layer is fully automated in the first prototype.
Clearly identify live integrations, farmer-entered values, assumptions
and future integrations.

------------------------------------------------------------------------

## 4. The prototype use case: a whole-farm seasonal planning decision

For the competition video, demonstrate one integrated question rather
than a narrow water-only calculator:

> **Can this farm carry out its planned crop cycle with its expected
> climate conditions and available water, inputs, labour and
> budget---and how should the plan change if conditions worsen?**

Use the two-plot Baramati context as the demo only after confirming the
details. Otherwise seed a consistent, clearly labelled demo farm.

### Demonstration workflow

1.  **Load the farm:** show plots, crops, areas, soil/resource records
    and available assets.
2.  **Review crop demand:** show crop-stage requirements and the planned
    operations for each plot.
3.  **Review climate:** retrieve weather for the location and show
    forecast period, source and retrieval time. Display relevant
    rainfall and heat conditions.
4.  **Review resources:** show available water, irrigation capacity,
    budget, input stock/requirements, labour and machinery availability.
    Label unverified values as demo assumptions.
5.  **Run baseline feasibility:** compare the planned crop requirements
    with available resources. Highlight shortages and bottlenecks.
6.  **Create a climate scenario:** for example, delayed rainfall plus a
    heatwave, or a rainfall deficit combined with reduced canal supply.
    Clearly label it as a hypothetical what-if scenario.
7.  **Compare alternative plans:** show the effect of changing sowing
    timing, crop area/mix, irrigation allocation or input schedule. Do
    not recommend a crop change unless crop suitability and agronomic
    data are actually represented.
8.  **Generate the action plan:** rank feasible actions against the
    farm's constraints, explain trade-offs and show what remains
    infeasible.
9.  **Record a real-world action:** mark an operation
    completed/partially completed and enter actual quantity/date. Update
    the farm record and show how the next calculation changes.

This gives the judges a broad, integrated system story while keeping the
prototype grounded in one farm and one decision cycle.

------------------------------------------------------------------------

## 5. What to build for the prototype

The prototype should implement a vertical slice across all five
intelligence layers. A small number of working integrations is stronger
than many disconnected feature pages.

### P0 --- Required for the demo

  -----------------------------------------------------------------------------
  Capability              Minimum implementation   Evidence in the video
  ----------------------- ------------------------ ----------------------------
  Farm and plot registry  One farm with at least   Open farm and plot records
                          two plots; crop, area,   
                          stage, soil/resource     
                          assumptions              

  Crop demand engine      Crop-stage calendar and  Show demand by plot and
                          transparent estimates    stage
                          for crop water demand    
                          plus a small set of      
                          input/operation          
                          requirements             

  Climate data service    Real weather API         Refresh weather and view
                          retrieval for the farm   climate timeline
                          coordinates; rainfall    
                          and temperature          
                          forecast; source and     
                          timestamps               

  Resource ledger         Water assets and         Open resource availability
                          availability, irrigation and constraints
                          capacity, budget and     
                          selected                 
                          input/labour/machinery   
                          limits                   

  Baseline feasibility    Compare crop/operation   Show
  engine                  requirements with        demand-versus-availability
                          resources; identify      
                          shortages and            
                          constraints              

  Scenario simulator      Change at least two      Modify inputs and run
                          scenario dimensions,     simulation
                          such as                  
                          rainfall/temperature and 
                          water availability or    
                          budget                   

  Plan comparison         Compare baseline with    Display changed results
                          one or more adjusted     
                          plans; show trade-offs,  
                          unmet demand and         
                          feasibility              

  Action plan             Prioritised actions with Open recommendation
                          timing, resource need    
                          and explanation          

  Persistence and         Save scenario, result,   Reopen saved scenario and
  feedback                model version and actual record an action
                          operation event; update  
                          farm record              

  Deployment              Stable hosted frontend,  Complete flow on deployed
                          backend and database     app
  -----------------------------------------------------------------------------

### P1 --- Add only if P0 is reliable

-   Satellite-derived NDVI trend for a plot, with image date and
    cloud/quality metadata.
-   NDMI as a canopy moisture-related observation, not a root-zone soil
    moisture reading.
-   Official agromet advisory ingestion and crop-stage matching.
-   A verified local mandi price signal as a commercial context input,
    not as a guaranteed demand forecast.
-   Marathi/English explanation of structured recommendations.
-   Downloadable farm plan.

### Do not attempt in this prototype sprint

-   Full statewide crop recommendation for every crop.
-   Autonomous pesticide/fertilizer dosage advice.
-   Yield prediction presented as accurate without field validation.
-   Fully automated satellite monitoring for every farm.
-   IoT sensor hardware deployment unless already available and tested.
-   Marketplace transactions, machinery booking payments or direct
    trading.
-   A large multi-agent AI system or microservices architecture.
-   Claims of guaranteed income, yield or water savings.

------------------------------------------------------------------------

## 6. How the integrated model should work

The prototype should use a transparent rules-and-models engine. AI can
explain the structured outputs, but it should not invent the underlying
calculations.

### 6.1 Crop demand

Represent crop requirements by crop, variety where known, area, sowing
date and growth stage.

For water demand, a first implementation can use:

\[ ET_c = K_c `\times `{=tex}ET_0 \]

Where ET0 is reference evapotranspiration (mm/day), Kc is a crop-stage
coefficient, and ETc is estimated crop evapotranspiration (mm/day).

For a true FAO-56 dual crop coefficient implementation:

\[ ET_c = (K\_{cb} `\times `{=tex}K_s + K_e) `\times `{=tex}ET_0 \]

Do not label a single-coefficient calculation as the dual crop
coefficient method. Use documented crop coefficients and disclose their
source and applicability.

For non-water demand, start with a limited, transparent operation
calendar: - Seed quantity based on crop, area and documented seed-rate
assumption. - Fertilizer/input requirements based on a verified package
of practices or a clearly labelled illustrative schedule. - Labour and
machinery hours based on user-entered operation assumptions.

Do not invent fertilizer dosages or provide chemical prescriptions from
an LLM.

### 6.2 Climate intelligence

Integrate one dependable weather source first. Store: - Provider and
API/source name. - Farm coordinates or location identifier. - Retrieval
timestamp. - Forecast issue/retrieval time and valid period. - Rainfall,
minimum/maximum temperature and other selected variables. - Whether the
value is observed, forecast, cached or scenario-generated.

The scenario engine should be able to apply a hypothetical shock, such
as: - Rainfall reduction or delayed rainfall. - A heatwave / higher
temperature period. - Excess rainfall over a defined period.

A scenario is not a forecast. Do not call a hypothetical event a
predicted event.

### 6.3 Water and natural resources

Represent: - Well, farm pond, canal or other water sources. - Available
quantity and measurement/estimate date. - Irrigation method and
efficiency assumption. - Pump capacity or delivery capacity if known. -
Plot soil properties and root-zone assumptions.

Use a simplified soil-water balance where appropriate. A first-order
daily balance can be represented as:

\[ S\_{t+1} = `\min`{=tex}(S\_{`\max`{=tex}}, `\max`{=tex}(0, S_t +
P\_{eff,t} + I\_{eff,t} - ET\_{c,t} - D_t)) \]

All terms must use consistent units. **1 mm of water over 1 hectare
equals 10,000 litres.** If runoff, drainage, capillary rise or other
terms are not modelled, disclose the simplification.

### 6.4 Budget and operational resources

For each planned operation, represent: - Estimated input quantity and
unit cost. - Labour requirement. - Machinery/equipment requirement and
availability. - Water requirement. - Timing window. - Farmer's available
budget or stock.

The first version can use user-entered prices and availability. Mark
them with source and date; do not call them live market rates unless
retrieved from a current source.

### 6.5 Feasibility and scenario comparison

Start with deterministic constraint checks and a transparent
scoring/ranking method.

Examples of constraints: - Total water allocation must not exceed
available water. - Planned spending must not exceed the entered
budget. - Required input quantity must not exceed stock or procurement
availability. - Labour/machinery demand must fit the available operation
window. - Crop/plot combinations must pass basic suitability checks
supported by the data.

The system should report: - Feasible / feasible with shortfall /
infeasible. - Which constraint is binding. - Resource demand versus
availability. - What changed under the scenario. - Which alternative
plan reduces the shortfall. - What assumptions influence the result.

Do not call a weighted score a mathematical optimum. Use "ranked
feasible options" until a validated optimisation model is implemented.

------------------------------------------------------------------------

## 7. Recommended user experience: six focused workspaces

The interface can have a broader feel without turning into nine
disconnected modules.

### 1. Farm Overview

-   Farm profile, location and registered area.
-   Plot cards and crop cycles.
-   Water sources and resource summary.
-   Key alerts and missing data.

### 2. Crop Plan & Demand

-   Crop and variety, plot, area, sowing date and stage.
-   Crop calendar and upcoming operations.
-   Estimated water and input demand.
-   Assumptions and source references.

### 3. Climate & Risk

-   Current weather and forecast timeline.
-   Rainfall and temperature trends.
-   Heat, dry-spell and excess-rain alerts.
-   Advisory source, forecast period and retrieval timestamp.

### 4. Resources

-   Water availability and irrigation capacity.
-   Soil test / soil assumptions.
-   Input inventory and estimated costs.
-   Labour, machinery and budget availability.

### 5. Digital Twin & Scenario Lab

-   Current farm/plot state.
-   Baseline feasibility.
-   Scenario controls for rainfall, temperature, water and budget.
-   Alternative plan comparison and constraint explanations.

### 6. Decision & Activity Log

-   Ranked feasible actions.
-   Timing, required resources and rationale.
-   Mark actions completed / partial / not completed.
-   Record actual input, irrigation, labour or machinery use.
-   Recalculate and retain history.

------------------------------------------------------------------------

## 8. Demo architecture and technology

Use a **modular monolith** for the prototype. It is simpler to build,
deploy, test and scale than premature microservices.

### Suggested architecture

``` text
Next.js / React frontend
        |
        v
FastAPI application
        |
        +-- Farm & Plot Registry
        +-- Crop Demand Service
        +-- Climate Data Service
        +-- Resource Ledger
        +-- Feasibility & Scenario Engine
        +-- Action Plan / Explanation Service
        |
        v
PostgreSQL database
        |
        +-- External weather provider
        +-- Optional satellite/advisory providers
```

### Technology choices

-   Frontend: existing Next.js, React, TypeScript and Tailwind
    application.
-   Backend: Python + FastAPI.
-   Database: PostgreSQL; add PostGIS when geospatial queries are
    required.
-   Weather: Open-Meteo or another documented provider.
-   Maps/charts: retain existing Leaflet and Recharts integrations if
    they work.
-   AI: optional local or hosted language model for explanation and
    multilingual presentation of structured results. The calculation
    engine remains deterministic and testable.
-   Hosting: deploy frontend, backend and database using managed
    services; store secrets in environment variables.

### Minimum database entities

  -----------------------------------------------------------------------
  Entity                              Key information
  ----------------------------------- -----------------------------------
  `farms`                             Name, location, coordinates, owner
                                      reference

  `plots`                             Farm, area, boundary, soil profile,
                                      irrigation method

  `crop_cycles`                       Plot, crop, variety, sowing date,
                                      stage, status

  `crop_parameters`                   Crop-stage coefficients, seed/input
                                      rates, source/version

  `weather_records`                   Provider, retrieval time, valid
                                      time, variables, quality

  `resource_assets`                   Water source, storage/availability,
                                      pump/irrigation capacity

  `input_inventory`                   Input, quantity, unit, price,
                                      source/date

  `operation_plans`                   Operation, plot, timing,
                                      labour/machinery/input requirements

  `farm_state_snapshots`              Calculated state, timestamp, model
                                      version

  `scenarios`                         Scenario inputs, constraints and
                                      creation time

  `scenario_results`                  Feasibility, resource balances,
                                      ranked options and rationale

  `farm_activity_events`              Actual irrigation, input use,
                                      labour or operation event

  `data_sources`                      Source, type, timestamp, status and
                                      provenance
  -----------------------------------------------------------------------

### Minimum API surface

-   `GET /health`
-   `GET /farms`, `POST /farms`, `GET /farms/{farm_id}`
-   `GET /farms/{farm_id}/plots`
-   `GET /farms/{farm_id}/crop-plan`
-   `GET /farms/{farm_id}/climate`
-   `GET /farms/{farm_id}/resources`
-   `GET /farms/{farm_id}/baseline`
-   `POST /farms/{farm_id}/scenarios`
-   `GET /scenarios/{scenario_id}`
-   `POST /farms/{farm_id}/activities`
-   `GET /farms/{farm_id}/history`

All numerical calculations should happen in the backend. Persist
scenario inputs, outputs, timestamps, assumptions and model versions so
results can be reproduced.

------------------------------------------------------------------------

## 9. The competition video: 6--7 minute recommended story

The video should show the actual application running, not just slides or
mock-up screens. Use a seeded demo farm to avoid lengthy data entry, but
run the climate retrieval, calculation, scenario and save/update actions
for real.

  --------------------------------------------------------------------------
  Time                    On-screen demonstration What the narration proves
  ----------------------- ----------------------- --------------------------
  0:00--0:30              Opening: farm, crops    "A farm's decisions are
                          and climate context     connected. Crop demand,
                                                  climate, water, inputs,
                                                  labour and budget all
                                                  affect whether a plan is
                                                  feasible."

  0:30--1:10              Farm overview and two   "Krishinova starts with a
                          plot records            farm-specific digital
                                                  record, down to individual
                                                  plots and crop cycles."

  1:10--1:55              Crop Plan & Demand      "It estimates what the
                          screen                  selected crops require
                                                  across their growth
                                                  stages---water and planned
                                                  inputs/operations---with
                                                  assumptions visible."

  1:55--2:35              Climate screen; refresh "We connect the farm to a
                          actual weather          weather source and
                                                  distinguish forecast
                                                  information from scenario
                                                  assumptions."

  2:35--3:15              Resources screen        "The system also knows the
                                                  constraints: available
                                                  water, irrigation
                                                  capacity, budget and
                                                  selected operational
                                                  resources."

  3:15--4:20              Run baseline, then      "Now we test a climate
                          apply rainfall/heat     scenario. Krishinova
                          shock and a resource    recalculates demand and
                          constraint              checks whether the plan
                                                  remains feasible."

  4:20--5:20              Compare baseline and    "It identifies the binding
                          alternative plan; show  constraint and compares
                          bottlenecks             alternatives. It does not
                                                  simply issue a generic
                                                  alert; it shows the
                                                  resource gap and
                                                  trade-off."

  5:20--6:10              Open action plan, save  "The farmer receives
                          scenario, record        prioritised actions and
                          completed/partial       can record what actually
                          operation               happened. The farm record
                                                  is updated for the next
                                                  decision."

  6:10--6:40              Architecture/scale      "The same engine can
                          closing                 support more plots, crops
                                                  and verified data sources
                                                  while keeping each
                                                  recommendation tied to
                                                  farm data and resource
                                                  limits."
  --------------------------------------------------------------------------

### If the video must be closer to three minutes

Keep the same story but compress the screens. Do not remove the scenario
run, constraint comparison or saved action. These are the strongest
proof of an integrated working system.

------------------------------------------------------------------------

## 10. Suggested demo scenario and result design

Use one clear scenario that exercises several intelligence layers at
once.

### Example: delayed rainfall + heat stress + reduced available resources

**Baseline** - The farmer's existing crop plan is loaded. - Weather
forecast is retrieved. - Crop demand is estimated by plot and stage. -
Water, input, labour and budget availability are loaded.

**What-if changes** - Reduce effective rainfall for a selected period. -
Increase temperature by a stated amount for a selected period. - Reduce
available canal/well water or set a lower farm water cap. - Optionally
reduce the available input budget.

**Compare options** - Option A: retain the current crop plan and
operations. - Option B: adjust operation timing and allocate available
resources differently. - Option C: change a crop/plot area only if the
app contains a supported crop suitability check and demand model for the
alternative.

**Results to show** - Crop-wise requirements versus available
resources. - Water and budget shortfall. - Operations at risk or needing
rescheduling. - Feasible / infeasible status for each option. -
Recommended next actions and the reason for each. - Sensitivity: which
input change caused the largest change in feasibility.

The demo must use real calculations for its implemented variables. If
labour or input demand is only a user-entered estimate, say so. Do not
create a false sense of precision by displaying many unsupported scores.

------------------------------------------------------------------------

## 11. Implementation split for a 2--3 developer team

### Developer 1 --- Frontend and interaction

-   Simplify the current frontend into the six workspaces.
-   Build farm, crop-demand, climate, resource and scenario views.
-   Connect API responses and display units/provenance.
-   Build comparison charts/tables and action log.

### Developer 2 --- Backend, data and deployment

-   FastAPI structure and PostgreSQL schema.
-   Farm/plot/crop/resource APIs.
-   Weather provider integration and caching.
-   Scenario persistence, activity history and deployment.

### Developer 3 --- Models, constraints and quality

-   Crop demand calculations and parameter management.
-   Water balance and resource conversion.
-   Feasibility checks and plan ranking.
-   Unit tests, scenario tests and agronomic review.

With two developers, combine the model role with backend work and keep
the frontend scope tightly aligned to the demo.

### Build order

1.  Audit current repository and retain working frontend components.
2.  Freeze the demo farm, plot data and units; resolve the 5.2-acre
    versus 4.5-acre discrepancy.
3.  Implement persistent farm, plot, crop-cycle and resource records.
4.  Integrate real weather and show source/timestamps.
5.  Implement crop demand and baseline resource feasibility.
6.  Add climate scenario controls and scenario comparison.
7.  Add action plan, activity event and farm-state update.
8.  Deploy, test failure states and rehearse the exact video path.

Do not build optional modules until the full end-to-end workflow is
stable.

------------------------------------------------------------------------

## 12. Validation, trust and data provenance

Every important value should be labelled as one of: - **Observed:**
measured by a sensor or official observation source. - **Forecast:**
provider-generated future weather estimate. - **Satellite-derived:**
computed from a dated satellite observation. - **Farmer-entered:**
entered by the farmer or field operator. - **Assumed:** demo or default
parameter. - **Calculated:** generated by a documented model. -
**Scenario:** hypothetical input created by the user.

For each data item, retain source, units, location/plot, timestamp,
validity period where relevant, quality status and model version.

### Scientific and product cautions

-   NDVI is a vegetation greenness indicator, not a direct yield
    measurement.
-   NDMI is related to canopy moisture, not a direct measurement of
    root-zone soil water.
-   Cloud cover and satellite revisit timing mean a usable image is not
    guaranteed every five days.
-   Weather forecasts are uncertain; show forecast period and provider.
-   Soil-water outputs are estimates unless calibrated with field
    measurements.
-   Crop coefficients and input recommendations depend on crop, variety,
    stage, local conditions and source.
-   A language model should explain structured results, not calculate
    water, invent prices or prescribe unsupported chemical dosages.
-   If an external API fails, show a timestamped cached result or a
    clear error. Never silently fabricate live data.

### Minimum tests

-   Unit conversions for acres/hectares, mm/litres and kg/ha.
-   Crop demand changes when area or growth stage changes.
-   Lower rainfall or higher temperature affects the relevant calculated
    outputs in the expected direction.
-   Resource use never exceeds the entered water, budget, stock or
    capacity constraint.
-   An infeasible plan visibly identifies its limiting resource.
-   Saved scenarios can be reopened with the same inputs and outputs.
-   Recording an activity updates the next farm-state calculation.
-   API failures do not appear as successful live data.

------------------------------------------------------------------------

## 13. Differentiation and positioning

Do not claim that Krishinova is the first platform to provide weather
forecasts, satellite monitoring, farm advisories or AI agricultural
chat. Existing public and private platforms already offer parts of this
value.

Krishinova's intended differentiation is the **integration of
farm-specific demand and resource constraints with climate scenario
evaluation and action feedback**.

Use this explanation:

> "Most farm information tools show one part of the picture---weather,
> crop health, market information or advisories. Krishinova connects
> these signals to a farm's actual crop plan and available resources. It
> evaluates whether the plan is feasible under changing climate
> conditions, compares alternatives and records the actions taken, so
> the farm's digital representation can be updated over time."

The defensible product loop is:

**Observe farm → estimate crop demand → ingest climate → assess
resources → test scenarios → compare feasible plans → recommend actions
→ record execution → update farm state.**

------------------------------------------------------------------------

## 14. Competition alignment

The product is positioned for the Indradhanu PCCOE International Grand
Challenge theme of **AI for Climate Change**, with direct relevance
to: - Climate-resilient agriculture and food security. - Precision and
data-informed farming. - Water and natural-resource management. -
Climate hazard preparedness and adaptation. - Practical, scalable
AI-supported decision-making.

The prototype should demonstrate innovation through the integrated
decision workflow, feasibility through a deployed and functioning
application, climate relevance through a real climate scenario, and
clarity through traceable inputs and understandable outputs.

Official competition links: - https://www.pccoeigc.com/ -
https://www.pccoeigc.com/timeline - https://www.pccoeigc.com/topics -
https://www.pccoeigc.com/registration2026

Check the latest participant instructions for the exact video duration,
format, upload method and any additional submission conditions.

------------------------------------------------------------------------

## 15. Claims and business assumptions

The earlier product concept includes proposed subscription prices, FPO
licensing, farmer ROI and pilot impact figures. Treat these as
**business hypotheses or reported figures awaiting evidence**, not
validated product outcomes, unless supporting records, calculations and
permission to publish are available.

Do not claim: - A specific percentage of water saved or yield protected
without a measured comparison. - A validated farmer ROI without a
transparent cost/benefit calculation and field data. - Exact
days-to-stress prediction without calibrated model validation. -
Guaranteed agronomic outcomes or zero AI hallucinations. - Full
automation or real-time monitoring if updates are periodic or manual. -
A feature is implemented merely because it appears in the product
vision.

The prototype should distinguish **implemented**, **in progress**,
**planned** and **validated in field** capabilities.

------------------------------------------------------------------------

## 16. Final prototype success criteria

The competition video should let a judge see that Krishinova can:

1.  Represent a real or clearly labelled demo farm at plot level.
2.  Understand what its selected crops require.
3.  Ingest climate information and show its source and time.
4.  Represent available water and other selected farm resources.
5.  Identify where crop demand exceeds available resources.
6.  Simulate how a climate shock changes feasibility.
7.  Compare alternative plans and explain trade-offs.
8.  Produce a practical, resource-aware action plan.
9.  Record what the farmer actually did and update the farm record.

**Final recommendation:** Build a broad farm decision system with a
narrow, complete demonstration journey. The product can analyse crop
demand, climate, water, soil and operational/economic resources; the
video should prove those dimensions working together through one
realistic seasonal-planning decision. This is broader than a water-only
tool without becoming a generic agricultural super-app.
