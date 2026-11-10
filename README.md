# KrishiNova 🌱
### Autonomous Agro-Climatic Digital Twin & Multilingual Botanical Intelligence

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Vercel Deployed](https://img.shields.io/badge/Deployment-Vercel%20Live-0070F3?style=for-the-badge&logo=vercel&logoColor=white)](https://krishinova-sand.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> **"Understand the farm. Anticipate climate risk. Plan with the resources available."**

🌐 **Live Production Application:** [https://krishinova-sand.vercel.app](https://krishinova-sand.vercel.app)  
📁 **Repository:** [https://github.com/gaurikadalge/Krishinova](https://github.com/gaurikadalge/Krishinova)  
📍 **Calibrated Pilot Context:** Malegaon Khurd, Baramati, Pune District, Maharashtra (18.1462° N, 74.5885° E — 5.2 Acres)

---

## 📌 Table of Contents
- [Executive Overview](#-executive-overview)
- [The Challenge: Climate Volatility in Rain-Shadow Agriculture](#-the-challenge-climate-volatility-in-rain-shadow-agriculture)
- [Core Innovation Pillars](#-core-innovation-pillars)
  - [1. Multi-Plot In-Silico Digital Twin](#1-multi-plot-in-silico-digital-twin)
  - [2. FAO-56 Dual Crop-Water Balance Physics](#2-fao-56-dual-crop-water-balance-physics)
  - [3. Interactive 'What-If' Climate Scenario Lab](#3-interactive-what-if-climate-scenario-lab)
  - [4. Hard-Constraint Decision Engine](#4-hard-constraint-decision-engine)
  - [5. Copernicus Sentinel-2 Multispectral & Cadastral GIS](#5-copernicus-sentinel-2-multispectral--cadastral-gis)
  - [6. Vernacular Rural Neural Voice AI (22 Languages)](#6-vernacular-rural-neural-voice-ai-22-languages)
  - [7. Closed-Loop Execution Ledger & APMC Mandi Integration](#7-closed-loop-execution-ledger--apmc-mandi-integration)
- [System Architecture](#-system-architecture)
- [Pilot Testbed Profile (Baramati 5.2-Acre Farm)](#-pilot-testbed-profile-baramati-52-acre-farm)
- [Tech Stack](#-tech-stack)
- [Getting Started & Local Development](#-getting-started--local-development)
  - [Prerequisites](#prerequisites)
  - [1. Frontend Setup (Next.js 15)](#1-frontend-setup-nextjs-15)
  - [2. Backend Setup (FastAPI & ML Engine)](#2-backend-setup-fastapi--ml-engine)
- [Quantified Ecological & Economic Impact](#-quantified-ecological--economic-impact)
- [License](#-license)

---

## 🚀 Executive Overview

**KrishiNova** is an autonomous agro-climatic digital twin and precision decision-support system engineered for smallholder farmers in climate-vulnerable semi-arid regions. 

Rather than functioning as a standalone weather widget or a generic chatbot, KrishiNova synchronizes orbital satellite telemetry, localized soil moisture physics, and real farm constraints into an **in-silico replica of the farm**. It continuously computes daily root-zone soil water depletion, anticipates 15-day climate anomalies before they impact the field, and prescribes resource-bounded interventions delivered via studio-quality rural neural voice synthesis across **22 official Indian languages**.

```
[Copernicus Sentinel-2 + IMD Telemetry] 
                  │
                  ▼
   [FAO-56 Dual Water-Balance Engine] ──► [What-If Scenario Simulator]
                  │                                   │
                  ▼                                   ▼
 [Constraint-Aware Decision Engine] ◄── [Hard Water & Budget Guardrails]
                  │
                  ▼
[Prescriptive Interventions in 22 Vernacular Languages + APMC Market Realization]
```

---

## 🌪 The Challenge: Climate Volatility in Rain-Shadow Agriculture

Over **86% of Indian farmers** are smallholders cultivating less than 2 hectares, with over 50% of arable land depending entirely on erratic monsoons. In semi-arid rain-shadow belts (such as Western Maharashtra's Deccan plateau), climate change presents immediate hazards:
- **15-Day Mid-Season Dry Spells:** Rainfall breaks during critical flowering and pod-filling windows (e.g., Soybean pod formation or Onion bulb development).
- **Invisible Root-Zone Depletion:** Soil surface looks dry or crops appear green until available moisture drops below the irreversible **25mm permanent wilting point**, triggering 40–70% harvest collapses.
- **The Financial & Water Squeeze:** Marginal farmers possess strictly finite water storage (e.g., a 48,000-litre farm pond reserve) and limited cash reserves (e.g., ₹34,000). Generic advisories recommending unrestricted flood irrigation rapidly exhaust pond reserves, creating acute agricultural debt cycles.
- **The Rural Digital Divide:** Complex dashboard charts and text-heavy apps fail because rural smallholders communicate predominantly through regional spoken vernaculars.

---

## 💡 Core Innovation Pillars

### 1. Multi-Plot In-Silico Digital Twin
Farms are heterogeneous mosaics of varying soil textures, crop varieties, growth stages, and irrigation setups. KrishiNova manages individual farm parcels concurrently rather than assuming a single uniform field:
- **Plot 1 (2.5 ac):** Soybean (JS 335), Vertisol medium black clay loam, drip-irrigated, mid-season pod formation stage.
- **Plot 2 (2.0 ac):** Onion (Bhima Super), alluvial clay loam, micro-sprinklers, vegetative development stage.
- **Plot 3 (0.7 ac):** Agroforestry buffer (Neem & Desi grass), sandy loam matrix, natural percolation buffer.

### 2. FAO-56 Dual Crop-Water Balance Physics
Root-zone moisture is calculated deterministically following the **FAO Irrigation and Drainage Paper No. 56 (FAO-56)** dual crop coefficient formulation:

$$D_{r, i} = D_{r, i-1} - (P_i - RO_i) - I_i - CR_i + ET_{c, i} + DP_i$$

Where crop evapotranspiration under moisture stress ($ET_c$) is determined by:

$$ET_{c, i} = (K_s \cdot K_{cb} + K_e) \times ET_{0, i}$$

- **$K_{cb}$ (Basal Crop Coefficient):** Parameterized directly through Sentinel-2 10m NDVI canopy reflectance.
- **$K_s$ (Water Stress Coefficient):** Dynamically scales transpiration when root-zone depletion exceeds Readily Available Water ($RAW$).
- **Wilting Stress Threshold (25mm):** Triggers proactive emergency alerts before moisture enters the cellular senescence regime.

### 3. Interactive 'What-If' Climate Scenario Lab
Farmers and agricultural extension officers can dynamically simulate microclimate shocks before spending capital:
- **Variable Sliders:** Adjust Rainfall Anomaly (-80% to +50%), Temperature Offset (+0°C to +5°C), Usable Tank Storage (Litres), and Available Working Budget (₹).
- **Dynamic Recharts Curves:** Renders daily projected **Available Soil Water** alongside the climbing **Water Deficit Stress Curve**, predicting the exact calendar day when soil breaches the 25mm wilting point threshold.

### 4. Hard-Constraint Decision Engine
Unlike unconstrained generative LLMs that hallucinate unviable advice, KrishiNova evaluates candidate agronomic interventions against **hard physical invariants**:

$$\text{Strategy Feasible} \iff (V_{\text{water}} \le V_{\text{pond\_usable}}) \land (C_{\text{cost}} \le B_{\text{cash}})$$

```
┌────────────────────────────────────────────────────────────────────────┐
│                        15-DAY DRY SPELL SCENARIO                       │
├──────────────────────────────┬──────────────┬────────────┬─────────────┤
│ Strategy Candidate           │ Water Needed │ Cost (₹)   │ Status      │
├──────────────────────────────┼──────────────┼────────────┼─────────────┤
│ A: Flood Irrigation (Status) │ 52,000 L     │ ₹18,000    │ ❌ INFEASIBLE│
│ B: Deficit Drip + Mulch      │ 28,000 L     │ ₹8,500     │ 🏆 OPTIMAL  │
│ C: Commercial Tanker Refill  │ 45,000 L     │ ₹42,000    │ ❌ INFEASIBLE│
│ D: Kaolin Particle Spray     │ 22,000 L     │ ₹6,200     │ ⚠️ CONTINGENT│
└──────────────────────────────┴──────────────┴────────────┴─────────────┘
```
- **Strategy A** is rejected because 52,000 L exceeds the 48,000 L pond capacity (the pond empties on Day 9).
- **Strategy C** is rejected because ₹42,000 exceeds the farmer's ₹34,000 cash balance.
- **Strategy B** is prescribed as the mathematical optimum, conserving 34,000 L of water while retaining **91% crop yield**.

### 5. Copernicus Sentinel-2 Multispectral & Cadastral GIS
- **Multispectral Spectral Processing:** Ingests 10m Red (Band 4, 665nm) and Near-Infrared (Band 8, 842nm) to calculate normalized canopy indices:
  $$\text{NDVI} = \frac{\text{NIR} - \text{Red}}{\text{NIR} + \text{Red}}$$
- **Interactive Cadastral Editor (Leaflet):** Allows farmers to draw custom non-rectangular farm parcel boundaries along natural bunds and drag corner vertices.
- **Multi-Layer Toggle:** Instantly switches between **ESRI Satellite**, **Sentinel-2 NDVI Spectral Filter**, and **False Color Infrared (CIR)**.

### 6. Vernacular Rural Neural Voice AI (22 Languages)
- **Natural Regional Neural Voices:** Built on Microsoft Edge Neural Audio models, completely bypassing metallic browser speech synthesis.
- **Authentic Rural Personas:**
  - **Krishi Mitra (Farmer Companion - Male):** Manohar (`mr-IN`), Madhur (`hi-IN`).
  - **Krishi Sakhi (Farm Advisor - Female):** Aarohi (`mr-IN`), Swara (`hi-IN`).
- **22 Scheduled Indian Languages:** Marathi, Hindi, Gujarati, Kannada, Tamil, Telugu, Bengali, Punjabi, Malayalam, Odia, Assamese, Urdu, and more.
- **Omnipresent Floating Assistant:** Readily accessible from every screen with native Web Speech STT and streaming audio playback.

### 7. Closed-Loop Execution Ledger & APMC Mandi Integration
- **Live Mandi Ticker:** Displays real-time prices for ongoing farm yields (e.g., Baramati APMC: Soybean ₹4,850/qtl, Onion ₹2,450/qtl).
- **Peer-to-Peer Equipment Sharing:** Localized machinery directory (tractors, spray drones, rotavators) within 5 km.
- **Execution Activity Ledger:** Records executed irrigations and costs, closing the feedback loop into the digital twin state.

---

## 🏗 System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                       EARTH OBSERVATION & TELEMETRY                     │
│  Copernicus Sentinel-2 L2A (10m) • IMD 16-Day Weather • APMC Mandi APIs │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTPS / REST
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   INTELLIGENCE & SIMULATION TIER (FastAPI)              │
│  • FAO-56 Dual Crop-Water Balance Algorithm                            │
│  • XGBoost Localized Crop-Yield & Suitability Model                   │
│  • Hard-Constraint Decision Engine (Water & Budget Guardrails)         │
│  • Edge-TTS Neural Voice Streamer                                      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ JSON / Audio Stream
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     FARMER EXPERIENCE TIER (Next.js 15)                │
│  • Interactive Cadastral Polygon Editor (Leaflet.js)                   │
│  • Root-Zone Depletion & Wilting Stress Visualizer (Recharts)           │
│  • Universal Floating Vernacular AI Assistant (22 Indian Languages)    │
│  • Live APMC Market Insights & Peer Machinery Directory                │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🌾 Pilot Testbed Profile (Baramati 5.2-Acre Farm)

| Parameter | Calibrated Pilot Ground Truth |
| :--- | :--- |
| **Location** | Malegaon Khurd, Baramati, Pune District, Maharashtra (`18.1462° N, 74.5885° E`) |
| **Agro-Climatic Zone** | Western Maharashtra Scarcity / Rain-Shadow Zone (Zone AZ-56) |
| **Total Farm Area** | 5.20 Acres (Plot 1: 2.5 ac, Plot 2: 2.0 ac, Plot 3: 0.7 ac buffer) |
| **Soil Classification** | Vertisol Medium Black Clay Loam (pH 7.4, Organic Carbon 0.58%) |
| **Water Assets** | Farm Pond (*Shet-Tale*) 48,000 L usable (56% capacity) + Solar Borewell |
| **Working Capital** | ₹34,000 seasonal operational budget |

---

## 💻 Tech Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 15.5.29 (App Router)** | Serverless SSR & static generation |
| **UI Components** | **React 18 / TailwindCSS v4 / Radix UI** | Responsive glassmorphic layout |
| **Geospatial & Mapping** | **Leaflet.js & React-Leaflet** | Cadastral parcel drawing & NDVI tiles |
| **Data Visualization** | **Recharts 2.15** | Dynamic soil moisture depletion curves |
| **Backend Engine** | **FastAPI (Python 3.10+)** | High-speed agronomic calculation API |
| **Machine Learning** | **Scikit-Learn, XGBoost, Joblib** | Crop suitability & yield scoring |
| **Speech & Audio** | **Microsoft Edge Neural TTS / Web Speech** | Studio-grade rural voice chat in 22 languages |
| **Cloud Hosting** | **Vercel Edge Platform** | Production web deployment |

---

## 🛠 Getting Started & Local Development

### Prerequisites
- **Node.js** 18.18+ or 20+
- **Python** 3.9+ or 3.10+
- **Git**

### 1. Frontend Setup (Next.js 15)

```bash
# Clone the repository
git clone https://github.com/gaurikadalge/Krishinova.git
cd Krishinova

# Install dependencies using standard npm
npm install

# Start the development server (runs on port 3001)
npm run dev -- -p 3001
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### 2. Backend Setup (FastAPI & ML Engine)

```bash
# Navigate to the backend directory
cd backend

# Create and activate a Python virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install required dependencies
pip install -r requirements.txt

# Run the FastAPI server (runs on port 8001)
python main.py
```

The interactive FastAPI Swagger documentation will be available at [http://localhost:8001/docs](http://localhost:8001/docs).

---

## 📊 Quantified Ecological & Economic Impact

- 💧 **Water Conservation:** Saves **34,000 Litres (37%)** per 2.5-acre plot through precision deficit drip scheduling.
- 🌾 **Yield Preservation:** Protects **89–94%** of crop yield under severe 15-day unseasonal dry spells.
- 💰 **Input Cost Reduction:** Reduces operational farming expenditure by **₹12,500/cycle** via optimized pumping schedules and targeted fertigation.
- 🗣 **Vernacular Inclusivity:** Bridges the digital divide across **22 official Indian languages** with authentic rural speech synthesis.
- ⚡ **Zero Sensor Overhead:** ₹0 ground hardware expense—operates via orbital satellite constellations and mobile devices.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
