# KRISHINOVA

## Implementation Approach, Technical Documentation & Study Guide

**Project identity:** Climate Intelligence & Agricultural Digital Twin\
**Tagline:** A virtual decision laboratory for climate-resilient
farming\
**Project context:** 2nd OneEarth International Hackathon 2026 --- Team
Hikers\
**Team ID:** OEH-1-012\
**Repository:** https://github.com/gaurikadalge/Krishinova

------------------------------------------------------------------------

## Document purpose

This document is the working blueprint for the final Krishinova project
direction. It is intended to serve three purposes:

1.  **Implementation guide:** what to build, in what order, how the
    components should interact, and how to test them.
2.  **Project documentation:** the problem, objectives, system design,
    data strategy, modelling approach, limitations, risks and evaluation
    plan.
3.  **Study guide:** the concepts the team should understand well enough
    to explain and defend the project during a hackathon presentation,
    judging round or technical review.

The proposed platform is a research-oriented direction. It is not a
claim that every proposed component is already implemented in the
current repository. The existing codebase should be audited and mapped
to this design before implementation claims are made.

------------------------------------------------------------------------

# 1. Executive summary

Krishinova is proposed as a **climate-aware agricultural
decision-support platform built around a farm-specific digital twin**.

A farmer enters information about their farm: location, field size,
soil, crop, sowing date, growth stage, available water, irrigation
method, budget and relevant constraints. Krishinova combines this
profile with weather and climate information, agricultural news and
advisories, and---where reliable data are available---satellite or other
environmental observations.

The platform creates a digital representation of the farm. It uses this
representation to compare possible farming decisions under different
conditions. For example, a farmer or extension worker could examine how
a delayed monsoon, a dry spell, a heatwave, reduced water availability
or a smaller budget might affect alternative crop and irrigation plans.

A decision engine compares feasible strategies against constraints such
as water, money, land, labour and input availability. Instead of
presenting one unexplained answer, it presents alternatives, trade-offs,
assumptions and uncertainty. A multilingual explanation layer turns
technical outputs into practical actions.

**The central idea:** move from showing farmers disconnected information
to helping them test the consequences of decisions before committing
scarce resources.

## 1.1 One-sentence project definition

Krishinova is a farm-specific climate intelligence platform that
combines weather, agricultural information and farmer-provided data in
an agricultural digital twin to simulate scenarios and compare
resource-efficient, climate-resilient farming decisions.

## 1.2 What the platform is---and is not

  -----------------------------------------------------------------------
  Krishinova is                       Krishinova is not
  ----------------------------------- -----------------------------------
  A decision-support and              A guaranteed crop-yield predictor
  scenario-testing platform           

  A farm-specific model updated with  A static form with decorative
  observations and new data           sliders

  A system that compares feasible     A system that always declares one
  alternatives                        universally best crop

  A way to translate climate and      A replacement for agronomists,
  agricultural information into farm  extension workers or official
  implications                        advisories

  A platform that communicates        A source of guaranteed forecasts or
  assumptions and uncertainty         guaranteed savings
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 2. Problem definition and justification

## 2.1 The problem

Smallholder farmers make interconnected decisions about crop choice,
sowing date, irrigation, input purchases and farm expenditure. These
decisions are affected by weather variability, soil conditions, water
availability, crop stage, market conditions and household-level
financial constraints.

Yet relevant information is often fragmented:

-   Weather forecasts may describe a district or block, not the
    conditions and needs of an individual farm.
-   Agricultural news may report a policy change, pest outbreak,
    rainfall event or market disruption without explaining what it means
    for a particular crop and growth stage.
-   Soil, water and crop information may be stored separately or may not
    be available digitally.
-   A farmer may not have a safe way to compare alternative decisions
    before spending money or using water.
-   Generic recommendations may overlook the farmer's budget, irrigation
    capacity, field size or risk tolerance.

The challenge is therefore not simply lack of information. It is the gap
between **available information and a farmer-specific decision**.

## 2.2 Proposed problem statement

> Farmers lack an integrated, farm-specific system that combines
> changing climate conditions, agricultural intelligence, soil and crop
> characteristics, water availability and financial constraints to
> evaluate the consequences of farming decisions before implementation.

## 2.3 Why a combined platform is justified

A separate weather page, news page and crop recommendation page would
still leave the farmer to connect the information manually. Krishinova
brings these elements into one decision workflow:

1.  The farmer registers a farm and its constraints.
2.  The platform gathers relevant weather, climate and agricultural
    information.
3.  News and weather events are matched to the farm's location, crop and
    growth stage.
4.  The digital twin represents the current farm state.
5.  Scenario simulation estimates how alternative conditions or
    decisions may change the farm's needs and risks.
6.  The decision engine compares options under water and budget
    constraints.
7.  The farmer receives an understandable action plan with sources and
    uncertainty.

The value lies in this connected workflow---not in claiming that weather
forecasts, crop models, news classification or optimization are
individually new.

## 2.4 Intended users

-   Smallholder farmers and farm households.
-   Farmer Producer Organisations (FPOs) and cooperatives.
-   Agricultural extension workers and local advisers.
-   NGOs and climate-resilience programmes.
-   Researchers studying farm-level adaptation and resource allocation.
-   Local institutions planning water use or agricultural support.

The first prototype should focus on one clearly defined geography and a
small number of crops. A Maharashtra pilot is a practical starting
scope, not a claim that the system is already validated across the
state.

------------------------------------------------------------------------

# 3. Vision, objectives and research framing

## 3.1 Vision

Enable farmers to explore climate and resource scenarios before making
costly agricultural decisions.

## 3.2 Main objective

Develop a farmer-specific agricultural digital twin that integrates
weather and climate intelligence, verified agricultural information,
soil and crop characteristics, water availability and financial
constraints to simulate alternative farming scenarios and compare
resource-efficient, climate-resilient decisions.

## 3.3 Specific objectives

1.  Create a structured digital profile of each farm and its plots.
2.  Connect the profile to location-relevant weather, climate and
    agricultural information.
3.  Classify incoming news and advisories by source, date, location,
    crop, hazard and relevance.
4.  Translate relevant events into possible implications for the
    registered farm.
5.  Represent the farm's soil, crop stage, water resources and budget in
    a digital twin.
6.  Simulate alternative climate conditions and management decisions.
7.  Estimate crop-water requirements using a documented, calibrated
    method.
8.  Compare strategies subject to water, budget, land and other
    constraints.
9.  Present trade-offs and uncertainty in a multilingual, understandable
    form.
10. Evaluate the prototype against a transparent baseline and document
    its limitations.

## 3.4 Research question

> Can climate-aware, uncertainty-conscious decision optimization improve
> farm-level water-allocation and cultivation decisions compared with
> conventional planning under conditions of water scarcity?

## 3.5 Supporting research questions

-   Does matching climate and agricultural information to crop stage and
    farm location produce more relevant alerts than displaying general
    news?
-   How sensitive are recommended decisions to rainfall, soil-water
    assumptions, crop coefficients and available-water estimates?
-   Does including the farmer's budget change which strategies are
    feasible?
-   How do alternative strategies compare in water use, estimated crop
    stress and cost?
-   How much does model uncertainty affect the ranking of strategies?

## 3.6 Defensible contribution

Do not claim that Krishinova invents agricultural digital twins, weather
forecasts, crop simulation or irrigation optimization. Those areas
already have established research and operational systems.

The project's defensible contribution is the **integration and
evaluation of a farm-specific decision workflow** that:

-   connects verified climate and agricultural information to an
    individual farm profile;
-   updates a digital representation of the farm as new observations
    arrive;
-   simulates alternative climate and management scenarios;
-   compares strategies under explicit water and financial constraints;
-   exposes assumptions, uncertainty and trade-offs to the user.

The research contribution should be tested through a prototype and
documented evaluation, not asserted as a proven benefit.

------------------------------------------------------------------------

# 4. Final platform design: six connected components

## Component 1 --- Farmer profile and farm registration

This is the foundation of the digital twin. A recommendation cannot be
farm-specific if the platform does not know the farm's relevant
characteristics.

### Information to collect

  -----------------------------------------------------------------------
  Category                Example fields          Why it matters
  ----------------------- ----------------------- -----------------------
  Location                State, district,        Connects the farm to
                          taluka/block, village,  local weather,
                          optional GPS point      advisories and
                                                  geospatial data

  Field                   Field/plot ID, area,    Establishes the land
                          boundary, number of     unit for calculations
                          plots                   

  Soil                    Soil type, pH, N, P, K, Influences crop
                          electrical              suitability, fertility
                          conductivity, organic   and water storage
                          carbon, water-holding   
                          capacity                

  Crop                    Crop, variety, sowing   Determines crop
                          date, growth stage,     calendar and
                          previous crop           stage-specific needs

  Water                   Source, available       Establishes the water
                          volume,                 constraint
                          well/tank/canal, pump   
                          capacity, irrigation    
                          method, irrigation cost 

  Finance                 Total budget, remaining Establishes economic
                          budget, input costs,    feasibility
                          credit constraints      

  Resources               Labour, machinery, seed Prevents infeasible
                          availability,           plans
                          fertilizer availability 

  Goals                   Target income, risk     Defines what the farmer
                          preference,             values
                          food-security priority  

  Observations            Irrigation dates,       Updates and calibrates
                          rainfall observations,  the twin
                          crop condition,         
                          pest/disease            
                          observations            
  -----------------------------------------------------------------------

### Data-entry principles

-   Ask only for information needed for the selected feature.
-   Allow unknown values to remain explicitly unknown; do not silently
    replace them with invented values.
-   Distinguish measured soil-test values from farmer estimates and
    default assumptions.
-   Store units with every numeric value.
-   Record the source and date of each observation.
-   Provide a simple mode for low-digital-literacy users and an assisted
    mode for extension workers.
-   Obtain consent before storing personal or precise location
    information.

### Suggested database entities

-   `users`
-   `farms`
-   `plots`
-   `soil_tests`
-   `crop_cycles`
-   `water_assets`
-   `farm_budgets`
-   `farm_observations`
-   `management_events`
-   `data_sources`

A farm may contain multiple plots. Each plot can have a different crop,
soil condition or irrigation arrangement.

------------------------------------------------------------------------

## Component 2 --- Agricultural news and advisory intelligence

The news component must do more than display headlines. Its purpose is
to identify information that may affect a registered farm and explain
why it is relevant.

### Sources to prioritize

Use official and traceable sources first:

-   India Meteorological Department (IMD) and its Agromet Advisory
    Services.
-   State agriculture departments and agricultural universities.
-   ICAR institutes and Krishi Vigyan Kendras (KVKs).
-   Official crop, pest and disease advisories.
-   Government notifications and scheme announcements.
-   Reputable market or commodity information sources, where licensing
    and update frequency are clear.
-   Curated news feeds for broader developments, with source checks.

### News record structure

Every item should store:

-   Headline and short summary.
-   Publisher and original URL.
-   Publication time and retrieval time.
-   Geographic coverage.
-   Crop, commodity or sector tags.
-   Event type: weather, pest, disease, policy, market, input, disaster
    or research.
-   Source reliability/verification status.
-   Expiry or relevance window where applicable.

### News-to-Farm Impact Translation

This is a key integration feature.

**Workflow:**

1.  Retrieve an item from an approved feed or API.
2.  Extract its location, crop, hazard, dates and key claims.
3.  Check the publisher and preserve the original link.
4.  Match the item against the farm's region, crop and growth stage.
5.  Retrieve relevant weather or advisory information.
6.  Identify a possible farm-level implication.
7.  If appropriate, trigger a scenario for the digital twin.
8.  Show the farmer the source, date, reason for relevance and
    uncertainty.

**Example:** An official advisory reports a possible dry spell in a
district. The platform checks whether a registered farm is in the
affected area, identifies the crop and growth stage, and tests a
reduced-rainfall scenario. The output should say that the advisory may
affect the farm and show the scenario assumptions. It must not state
that crop loss is certain.

### Safety and quality rules

-   News is not the same as a weather forecast.
-   A news report must not override an official warning.
-   Never convert an unverified article directly into pesticide or
    fertilizer instructions.
-   Preserve links and publication dates.
-   Flag old or geographically broad stories.
-   Show conflicting reports rather than hiding them.
-   Use human review for high-impact alerts in the pilot.

------------------------------------------------------------------------

## Component 3 --- Weather and climate intelligence

This component connects current conditions and forecasts to the farm
profile.

### Data categories

  -----------------------------------------------------------------------
  Data                    Possible source         Use
  ----------------------- ----------------------- -----------------------
  Current and recent      IMD or an appropriately Current conditions and
  weather                 licensed provider       recent observations

  Short-range forecast    IMD district/block      Near-term farm planning
                          services or approved    
                          forecast API            

  Extended-range outlook  IMD products            Scenario context, not
                                                  deterministic farm
                                                  prediction

  Seasonal rainfall       IMD and other           Seasonal planning
  outlook                 authoritative climate   context
                          services                

  ENSO/IOD information    NOAA Climate Prediction Large-scale climate
                          Center and              context
                          authoritative climate   
                          agencies                

  Historical weather      IMD or documented       Model calibration and
                          gridded datasets        historical scenario
                                                  testing

  Satellite vegetation    Copernicus Sentinel,    Vegetation-condition
  indicators              MODIS or NASA products  context

  Soil moisture products  Suitable                Broad moisture context,
                          satellite/model         subject to scale and
                          products                depth limitations
  -----------------------------------------------------------------------

### What the farmer should see

-   Location and data source.
-   Issue time and valid period.
-   Recent rainfall and temperature.
-   Forecast rainfall and temperature, with forecast horizon.
-   Alerts for heat, heavy rain, dry spells or other relevant hazards.
-   Whether a value is observed, forecast, modelled or
    satellite-derived.
-   Confidence or uncertainty where available.
-   A short explanation of how the information relates to the registered
    crop and stage.

### Climate intelligence is not just a weather widget

A generic weather page says: "Rain is expected."

Krishinova should answer: "For this registered plot, crop and growth
stage, this rainfall scenario may change the estimated irrigation
requirement. Here is the baseline and the alternative scenario, with
assumptions."

### Important scientific caution

Large-scale climate indicators such as El Niño do not deterministically
imply drought in a particular district. Use them as context and scenario
inputs, not as direct farm-level predictions.

Satellite surface soil moisture is not equivalent to root-zone soil
moisture. Do not treat it as a direct measurement of water available to
crop roots without a suitable model, validation and depth
interpretation.

------------------------------------------------------------------------

## Component 4 --- Agricultural digital twin

### Definition

A digital twin is a digital representation of a real-world system that
is updated using observations or data and can be used to understand or
simulate the system's behaviour.

For Krishinova, the twin represents a farm or plot through:

-   location and field area;
-   soil characteristics;
-   crop and growth stage;
-   crop calendar;
-   water resources and irrigation system;
-   budget and available inputs;
-   recent weather and climate context;
-   farmer observations and management events.

A static form that changes a few labels is not, by itself, a meaningful
digital twin. The twin must be linked to a data-update process and a
model whose assumptions are documented.

### Twin state

For each plot, maintain a state record such as:

-   current crop and growth stage;
-   estimated root-zone water status or a documented proxy;
-   recent rainfall and irrigation;
-   crop-water demand estimate;
-   relevant stress indicators;
-   available water and budget;
-   last update time;
-   data-quality and uncertainty flags.

### Scenario laboratory

The user should be able to test conditions such as:

1.  Normal or reference rainfall.
2.  Delayed monsoon or delayed sowing.
3.  Reduced seasonal rainfall.
4.  A dry spell during a sensitive crop stage.
5.  Heatwave or higher-than-usual temperature.
6.  Reduced irrigation-water availability.
7.  Reduced cultivation budget.
8.  Alternative crop or variety.
9.  Alternative sowing date.
10. Different irrigation schedules or methods.

Scenarios should be plausible and clearly labelled. If a scenario is
hypothetical, say so. If it is based on a forecast, display the forecast
issue date and valid period.

### Scenario comparison

For each strategy, display:

-   estimated water requirement;
-   available water and water deficit;
-   estimated crop stress indicator;
-   estimated cost;
-   expected outcome or yield only if a validated model supports it;
-   uncertainty range or scenario spread;
-   assumptions and source data.

Do not present a precise yield or income forecast from a water-balance
model alone.

### Twin update cycle

1.  Retrieve new weather or climate information.
2.  Receive farmer observations, such as rainfall or irrigation.
3.  Validate timestamps, units and location.
4.  Update the farm state.
5.  Recalculate water balance and relevant indicators.
6.  Re-run affected scenarios.
7.  Explain what changed and why.
8.  Keep a history of prior states and recommendations.

------------------------------------------------------------------------

## Component 5 --- Decision and optimization engine

This component compares alternatives under the farmer's actual
constraints.

### Inputs

-   Candidate crops or management strategies.
-   Plot areas and crop stages.
-   Water available over the planning period.
-   Water requirement estimates.
-   Budget and itemized input costs.
-   Seed, labour and machinery constraints.
-   Forecast or climate scenarios.
-   Farmer objectives and risk preferences.

### Outputs

-   Feasible alternatives.
-   Water allocation by plot or crop.
-   Estimated expenditure.
-   Remaining water and budget.
-   Risk indicators under each climate scenario.
-   Trade-offs between cost, water use and expected outcome.
-   Explanation of why an option is feasible or infeasible.

### Conceptual mathematical formulation

Let:

-   \(a\) = a farming strategy or allocation decision;
-   (`\omega`{=tex}) = a climate scenario;
-   (U(a,`\omega`{=tex})) = utility or outcome under strategy (a) and
    scenario (`\omega`{=tex});
-   (C(a)) = estimated cost;
-   \(B\) = available budget;
-   (W(a,`\omega`{=tex})) = water required;
-   (W\_{available}) = available water.

A simplified expected-utility formulation is:

\[ `\max`{=tex}*{a `\in `{=tex}A}
`\mathbb{E}`{=tex}*{`\omega`{=tex}}\[U(a,`\omega`{=tex})\] \]

subject to:

\[ C(a) `\leq `{=tex}B \]

\[ W(a,`\omega`{=tex}) `\leq `{=tex}W\_{available} \]

Additional constraints may include land area, labour, seed availability,
irrigation capacity and crop-specific minimum requirements.

### Risk-aware decision-making

Optimizing only the average scenario can produce a fragile plan. A
strategy may perform well under average rainfall but fail under a dry
spell.

A more robust approach evaluates several scenarios and can penalize
severe downside outcomes. One option is Conditional Value at Risk
(CVaR), which focuses on losses in the worst part of the outcome
distribution. Another is robust optimization, which seeks strategies
that remain feasible across a defined range of conditions.

For a hackathon prototype, begin with transparent scenario comparison
and hard water/budget constraints. Add formal stochastic or robust
optimization only when the inputs and model are reliable enough.

### Do not overclaim

If the model estimates water demand but does not contain a validated
crop-yield response function, report water demand, water deficit and a
documented stress proxy. Do not call these yield predictions.

------------------------------------------------------------------------

## Component 6 --- Personalized action plan and explanation

The final interface should turn model outputs into understandable
choices.

Each recommendation should answer:

1.  What is the suggested action or alternative?
2.  Why is it relevant to this farm?
3.  Which farm inputs were used?
4.  Which weather, climate or advisory data were used?
5.  What assumptions were made?
6.  What is uncertain?
7.  What are the water and cost implications?
8.  What should the farmer observe or update next?

### Multilingual explanation

Support the intended languages through the interface and carefully
reviewed translations. A language model can explain structured outputs
in Marathi, Hindi, Urdu or English, but it must not invent agronomic
calculations or sources.

The LLM should receive structured, already-computed values and a
constrained instruction to explain them. It should not independently
decide crop suitability, calculate irrigation, invent market prices or
generate pesticide dosages.

------------------------------------------------------------------------

# 5. End-to-end user journey

1.  Farmer opens Krishinova and selects a language.
2.  Farmer registers a farm and one or more plots.
3.  Farmer enters soil, crop, sowing date, water and budget information.
4.  The platform validates units and flags missing or estimated values.
5.  The platform retrieves location-relevant weather and official
    advisories.
6.  News intelligence identifies relevant agricultural or climate
    events.
7.  The farm digital twin is initialized.
8.  The farmer selects a scenario or accepts a suggested scenario to
    explore.
9.  The model estimates water needs and relevant stress indicators.
10. The optimization engine compares feasible strategies.
11. The platform displays a side-by-side comparison with assumptions and
    uncertainty.
12. Farmer or adviser selects a plan for consideration.
13. The farmer records actual rainfall, irrigation or crop observations.
14. The twin updates and records how the plan and farm state changed.

The system provides decision support; the farmer and qualified local
advisers retain decision authority.

------------------------------------------------------------------------

# 6. System architecture

## 6.1 High-level architecture

``` text
                    EXTERNAL INFORMATION
      IMD weather / Agromet / NOAA climate / News feeds
       Satellite products / Government & research sources
                              |
                              v
                    DATA INGESTION LAYER
       API connectors | RSS ingestion | Geospatial processing
        Unit checks | Timestamp checks | Source provenance
                              |
                              v
                     KRISHINOVA BACKEND
                         FastAPI
       +----------------------+--------------------------+
       |                      |                          |
       v                      v                          v
 Farm Profile Service   Climate & News Service    Observation Service
       |                      |                          |
       +----------------------+--------------------------+
                              |
                              v
                      DIGITAL TWIN SERVICE
       Farm state | Crop stage | Soil-water state | Resources
                 Scenario simulation and history
                              |
                              v
                    DECISION ENGINE
       Crop-water model | Cost model | Constraints | Optimizer
                              |
                              v
                    EXPLANATION SERVICE
        Structured outputs | LLM explanation | Translation
                              |
                              v
                     FARMER APPLICATION
       Profile | Map | Weather & News | Scenario Lab | Action Plan
                              |
                              v
                    FARMER / ADVISER FEEDBACK
          Irrigation | Rainfall | Crop observations | Costs
                              |
                              +------> Twin update
```

## 6.2 Suggested technology stack

  -----------------------------------------------------------------------
  Layer                   Suggested technology    Responsibility
  ----------------------- ----------------------- -----------------------
  Web frontend            Next.js, React,         User experience and
                          TypeScript              dashboards

  Styling                 Tailwind CSS, shadcn/ui Responsive interface

  Maps                    Leaflet                 Farm and location maps

  Charts                  Recharts                Scenario comparisons
                                                  and trends

  API backend             Python FastAPI          Business logic and
                                                  model endpoints

  Main database           PostgreSQL              Users, farms, plots,
                                                  observations and
                                                  scenarios

  Geospatial database     PostGIS                 Plot geometry and
                                                  spatial matching

  Data processing         pandas, NumPy,          Cleaning and
                          GeoPandas               transformations

  Crop-water calculations FAO-56-based            Reference ET and
                          implementation          crop-water balance

  Optimization            SciPy initially; Pyomo  Constrained decision
                          if needed               comparison

  Crop simulation         DSSAT/APSIM only where  Crop growth/yield
                          suitable and calibrated simulation

  ML                      XGBoost only for        A model component, not
                          specific validated      the whole platform
                          tasks                   

  Explanation             Existing local LLM or   Explain structured
                          approved API            results, not create
                                                  scientific facts

  Testing                 pytest, frontend tests, Correctness and
                          API tests               regression testing
  -----------------------------------------------------------------------

The stack is a proposal. Reuse existing repository components when they
are reliable and fit the new architecture.

## 6.3 Suggested backend service boundaries

-   `farm_service`: profile and plot CRUD.
-   `weather_service`: forecast and observation retrieval.
-   `news_service`: ingestion, tagging, relevance and source metadata.
-   `climate_service`: scenario preparation and climate indicators.
-   `water_balance_service`: ET and crop-water calculations.
-   `twin_service`: state creation, updates and scenario history.
-   `optimization_service`: feasibility and strategy comparison.
-   `explanation_service`: safe natural-language explanations.
-   `audit_service`: data provenance, model version and recommendation
    history.

## 6.4 Example API design

  ---------------------------------------------------------------------------------------
  Method                  Endpoint                                Purpose
  ----------------------- --------------------------------------- -----------------------
  POST                    `/api/farms`                            Create a farm

  GET                     `/api/farms/{farm_id}`                  Retrieve farm profile

  POST                    `/api/farms/{farm_id}/plots`            Add a plot

  POST                    `/api/plots/{plot_id}/soil-tests`       Add a soil test

  POST                    `/api/plots/{plot_id}/observations`     Add field observation

  GET                     `/api/weather?farm_id=...`              Retrieve farm-relevant
                                                                  weather

  GET                     `/api/news?farm_id=...`                 Retrieve relevant
                                                                  news/advisories

  POST                    `/api/twins/{farm_id}/initialize`       Initialize digital twin

  POST                    `/api/twins/{farm_id}/scenarios`        Run a scenario

  GET                     `/api/twins/{farm_id}/scenarios/{id}`   Retrieve scenario
                                                                  result

  POST                    `/api/decisions/compare`                Compare feasible
                                                                  strategies

  GET                     `/api/recommendations/{id}`             Retrieve action plan
  ---------------------------------------------------------------------------------------

These are proposed contracts; confirm naming and schemas against the
current repository before implementing them.

------------------------------------------------------------------------

# 7. Scientific and modelling approach

## 7.1 Crop-water balance

The first scientifically grounded model should focus on crop-water
requirements. This is narrower and more testable than trying to predict
every aspect of crop growth.

A common starting point is the FAO-56 approach:

\[ ET_c = K_c `\times `{=tex}ET_0 \]

where:

-   (ET_c) is crop evapotranspiration;
-   (K_c) is the crop coefficient for the crop and growth stage;
-   (ET_0) is reference evapotranspiration.

A complete implementation needs an appropriate method for estimating
(ET_0), suitable weather inputs, crop coefficients, effective rainfall
and soil-water accounting. FAO Penman--Monteith is the standard
reference method when the necessary meteorological inputs are available.

A simplified balance may be represented as:

\[ S_t = S\_{t-1} + P\_{eff,t} + I_t - ET\_{c,t} - L_t \]

where:

-   (S_t) is soil-water storage at time (t);
-   (P\_{eff,t}) is effective rainfall;
-   (I_t) is irrigation;
-   (ET\_{c,t}) is crop evapotranspiration;
-   (L_t) represents losses such as runoff and deep percolation.

This is a conceptual equation. A production implementation must define
the soil-water layer, units, bounds, infiltration, runoff, drainage and
crop root depth assumptions.

### Validation checklist

-   Use consistent units, preferably mm for water depth.
-   Convert field water depth to volume using plot area where needed.
-   Verify crop coefficients and growth-stage dates against credible
    agronomic references.
-   Do not subtract all rainfall as if all rainfall were effective.
-   Do not count stored tank water twice.
-   Distinguish water available at the source from water that can
    actually be delivered.
-   Include irrigation efficiency where appropriate.
-   Compare model outputs with documented reference calculations or
    field observations.
-   Record model version and input data for every result.

## 7.2 Crop suitability and yield

The existing XGBoost model should be treated as an experimental baseline
until it has been validated on independent, representative data.

Before presenting its output as a recommendation:

-   Identify the source and licensing of the dataset.
-   Check whether samples are real observations or synthetic/generated
    examples.
-   Inspect class balance and geographic/crop coverage.
-   Use a held-out test set and suitable cross-validation.
-   Report accuracy, macro-F1, per-class precision/recall and a
    confusion matrix.
-   Check for leakage and unrealistic feature distributions.
-   Test on data from locations or seasons not used for training.
-   Calibrate probabilities if they will be displayed as confidence.
-   Compare with simple baselines.
-   Document that model performance on a public dataset may not transfer
    to a particular farmer's field.

Do not label a model probability as "chance of success" unless that
probability has been calibrated and the target is clearly defined.

## 7.3 Crop growth and yield modelling

If yield estimates are essential, consider a crop model such as DSSAT or
APSIM for a limited crop and region, provided that the required
cultivar, soil, weather and management parameters are available and the
model can be calibrated.

Do not add a crop model merely for presentation value. A validated
water-demand and resource-allocation prototype is more credible than a
broad but unsupported yield predictor.

## 7.4 Optimization

Start with a transparent baseline:

-   Calculate water demand for each plot or candidate strategy.
-   Calculate costs using documented local input prices.
-   Remove options that violate hard constraints.
-   Compare the remaining options across scenarios.
-   Present water, cost and risk trade-offs.

Then add a formal optimizer once the input data and objective are
stable. Document objective weights and farmer preferences. Do not hide
value judgments inside an unexplained score.

## 7.5 Uncertainty and sensitivity

Important sources of uncertainty include:

-   weather forecast error;
-   seasonal rainfall variability;
-   missing or outdated soil tests;
-   uncertainty in crop coefficients;
-   effective rainfall assumptions;
-   irrigation efficiency;
-   crop-response parameters;
-   input prices and market variability;
-   incomplete farmer observations.

For each important output, show whether it is observed, forecast,
estimated or simulated. Test how the result changes when key assumptions
change.

A simple sensitivity test could vary seasonal rainfall, available water
and crop coefficient within documented ranges and observe how the
recommended allocation changes.

------------------------------------------------------------------------

# 8. Data strategy and provenance

## 8.1 Source hierarchy

Prefer data in this order:

1.  Official observations and advisories.
2.  Government or research-agency datasets with documented methods.
3.  Peer-reviewed or institutionally documented datasets.
4.  Licensed commercial data with known update frequency.
5.  Curated news sources for context.
6.  User-entered estimates, clearly labelled.
7.  Synthetic data, only for software testing and clearly marked as
    synthetic.

## 8.2 Data catalogue

Create a catalogue for every dataset and feed. Record:

-   dataset/feed name;
-   publisher and URL;
-   access method;
-   license or terms of use;
-   spatial resolution;
-   temporal resolution;
-   update frequency;
-   variables and units;
-   missing-data behaviour;
-   limitations;
-   last successful retrieval;
-   intended use.

## 8.3 Suggested sources to investigate

These are candidate sources to evaluate, not a guarantee that every API
or dataset is freely accessible or suitable for the prototype.

-   **IMD Mausam:** official weather warnings, forecasts and related
    services --- https://mausam.imd.gov.in/
-   **IMD Agromet Advisory Services:** agricultural weather bulletins
    and local-language advisories --- https://agromet.imd.gov.in/
-   **IMD Climate Research & Services:** climate information and
    historical products --- https://imdpune.gov.in/
-   **NOAA Climate Prediction Center:** ENSO and climate monitoring ---
    https://www.cpc.ncep.noaa.gov/
-   **Copernicus Data Space:** Sentinel satellite data ---
    https://dataspace.copernicus.eu/
-   **NASA Earthdata:** Earth observation data and documentation ---
    https://earthdata.nasa.gov/
-   **FAO AQUASTAT:** water and agriculture context ---
    https://www.fao.org/aquastat/
-   **FAO-56:** crop evapotranspiration methodology ---
    https://www.fao.org/4/X0490E/X0490E00.htm
-   **ICAR:** Indian agricultural research and institutional information
    --- https://icar.org.in/
-   **ICRISAT:** dryland agriculture and climate-resilience research ---
    https://www.icrisat.org/

Check the current access method, licensing, spatial coverage and update
dates before integrating a source.

## 8.4 Data provenance in the interface

Every critical value should have a "Where did this come from?" detail:

-   source;
-   issue/retrieval time;
-   valid period;
-   spatial coverage;
-   units;
-   transformation applied;
-   whether observed, forecast, modelled or user-entered.

This is essential for user trust and scientific reproducibility.

------------------------------------------------------------------------

# 9. Implementation roadmap

The project should be implemented in phases. A small validated workflow
is preferable to a large collection of disconnected demo screens.

## Phase 0 --- Repository and requirements audit

**Tasks** - Clone and run the existing repository. - Document current
frontend routes and backend endpoints. - Identify existing models, input
features, data files and environment requirements. - Separate working
features from mock/demo features. - Record dependencies and deployment
assumptions. - Map existing code to the six-component design. - Create
issues for bugs, missing tests and data limitations.

**Deliverables** - Repository audit. - Current architecture diagram. -
Feature inventory. - Known limitations register. - Prioritized
implementation backlog.

**Exit criteria** - Team can run the application locally from documented
instructions. - Every existing feature is labelled working, partial,
mock or unverified.

## Phase 1 --- Define the pilot

**Tasks** - Select one pilot district or agro-climatic context. - Select
one or two crops. - Select one representative farm profile for the
demo. - Identify available weather, soil and crop data. - Define units
and planning time step. - Define a conventional baseline for
comparison. - Confirm the exact user workflow.

**Deliverables** - Pilot scope. - Data catalogue. - Farm-profile
schema. - Model assumptions document.

**Exit criteria** - Required inputs and data sources are known. - The
first scenario can be calculated without invented inputs being mistaken
for observations.

## Phase 2 --- Farm profile and database

**Tasks** - Implement farm, plot and crop-cycle records. - Add soil
test, water asset, budget and observation forms. - Validate units and
ranges. - Add source and timestamp fields. - Add missing-data
handling. - Implement access control and consent.

**Deliverables** - Working farm registration. - Database migrations. -
API tests. - Example pilot profile.

**Exit criteria** - A user can create a farm with multiple plots and
retrieve the saved profile accurately.

## Phase 3 --- Weather and news ingestion

**Tasks** - Integrate one reliable weather source for the pilot
region. - Store source, issue time, valid period and units. - Integrate
one or two official advisory/news feeds. - Tag news by crop, location,
hazard and date. - Add stale-data and source-error handling. - Match
items to farm profiles.

**Deliverables** - Weather service. - News/advisory service. -
Source-provenance interface. - Farm relevance logic.

**Exit criteria** - The dashboard distinguishes observation, forecast,
advisory and news. - A user can open the original source for every
displayed alert.

## Phase 4 --- First digital twin

**Tasks** - Initialize a twin from farm and plot records. - Add crop
calendar and growth-stage representation. - Implement a documented
crop-water balance for the pilot crop. - Store the twin state and update
history. - Accept rainfall and irrigation observations. - Add baseline
and one stress scenario.

**Deliverables** - Twin state model. - Water-balance service. - Scenario
API. - Scenario comparison screen.

**Exit criteria** - A change in rainfall or irrigation input causes a
traceable change in the calculated state. - Results can be reproduced
from stored inputs and model version.

## Phase 5 --- Decision engine

**Tasks** - Add water and budget constraints. - Define feasible
candidate strategies. - Implement baseline comparison. - Add
scenario-based ranking or optimization. - Show infeasible options and
the constraint they violate. - Add sensitivity analysis for important
assumptions.

**Deliverables** - Decision engine. - Strategy comparison
table/charts. - Explanation of constraints and trade-offs.

**Exit criteria** - The system never recommends an option that violates
a hard constraint without explicitly flagging it. - The user can inspect
why a strategy ranks higher.

## Phase 6 --- Personalized explanation and multilingual support

**Tasks** - Create structured recommendation objects. - Add explanation
templates. - Add translations reviewed by fluent speakers or domain
advisers. - If an LLM is used, constrain it to the provided structured
outputs. - Add fallback messages if the model is unavailable.

**Deliverables** - Multilingual action plan. - Explanation and source
panel. - Safe fallback mode.

**Exit criteria** - Every explanation is traceable to model output and
source data. - The LLM cannot silently alter numeric calculations.

## Phase 7 --- Evaluation and pilot readiness

**Tasks** - Test historical scenarios. - Compare against a documented
baseline. - Run sensitivity tests. - Ask an agronomist or extension
professional to review assumptions. - Conduct usability tests with
intended users where possible. - Document failures and limitations. -
Prepare a demo dataset with synthetic values clearly labelled.

**Deliverables** - Evaluation report. - Test results. - Known
limitations. - Demo script. - Research presentation.

**Exit criteria** - The team can explain what has been measured, what
has only been simulated and what remains future work.

------------------------------------------------------------------------

# 10. Recommended hackathon MVP

Do not attempt to implement all six components at production scale
during the hackathon. Build one complete vertical slice.

## MVP scope

**Geography:** one selected Maharashtra district.\
**Farm:** one clearly documented demo farm with one or two plots.\
**Crops:** one or two crops with documented parameters.\
**Weather:** one reliable source, or a dated historical/replay dataset
if live access is unavailable.\
**News:** a small set of official, traceable advisories or curated
items.\
**Digital twin:** farm profile plus a water-balance state that updates
from observations.\
**Scenarios:** reference rainfall, dry spell/reduced rainfall, reduced
water availability and reduced budget.\
**Decision:** compare a baseline plan with one or more constrained
alternatives.\
**Interface:** farm profile, weather/news feed, scenario lab and
comparison/action plan.

## MVP demonstration story

1.  Register a demo farm and show its soil, crop, water and budget
    profile.
2.  Show the current weather/advisory data and its source.
3.  Select a dry-spell scenario.
4.  Run the digital twin.
5.  Compare the baseline irrigation plan with a water-constrained
    alternative.
6.  Show estimated water demand, water deficit, cost and uncertainty.
7.  Change the available budget or water and rerun.
8.  Show how the feasible alternatives change.
9.  Record a new observation and show the twin update.

Use clearly labelled illustrative inputs if real farm observations are
unavailable. Do not present simulated water savings, yield improvements
or income increases as measured outcomes.

------------------------------------------------------------------------

# 11. Testing and evaluation plan

## 11.1 Software tests

-   Unit tests for unit conversions and water calculations.
-   API tests for farm creation, updates and scenario requests.
-   Integration tests for weather/news ingestion.
-   Validation tests for missing, malformed and stale data.
-   Regression tests using fixed input scenarios.
-   Frontend tests for forms, language selection and charts.
-   Security tests for user data access and input validation.

## 11.2 Scientific/model tests

-   Compare water calculations with worked examples or trusted reference
    calculations.
-   Check mass-balance consistency.
-   Test edge cases: zero rainfall, zero irrigation, full storage,
    unavailable water, missing weather variables.
-   Test plausible and implausible input ranges.
-   Compare estimates with field observations where available.
-   Test across more than one weather period.
-   Report errors and limitations rather than hiding them.

## 11.3 Baseline comparison

A useful baseline could be a fixed or conventional irrigation plan based
on the same crop and plot assumptions, without scenario adaptation.
Compare it with the climate-aware plan under identical scenario inputs.

Possible evaluation measures:

  -----------------------------------------------------------------------
  Dimension                           Example measure
  ----------------------------------- -----------------------------------
  Water                               Total estimated irrigation demand;
                                      water deficit; allocation
                                      feasibility

  Cost                                Estimated input and irrigation
                                      expenditure

  Risk                                Frequency or severity of constraint
                                      violations across scenarios

  Adaptability                        How the plan changes when
                                      rainfall/water/budget changes

  Data quality                        Percentage of critical values with
                                      source and timestamp

  Reliability                         API success, stale-data detection
                                      and calculation reproducibility

  Usability                           Task completion, comprehension and
                                      user feedback

  Model performance                   Error metrics appropriate to the
                                      model's target
  -----------------------------------------------------------------------

Only report metrics that were actually calculated. If no field trial has
been conducted, clearly state that results are simulation-based.

## 11.4 Suggested experiment design

-   Choose a historical period with documented weather observations.
-   Define a farm profile and crop calendar.
-   Construct a reference plan.
-   Create alternative rainfall and water-availability scenarios.
-   Run the baseline and Krishinova decision method using the same
    inputs.
-   Record water, cost, feasibility and stress-proxy outputs.
-   Repeat with changed budget and soil-water assumptions.
-   Conduct sensitivity analysis.
-   Summarize when the proposed method helps, when it does not and what
    data it needs.

------------------------------------------------------------------------

# 12. Risks, limitations and mitigation

  -----------------------------------------------------------------------
  Risk                    Why it matters          Mitigation
  ----------------------- ----------------------- -----------------------
  Synthetic training data Can create misleading   Label as synthetic; do
                          model performance       not claim field
                                                  accuracy; replace or
                                                  validate with
                                                  representative data

  Forecast uncertainty    Forecasts can change or Show issue time, valid
                          be wrong                period, uncertainty and
                                                  multiple scenarios

  Missing soil data       Soil properties affect  Allow unknowns; show
                          water storage and crop  default assumptions;
                          response                encourage soil testing

  Satellite               Satellite moisture      Use as contextual
  resolution/depth        indicators may not      indicators and validate
                          represent root-zone     with ground data
                          water                   

  Poor news quality       Incorrect or old news   Prefer official
                          could trigger bad       sources; preserve
                          decisions               provenance; apply
                                                  freshness and review
                                                  rules

  Regional                A model calibrated in   Pilot narrowly;
  transferability         one district may not    validate before
                          work elsewhere          geographic expansion

  Unvalidated crop/yield  May imply false         Limit claims; report
  model                   precision               only supported outputs

  Incomplete cost data    Optimization may favour Show price source/date;
                          unrealistic options     allow user-entered
                                                  costs

  LLM hallucination       Could produce unsafe    Use it only to explain
                          agronomic instructions  structured results;
                                                  constrain outputs and
                                                  provide fallback

  Digital access/literacy Some users may struggle Local languages,
                          with forms or           assisted mode, simple
                          dashboards              workflows and
                                                  extension-worker access

  Connectivity            Live feeds may be       Cache recent data, show
                          unavailable             timestamps and provide
                                                  a transparent
                                                  offline/replay demo

  Privacy                 Farm and location data  Consent, access
                          can be sensitive        control, minimization
                                                  and secure storage
  -----------------------------------------------------------------------

## 12.1 Ethical and responsible-use principles

-   Recommendations are advisory, not guarantees.
-   Show uncertainty and data quality.
-   Do not hide missing data.
-   Do not fabricate official alerts, prices or forecasts.
-   Do not expose a farmer's precise location or financial profile
    unnecessarily.
-   Make the system usable without an LLM.
-   Allow farmers and advisers to question or override recommendations.
-   Avoid blaming farmers for outcomes driven by weather, infrastructure
    or market conditions.

------------------------------------------------------------------------

# 13. How Krishinova differs from a collection of ordinary app features

  -----------------------------------------------------------------------
  Ordinary feature                    Krishinova's intended integration
  ----------------------------------- -----------------------------------
  Weather screen                      Weather interpreted against a
                                      farm's crop, stage, soil and water
                                      profile

  News feed                           News matched to farm location and
                                      crop, with source and relevance
                                      explanation

  Crop recommendation                 Alternative strategies evaluated
                                      under water, budget and uncertainty
                                      constraints

  Irrigation calculator               Water-balance state that updates
                                      with rainfall and irrigation
                                      observations

  Chatbot                             Explanation layer grounded in
                                      structured data and model results

  Farm profile                        Persistent digital representation
                                      used by simulation and decision
                                      services

  Dashboard                           A scenario laboratory for comparing
                                      decisions before implementation
  -----------------------------------------------------------------------

The differentiation is the connected decision loop: **observe → update
the twin → simulate → compare → act → observe again**.

------------------------------------------------------------------------

# 14. Suggested interface and navigation

A clean application structure could be:

1.  **Overview** --- farm status, key alerts and last twin update.
2.  **My Farm** --- profile, plots, soil, crop, water and budget.
3.  **Climate & Weather** --- observations, forecasts, climate context
    and warnings.
4.  **Agri Intelligence** --- news and advisories matched to the farm.
5.  **Digital Twin Lab** --- scenario inputs and simulated farm state.
6.  **Decision Comparison** --- alternatives, feasibility, water, cost
    and risk.
7.  **Action Plan** --- selected actions, rationale, sources and
    follow-up observations.
8.  **History** --- prior scenarios, recommendations and actual
    observations.

Avoid a crowded dashboard. The most important user action should be
visible: understand the farm's current situation and compare a decision.

------------------------------------------------------------------------

# 15. Study guide: concepts the team should understand

## 15.1 Agricultural digital twin

**Know:** A digital representation of a physical farm that is updated
with observations/data and used for simulation or decision support.

**Be ready to explain:** What makes the Krishinova twin more than a
static form? It has a farm state, data-update cycle, model, scenario
history and traceable outputs.

**Likely question:** "Why call it a digital twin?"

**Answer:** Because the platform maintains a structured representation
of a real farm and updates it using weather and farmer observations. It
then uses that state to simulate alternative conditions and management
decisions. If the prototype only stores profile data and changes
sliders, it should be described as a scenario simulator prototype rather
than a fully realized digital twin.

## 15.2 Weather forecast versus climate outlook

**Know:** Weather forecasts describe expected conditions over shorter
horizons. Climate outlooks describe probabilities or tendencies over
longer periods and do not specify exact weather for a particular field.

**Likely question:** "Does El Niño mean the farmer will experience
drought?"

**Answer:** No. ENSO is a large-scale climate influence, not a
deterministic district-level drought forecast. It can inform scenario
context, but local forecasts, observations and uncertainty must also be
considered.

## 15.3 Crop evapotranspiration

**Know:** Crop evapotranspiration estimates water transferred from soil
and plants to the atmosphere.

\[ ET_c = K_c `\times `{=tex}ET_0 \]

**Likely question:** "How do you estimate crop-water demand?"

**Answer:** Use reference evapotranspiration and a crop coefficient
appropriate to crop and growth stage. Account for effective rainfall,
irrigation and soil-water storage in a documented balance. The method
and inputs must be calibrated or checked for the selected region and
crop.

## 15.4 Optimization versus prediction

**Know:** Prediction estimates what may happen. Optimization compares
decisions to find a strategy that best meets an objective subject to
constraints.

**Likely question:** "Is XGBoost the decision engine?"

**Answer:** No. A prediction model may provide one input. The decision
engine uses model outputs, costs, water availability and constraints to
compare feasible strategies. The optimization method should be
explainable and tested separately.

## 15.5 Uncertainty-aware decisions

**Know:** Inputs and models are uncertain. A robust decision considers
more than one possible future.

**Likely question:** "Why not recommend the option with the highest
expected yield?"

**Answer:** A strategy with a high average outcome may fail under a dry
spell or water shortage. Comparing multiple scenarios and downside risk
can produce a more resilient plan. Any yield-based comparison requires a
validated yield model.

## 15.6 Satellite data

**Know:** Satellite observations can provide useful indicators of
vegetation and surface conditions, but spatial resolution, cloud cover,
revisit frequency and measurement depth matter.

**Likely question:** "Can satellite soil moisture tell us exactly how
much water is available to roots?"

**Answer:** Not directly. Surface soil-moisture products are not the
same as root-zone water. They must be interpreted with a suitable model
and, ideally, ground observations.

## 15.7 News intelligence

**Know:** News extraction identifies claims, locations, topics and
dates. Relevance matching connects them to a farm profile.

**Likely question:** "How do you stop fake or irrelevant news from
affecting recommendations?"

**Answer:** Prefer official sources, store the publisher and original
link, check publication dates and location, label verification status,
and require stronger validation for high-impact alerts. News should
trigger a scenario for review, not automatically dictate an agronomic
action.

## 15.8 Model validation

**Know:** A model must be evaluated on data that were not used to train
it. Accuracy on synthetic or non-representative data does not establish
field performance.

**Likely question:** "Can you guarantee the recommendation is accurate?"

**Answer:** No. We report the model's validation scope, assumptions and
uncertainty. The prototype is decision support, not a guarantee.
Regional field validation is required before operational use.

------------------------------------------------------------------------

# 16. Likely judging questions and suggested answers

### Q1. What is the main innovation?

The innovation is the connected farm-level decision workflow:
agricultural news and climate information are matched to a farmer's
actual profile, the digital twin is updated, and alternative strategies
are compared under water and financial constraints. We do not claim that
the individual underlying technologies are new.

### Q2. Why combine news and weather?

Weather describes environmental conditions, while news and advisories
can describe local hazards, pest alerts, policy changes, input
disruptions or market developments. Combining them with crop stage and
farm location helps the platform assess relevance and initiate a
scenario for the farmer to examine.

### Q3. What is the role of the farmer's budget?

Budget is a hard feasibility constraint, not merely a display field. The
system should avoid suggesting a strategy whose estimated cost exceeds
the farmer's stated available budget, unless it clearly labels the
strategy as infeasible.

### Q4. How do you know the soil information is correct?

The platform records whether soil values come from a laboratory test,
farmer estimate or default assumption, along with date and units.
Missing data are shown as missing or estimated. A pilot should encourage
verified soil-test inputs.

### Q5. What if the weather API is unavailable?

The platform should show the last successful retrieval time and clearly
label cached data. For a demo, a dated historical/replay dataset can be
used, but it must not be presented as live weather.

### Q6. Does the platform predict crop yield?

Only if a validated crop-response model is integrated for the selected
crop and region. The initial MVP should focus on water demand, water
deficit, feasibility and cost. Do not claim yield prediction from the
water-balance calculation alone.

### Q7. How will you prove impact?

Start with a reproducible historical scenario comparison against a
documented baseline. Measure water allocation, constraint violations and
cost under identical inputs. Real-world claims about water savings,
yield or income require field evaluation.

### Q8. Why not just use existing IMD advisories?

Official advisories are important inputs and should be credited.
Krishinova's role is to connect those advisories to a registered farm's
crop, stage, soil, water and budget, then allow the farmer to compare
possible responses. It complements---not replaces---official services
and local experts.

### Q9. Why use AI?

Use machine learning only where it adds measurable value, such as a
validated classification or prediction task. Use optimization for
constrained decisions and a language model for explanation. The project
is not "AI everywhere"; each method has a defined role.

### Q10. What is the biggest limitation?

The biggest limitation is the availability and quality of local farm,
soil, crop-response and water data. Without calibration and field
validation, outputs remain scenario estimates. The project addresses
this by exposing assumptions and narrowing the pilot scope.

------------------------------------------------------------------------

# 17. Recommended six-slide presentation narrative

The competition presentation is limited to six slides including the
title slide. Use the existing prescribed template and retain its
required section headings.

## Slide 1 --- Cover

**KRISHINOVA: Climate Intelligence & Agricultural Digital Twin**

**Problem statement:** Enabling smallholder farmers to test
climate-resilient farming decisions through a farm-specific digital twin
integrating climate intelligence, agricultural news, soil, water and
financial constraints.

Theme: AI for Environmental Sustainability and Climate Resilience ---
Agriculture and Water.

## Slide 2 --- Concept Title

Explain the problem and the unified solution:

-   Farmer creates a profile of farm, soil, crop, water and budget.
-   Weather and verified agricultural news are matched to the farm.
-   Digital twin represents the farm and is updated with new
    observations.
-   What-if scenarios test dry spells, heat, delayed monsoon, reduced
    water and budget.
-   Decision engine compares feasible strategies and explains
    trade-offs.

Highlight the connected loop, not a list of unrelated app features.

## Slide 3 --- Technological Strategy

Show a simple architecture:

**IMD / climate / news / satellite / farmer data → validation and
ingestion → farm digital twin → crop-water model → scenario engine and
constraints → comparison and multilingual action plan.**

Mention only technologies that are implemented or clearly marked as
planned.

## Slide 4 --- Practicality and Viability

-   Start with one Maharashtra pilot context and one or two crops.
-   Reuse the existing Next.js and FastAPI foundation where suitable.
-   Use official weather/advisory data and documented agronomic methods.
-   Build one end-to-end scenario demonstration.
-   Risks: forecast uncertainty, missing soil data, model
    transferability, news quality and connectivity.
-   Mitigation: source provenance, calibration, uncertainty display,
    adviser review and historical testing.

## Slide 5 --- Impact and Advantages

-   Better-informed water allocation.
-   More transparent comparison of cost and resource trade-offs.
-   Farm-specific interpretation of climate and agricultural
    information.
-   Multilingual support for farmers and extension workers.
-   Potential contribution to SDGs 2, 6, 12 and 13.

Phrase benefits as intended or potential until measured.

## Slide 6 --- Research and References

Include a concise set of foundational sources: - FAO-56 crop
evapotranspiration. - IMD Mausam and IMD Agromet. - NOAA Climate
Prediction Center. - Copernicus Sentinel and NASA Earthdata. - Relevant
ICAR/ICRISAT research. - Repository and model/data documentation.

Do not overcrowd the slide; put full references in supporting
documentation.

------------------------------------------------------------------------

# 18. Research and documentation deliverables

The team should maintain the following project documents:

1.  **Problem and requirements document** --- user, problem, objectives,
    scope and exclusions.
2.  **Repository audit** --- what already works, what is mocked and what
    must change.
3.  **System architecture** --- services, data flow, deployment and
    trust boundaries.
4.  **Data catalogue** --- sources, licensing, spatial/temporal
    resolution and limitations.
5.  **Data dictionary** --- field names, types, units, validation and
    provenance.
6.  **Model specification** --- equations, parameters, assumptions and
    versions.
7.  **Scenario specification** --- scenario definitions and how inputs
    are altered.
8.  **Optimization specification** --- objectives, constraints and
    preference handling.
9.  **API documentation** --- endpoint schemas, errors and
    authentication.
10. **Test plan and evaluation report** --- software, scientific and
    usability tests.
11. **Risk register** --- technical, scientific, ethical and operational
    risks.
12. **User guide** --- farm setup, data entry, scenario use and
    interpretation.
13. **Demo guide** --- demo account, sample farm, data dates and
    expected results.
14. **Limitations and future work** --- what has not been validated or
    implemented.

## 18.1 Reproducibility record

For every scenario result, retain:

-   farm and plot IDs;
-   input values and units;
-   source IDs and timestamps;
-   model version;
-   parameter set;
-   scenario definition;
-   optimizer version and settings;
-   output values;
-   warnings and uncertainty notes.

This allows the team to reproduce and investigate a result later.

------------------------------------------------------------------------

# 19. Future roadmap beyond the hackathon

After the MVP is evaluated, possible extensions include:

-   More districts and crop calendars.
-   Additional soil and crop models.
-   Better integration of satellite vegetation and soil-moisture
    indicators.
-   Ground sensors and farm IoT data.
-   Localized pest and disease risk models with expert validation.
-   Market price and supply-chain information.
-   FPO and extension-worker dashboards.
-   Offline-first mobile workflows.
-   More formal stochastic optimization and uncertainty quantification.
-   Field pilots with agricultural universities, KVKs or research
    partners.
-   Model calibration using real observations across multiple seasons.

These are future directions, not current implementation claims.

------------------------------------------------------------------------

# 20. Team execution checklist

## Before coding

-   [ ] Audit the current repository.
-   [ ] Confirm the pilot district and crop(s).
-   [ ] Agree on the exact MVP user journey.
-   [ ] Create the data catalogue and data dictionary.
-   [ ] Decide which values are real, estimated, forecast or synthetic.
-   [ ] Define the baseline and evaluation measures.

## During implementation

-   [ ] Keep farm, plot and crop-cycle data separate.
-   [ ] Store units, source and timestamp.
-   [ ] Build one complete vertical slice before adding more features.
-   [ ] Test calculations independently of the UI.
-   [ ] Show missing data and uncertainty.
-   [ ] Keep LLM explanations separate from numerical calculations.
-   [ ] Record model and scenario versions.

## Before the demo

-   [ ] Test the complete user journey from registration to comparison.
-   [ ] Verify all displayed source links and dates.
-   [ ] Check that the demo data are labelled correctly.
-   [ ] Prepare a fallback if live APIs fail.
-   [ ] Confirm the charts use consistent units.
-   [ ] Remove unsupported accuracy, yield, savings and impact claims.
-   [ ] Prepare answers to the judging questions in this document.

------------------------------------------------------------------------

# 21. Final project positioning

Krishinova should be presented as a **climate-aware agricultural
decision laboratory for smallholder farms**.

Its central workflow is:

> **Understand the farm → connect climate and agricultural intelligence
> → update the digital twin → test possible futures → compare feasible
> decisions → explain the trade-offs → learn from new observations.**

The platform's credibility will come from a narrow, transparent and
testable prototype---not from the number of AI features it lists. The
team should prioritize data provenance, scientifically defensible water
calculations, explicit constraints, scenario comparison and honest
uncertainty.

A successful first version does not need to predict everything. It needs
to demonstrate, clearly and reproducibly, how a farmer-specific digital
representation can help compare decisions when water, weather and money
are limited.

------------------------------------------------------------------------

# Appendix A --- Glossary

  -----------------------------------------------------------------------
  Term                                Meaning
  ----------------------------------- -----------------------------------
  Agricultural digital twin           Data-updated digital representation
                                      of a farm used to monitor or
                                      simulate its state

  Crop evapotranspiration (ETc)       Water lost through crop
                                      transpiration and soil evaporation

  Reference evapotranspiration (ET0)  Standardized estimate of
                                      atmospheric evaporative demand

  Crop coefficient (Kc)               Factor relating reference ET to
                                      crop ET under defined conditions

  Effective rainfall                  Portion of rainfall that
                                      contributes to crop-available soil
                                      water

  Root zone                           Soil depth from which the crop's
                                      roots extract water

  Scenario analysis                   Comparing model outputs under
                                      alternative assumptions or
                                      conditions

  Optimization                        Selecting a strategy that best
                                      meets an objective under
                                      constraints

  Robust optimization                 Choosing decisions that remain
                                      acceptable under uncertainty

  CVaR                                A risk measure focused on the
                                      average of severe losses beyond a
                                      selected threshold

  Data provenance                     Record of where data came from,
                                      when and how they were processed

  Calibration                         Adjusting model parameters using
                                      relevant observations

  Validation                          Testing model performance against
                                      independent or otherwise
                                      appropriate evidence

  Digital advisory                    Information intended to support
                                      agricultural decisions, often based
                                      on weather and crop context
  -----------------------------------------------------------------------

# Appendix B --- Key formulas and interpretation

## Crop evapotranspiration

\[ ET_c = K_c ET_0 \]

Use crop- and stage-appropriate coefficients and a defensible reference
ET method.

## Simplified soil-water accounting

\[ S_t = S\_{t-1} + P\_{eff,t} + I_t - ET\_{c,t} - L_t \]

Define the soil layer, units, storage limits and loss terms before using
this in an operational calculation.

## Constrained decision objective

\[ `\max`{=tex}*{a `\in `{=tex}A}
`\mathbb{E}`{=tex}*{`\omega`{=tex}}\[U(a,`\omega`{=tex})\] \]

subject to:

\[ C(a) `\leq `{=tex}B,`\qquad `{=tex}W(a,`\omega`{=tex})
`\leq `{=tex}W\_{available} \]

This is a conceptual framework. The team must define the strategy
variables, utility function, scenario probabilities and constraints
before claiming to have implemented a formal optimizer.

# Appendix C --- Reference reading list

1.  Allen, R. G., Pereira, L. S., Raes, D., & Smith, M. **Crop
    Evapotranspiration: Guidelines for Computing Crop Water
    Requirements.** FAO Irrigation and Drainage Paper 56.
    https://www.fao.org/4/X0490E/X0490E00.htm
2.  India Meteorological Department. **Mausam --- Weather Services.**
    https://mausam.imd.gov.in/
3.  India Meteorological Department. **Agromet Advisory Services.**
    https://agromet.imd.gov.in/
4.  India Meteorological Department, Climate Research & Services.
    https://imdpune.gov.in/
5.  NOAA Climate Prediction Center. https://www.cpc.ncep.noaa.gov/
6.  Copernicus Data Space Ecosystem. https://dataspace.copernicus.eu/
7.  NASA Earthdata. https://earthdata.nasa.gov/
8.  ICAR. https://icar.org.in/
9.  ICRISAT. https://www.icrisat.org/
10. Krishinova project repository.
    https://github.com/gaurikadalge/Krishinova

**Reference note:** This list is a starting point for study and
implementation. Before submission, add the exact papers, dataset
versions, API documentation, access dates and licenses actually used by
the team.
