# MANGAN-ORBIT: MOIL Manganese Reserve & Shortfall AI Ecosystem

> **Smart India Hackathon (SIH)** • **Problem ID**: SIH26009 • **Category**: Software / Space Technology  
> **Client / Organization**: MOIL Limited (Ministry of Steel, Govt. of India)  
> **Team**: NeuroSpark Astra (`CSPIT-SIH-951352`)  
> **Target Mines**: Dongri Buzurg, Balaghat, Tirodi, Gumgaon, Mansar, Kandri

---
TRY HERE :- https://mangan-orbit.vercel.app/

## 📌 Executive Summary

**MANGAN-ORBIT** is an operational Geo-AI and Space Technology decision-support system designed specifically for open-cast and underground manganese mining operations under **MOIL Limited**. 

The platform connects sub-surface borehole assays, open pit bench geometries, spaceborne Earth observation (Sentinel-2 multispectral bands, NASA SMAP soil moisture, IMD high-resolution gridded rainfall), and heavy earth-moving machinery (HEMM) telemetry into a continuous, auditable closed loop.

```
       ┌──────────────────────────────────────────────────────────┐
       │                THE MANGAN-ORBIT NOVEL LOOP                │
       └──────────────────────────────────────────────────────────┘
             [ 1. MAP EVIDENCE ]  ── Boreholes + Sentinel-2 Proxies
                     │
                     ▼
             [ 2. FORECAST ]      ── 7 / 30 / 90-day Deficit Risk
                     │
                     ▼
             [ 3. SIMULATE ]      ── ActionPilot Scenario Matrix
                     │
                     ▼
             [ 4. CAPTURE ]       ── Human Approval & Mine Sign-Off
                     │
                     ▼
             [ 5. UPDATE ]        ── Active Learning Rover Queue
```

---

## 🏛️ The Three Core Pillars

### 1. Pillar 1: ReserveLens (Geological & Spatial Intelligence)
- **Sub-Surface Lithology & Borehole Logs**: Ingests core samples, assays, depth intervals, and phosphorus impurity metrics ($P\%$).
- **Multi-Band Satellite Proxies**: Synthesizes Sentinel-2 multispectral reflectance (B2 Blue, B4 Red, B8 NIR, B11 SWIR-1, B12 SWIR-2) and Land Surface Temperature (LST) to compute manganese oxide surface indices.
- **Statutory UNFC Mapping**: Classifies blocks strictly under United Nations Framework Classification codes:
  - **UNFC-111**: Proved Mineral Reserve
  - **UNFC-121**: Probable Mineral Reserve
  - **UNFC-122**: Probable Mineral Reserve (Sub-economic / Feasibility Stage)
- **Active Learning Rover Queue**: Identifies high-uncertainty spatial parcels ($H(X) > \tau$) and directs RTK GNSS field survey teams and in-situ XRF analyzers to close geological data gaps.

### 2. Pillar 2: Shortfall Sentinel (Predictive Risk & Deficit Warning)
- **Probabilistic Forecasts**: Evaluates supply shortfall risk across 7-day, 30-day, and 90-day forward horizons.
- **HEMM Availability & Telemetry**: Live tracking of dumpers, hydraulic excavators, and blast hole drill rigs (OEE, MTBF, MTTR, utilization rates).
- **Meteo-Spatial Risk Drivers**: Integrates IMD $0.25^\circ \times 0.25^\circ$ daily gridded rainfall projections and NASA SMAP root-zone soil saturation gauges to anticipate pit inundation and haul-road slip hazards.
- **SHAP Feature Attributions**: Explainable AI scores indicating exactly which factors (weather, fleet downtime, stripping ratio spikes) drive current operational risk.

### 3. Pillar 3: ActionPilot (Prescriptive Mine Continuity & Scenarios)
- **Scenario Simulation Matrix**: Dynamically models operational tradeoffs:
  - *Scenario A: Aggressive Grade Blending* (Prioritizes chemical grade specifications).
  - *Scenario B: Weather-Defensive Extraction* (Prioritizes upper dry benches, safeguarding machinery).
  - *Scenario C: Stripping & Overburden Blitz* (Long-term pit health and slope stability).
- **Human-in-the-Loop Sign-Off**: DGMS-compliant operational change management with tamper-evident digital sign-off records.

---

## 🛠️ Specialized Technical Workbenches

1. **Interactive GIS Canvas & Band Inspector**:
   - Leaflet-powered GIS workbench with coordinate tracking (WGS84 & Mine Local Grid RL).
   - Real-time multispectral band toggles (Sentinel-2 B2, B4, B8, B11, B12), NDVI vegetation recovery masks, and SMAP radar layers.
2. **GeoAI Cadastral Audit Workbench**:
   - Bench-by-bench grade variance evaluation ($Mn\%$, $P\%$, $SiO_2\%$, Stripping Ratio $OB:Ore$).
3. **DSM / DTM Elevation Inspector**:
   - Real-time cross-sectional elevation profile graphing high-wall benches, safety berms, and toe-to-crest heights.
4. **TopoGuard Geotechnical Hazard Matrix**:
   - Real-time slope displacement monitoring and pit wall stability checks complying with DGMS circulars.
5. **IBM MCDR 2017 Statutory Report Generator**:
   - Form F1 compliant monthly reporting with grade-wise classification (+46% Mn, 35–46% Mn, Ferromanganese ore).
6. **Spatial Data Exporter**:
   - Export cadastre polygons, drillhole coordinates, and hazard layers to GeoJSON, Shapefile specifications, or CSV.

---

## 🏗️ Architecture & Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Leaflet / React-Leaflet
- **Visualizations**: Recharts, D3.js, custom HTML5 Canvas for DSM/DTM cross-sections
- **Backend / API**: Express.js with Vite middleware (`server.ts`), modular serverless handlers in `/api/`
- **AI / LLM Integration**: Google GenAI SDK (`@google/genai`) powering geological recommendations, with deterministic offline GeoAI fallbacks
- **Deployment Targets**: Google Cloud Run (Containerized) & Vercel (Edge CDN + Serverless Functions)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or v20.x recommended)
- npm (v9.x or higher)

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/your-org/mangan-orbit.git
cd mangan-orbit

# Install dependencies
npm install
```

### 2. Environment Configuration
Create a `.env` file from the provided `.env.example`:
```bash
cp .env.example .env
```
Populate the required keys:
```env
# Optional: Google Gemini API Key (falls back to deterministic GeoAI engine if omitted)
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Development Mode
```bash
# Starts the development server with Vite hot-reload
npm run dev
```
Navigate to `http://localhost:3000` to interact with the dashboard.

### 4. Production Build & Validation
```bash
# Run TypeScript compilation and linter
npm run lint

# Build static assets and bundled server
npm run build

# Launch the production server
npm run start
```

---

## ☁️ Deployment Guide

### Deploying to Vercel
1. **Framework Preset**: Select **Vite**.
2. **Root Directory**: `./` (default).
3. **Build Command**: `npm run build` (or `vite build`).
4. **Output Directory**: `dist`.
5. **Environment Variables**: Add `GEMINI_API_KEY` under Project Settings ➔ Environment Variables.
6. The included `vercel.json` automatically routes `/api/*` endpoints to Vercel Serverless Functions and handles client-side SPA routing.

### Deploying to Cloud Run / Docker
The application is pre-configured for containerized execution on host `0.0.0.0` and port `3000`:
```dockerfile
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📜 Statutory Standards & Regulatory References

This platform is architected in accordance with statutory mining laws and national spatial datasets:
1. **MCDR 2017 & UNFC**: Mineral Conservation and Development Rules (IBM) using United Nations Framework Classification guidelines.
2. **DGMS Standards**: Directorate General of Mines Safety regulations on bench dimensions, haul road gradients, and slope stability.
3. **Earth Observation**: ISRO Bhuvan Open Data, Copernicus Sentinel-2 Level-2A BOA Reflectance, NASA SMAP L3/L4 Soil Moisture, and IMD Pune Daily Gridded Rainfall.

---

## 👥 Team & Attribution

- **Team**: NeuroSpark Astra (`CSPIT-SIH-951352`)
- **Hackathon**: Smart India Hackathon (SIH)
- **Problem Statement**: SIH26009
- **Client**: MOIL Limited (Ministry of Steel)
