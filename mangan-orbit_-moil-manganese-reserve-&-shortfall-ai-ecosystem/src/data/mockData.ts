import type {
  MineBlockParcel,
  BoreholeRecord,
  EquipmentTelemetry,
  SpaceWeatherTelemetry,
  ShortfallPrediction,
  ActionPilotScenario,
  TopoHazardError,
  GroundTruthingRoverTask,
  SIHSlide
} from "../types/index.ts";

export const MOIL_MINES_LIST = [
  { id: "MOIL-DB", name: "Dongri Buzurg Mine", state: "Maharashtra (Bhandara)", type: "Open Cast & Sub-surface", annualCapacityMT: 0.52 },
  { id: "MOIL-BG", name: "Balaghat Mine", state: "Madhya Pradesh", type: "Deep Underground (World-renowned 48% Mn)", annualCapacityMT: 0.65 },
  { id: "MOIL-TR", name: "Tirodi Mine", state: "Madhya Pradesh", type: "Open Cast Highwall", annualCapacityMT: 0.28 },
  { id: "MOIL-GG", name: "Gumgaon Mine", state: "Maharashtra (Nagpur)", type: "Underground Inclined Shaft", annualCapacityMT: 0.22 },
  { id: "MOIL-MS", name: "Mansar Mine", state: "Maharashtra (Nagpur)", type: "Semi-mechanized Open Cast", annualCapacityMT: 0.25 },
  { id: "MOIL-KD", name: "Kandri Mine", state: "Maharashtra (Nagpur)", type: "High-grade Manganese Pit", annualCapacityMT: 0.18 }
];

export const INITIAL_MINE_BLOCKS: MineBlockParcel[] = [
  {
    id: "BLK-DB-01",
    blockCode: "DB-PIT-A1",
    leaseId: "ML-MH-BHD-1962-09",
    name: "Central Lode Bench 4",
    mineName: "Dongri Buzurg Mine",
    sector: "Central Pit High-Wall",
    unfcCategory: "UNFC-111",
    areaHectares: 8.45,
    benchRL: 285.5,
    benchHeightM: 10.0,
    coordinates: [
      [79.6710, 21.6515],
      [79.6745, 21.6528],
      [79.6758, 21.6508],
      [79.6722, 21.6495]
    ],
    measuredReservesMT: 4.85,
    indicatedReservesMT: 2.10,
    inferredReservesMT: 0.95,
    predictedAIGradeMnPct: 43.8,
    actualLabMnPct: 44.1,
    phosphorusPct: 0.11,
    strippingRatio: 2.8,
    status: "Active Extraction",
    riskScore: 28,
    lastSurveyDate: "2026-09-12",
    dsmElevationM: 285.5
  },
  {
    id: "BLK-DB-02",
    blockCode: "DB-WEST-B2",
    leaseId: "ML-MH-BHD-1962-09",
    name: "Western Extension Footwall",
    mineName: "Dongri Buzurg Mine",
    sector: "West Fault Boundary",
    unfcCategory: "UNFC-121",
    areaHectares: 12.30,
    benchRL: 270.0,
    benchHeightM: 12.0,
    coordinates: [
      [79.6680, 21.6502],
      [79.6708, 21.6514],
      [79.6718, 21.6488],
      [79.6685, 21.6475]
    ],
    measuredReservesMT: 3.12,
    indicatedReservesMT: 4.40,
    inferredReservesMT: 1.85,
    predictedAIGradeMnPct: 41.2,
    actualLabMnPct: 40.8,
    phosphorusPct: 0.16,
    strippingRatio: 3.6,
    status: "Blasting Scheduled",
    riskScore: 68,
    lastSurveyDate: "2026-09-14",
    dsmElevationM: 270.0
  },
  {
    id: "BLK-DB-03",
    blockCode: "DB-NORTH-DEEP",
    leaseId: "ML-MH-BHD-1962-09",
    name: "North syncline Deep Horizon",
    mineName: "Dongri Buzurg Mine",
    sector: "Sub-surface Exploration Zone",
    unfcCategory: "UNFC-122",
    areaHectares: 15.60,
    benchRL: 245.0,
    benchHeightM: 15.0,
    coordinates: [
      [79.6730, 21.6540],
      [79.6775, 21.6552],
      [79.6788, 21.6530],
      [79.6740, 21.6520]
    ],
    measuredReservesMT: 1.80,
    indicatedReservesMT: 5.60,
    inferredReservesMT: 3.90,
    predictedAIGradeMnPct: 46.5,
    actualLabMnPct: 45.9,
    phosphorusPct: 0.09,
    strippingRatio: 4.2,
    status: "Exploration Drilling",
    riskScore: 42,
    lastSurveyDate: "2026-09-10",
    dsmElevationM: 245.0
  },
  {
    id: "BLK-DB-04",
    blockCode: "DB-SUMP-S1",
    leaseId: "ML-MH-BHD-1962-09",
    name: "Pit Bottom Drainage Sump",
    mineName: "Dongri Buzurg Mine",
    sector: "Southern Floor Depression",
    unfcCategory: "UNFC-333",
    areaHectares: 5.20,
    benchRL: 232.0,
    benchHeightM: 8.0,
    coordinates: [
      [79.6705, 21.6480],
      [79.6735, 21.6492],
      [79.6742, 21.6470],
      [79.6712, 21.6462]
    ],
    measuredReservesMT: 0.65,
    indicatedReservesMT: 1.10,
    inferredReservesMT: 2.20,
    predictedAIGradeMnPct: 38.4,
    actualLabMnPct: 37.9,
    phosphorusPct: 0.22,
    strippingRatio: 5.1,
    status: "Dewatering",
    riskScore: 84,
    lastSurveyDate: "2026-09-15",
    dsmElevationM: 232.0
  }
];

export const INITIAL_BOREHOLES: BoreholeRecord[] = [
  {
    id: "BH-DB-2026-101",
    collarId: "BH-101 (Grid 4N-12E)",
    x: 79.6725,
    y: 21.6518,
    elevationRL: 312.4,
    depthMeters: 145.0,
    drilledDate: "2026-08-18",
    coreRecoveryPct: 94.2,
    assays: [
      { fromMeters: 0, toMeters: 28, mnGradePct: 12.4, fePct: 44.5, phosphorusPct: 0.28, silicaPct: 22.1, lithology: "Overburden Laterite" },
      { fromMeters: 28, toMeters: 62, mnGradePct: 8.2, fePct: 24.1, phosphorusPct: 0.18, silicaPct: 48.6, lithology: "Quartzite Hanging Wall" },
      { fromMeters: 62, toMeters: 114, mnGradePct: 46.8, fePct: 7.2, phosphorusPct: 0.08, silicaPct: 9.4, lithology: "Braunite-Rich Ore" },
      { fromMeters: 114, toMeters: 135, mnGradePct: 39.5, fePct: 11.4, phosphorusPct: 0.12, silicaPct: 14.8, lithology: "Pyrolusite Lode" },
      { fromMeters: 135, toMeters: 145, mnGradePct: 4.5, fePct: 18.2, phosphorusPct: 0.15, silicaPct: 58.2, lithology: "Schist Footwall" }
    ]
  },
  {
    id: "BH-DB-2026-102",
    collarId: "BH-102 (Grid 6N-08W)",
    x: 79.6698,
    y: 21.6506,
    elevationRL: 308.1,
    depthMeters: 160.0,
    drilledDate: "2026-08-25",
    coreRecoveryPct: 91.8,
    assays: [
      { fromMeters: 0, toMeters: 34, mnGradePct: 10.1, fePct: 42.0, phosphorusPct: 0.31, silicaPct: 24.5, lithology: "Overburden Laterite" },
      { fromMeters: 34, toMeters: 75, mnGradePct: 6.4, fePct: 21.0, phosphorusPct: 0.19, silicaPct: 52.0, lithology: "Quartzite Hanging Wall" },
      { fromMeters: 75, toMeters: 128, mnGradePct: 44.2, fePct: 8.5, phosphorusPct: 0.11, silicaPct: 11.2, lithology: "Braunite-Rich Ore" },
      { fromMeters: 128, toMeters: 160, mnGradePct: 5.1, fePct: 16.5, phosphorusPct: 0.14, silicaPct: 61.0, lithology: "Schist Footwall" }
    ]
  },
  {
    id: "BH-DB-2026-103",
    collarId: "BH-103 (Deep Infill)",
    x: 79.6750,
    y: 21.6535,
    elevationRL: 318.9,
    depthMeters: 185.0,
    drilledDate: "2026-09-02",
    coreRecoveryPct: 96.5,
    assays: [
      { fromMeters: 0, toMeters: 45, mnGradePct: 9.8, fePct: 39.5, phosphorusPct: 0.26, silicaPct: 28.0, lithology: "Overburden Laterite" },
      { fromMeters: 45, toMeters: 88, mnGradePct: 47.9, fePct: 6.1, phosphorusPct: 0.07, silicaPct: 8.2, lithology: "Braunite-Rich Ore" },
      { fromMeters: 88, toMeters: 142, mnGradePct: 42.5, fePct: 9.8, phosphorusPct: 0.10, silicaPct: 12.0, lithology: "Pyrolusite Lode" },
      { fromMeters: 142, toMeters: 185, mnGradePct: 3.8, fePct: 15.2, phosphorusPct: 0.13, silicaPct: 64.5, lithology: "Schist Footwall" }
    ]
  }
];

export const INITIAL_EQUIPMENT: EquipmentTelemetry[] = [
  {
    unitId: "EX-101",
    type: "Excavator",
    model: "Komatsu PC1250-8R (6.7 m³ bucket)",
    status: "Operational",
    healthScorePct: 92,
    currentLocationBlock: "DB-PIT-A1 (Bench 4)",
    operatingHoursToday: 6.8,
    fuelLevelPct: 78,
    vibrationAlert: false,
    hydraulicPressurePsi: 4650,
    nextServiceDueHrs: 180
  },
  {
    unitId: "EX-104",
    type: "Excavator",
    model: "Tata Hitachi EX1200V",
    status: "Degraded",
    healthScorePct: 58,
    currentLocationBlock: "DB-WEST-B2 (Bench 2)",
    operatingHoursToday: 3.2,
    fuelLevelPct: 45,
    vibrationAlert: true,
    hydraulicPressurePsi: 3820,
    nextServiceDueHrs: 12
  },
  {
    unitId: "DMP-204",
    type: "Dumper",
    model: "Caterpillar 773E (55-Tonne Rigid)",
    status: "Operational",
    healthScorePct: 88,
    currentLocationBlock: "Haul Road 3 to Crusher",
    operatingHoursToday: 7.1,
    fuelLevelPct: 64,
    vibrationAlert: false,
    hydraulicPressurePsi: 2950,
    nextServiceDueHrs: 240
  },
  {
    unitId: "DMP-212",
    type: "Dumper",
    model: "BEML BH60M (60 Tonne)",
    status: "Maintenance",
    healthScorePct: 34,
    currentLocationBlock: "Central Workshop Yard",
    operatingHoursToday: 0.0,
    fuelLevelPct: 90,
    vibrationAlert: true,
    hydraulicPressurePsi: 1100,
    nextServiceDueHrs: 0
  },
  {
    unitId: "BLST-01",
    type: "Blast Drill Rig",
    model: "Atlas Copco ROC D7 Top Hammer",
    status: "Operational",
    healthScorePct: 86,
    currentLocationBlock: "DB-WEST-B2 Pattern 4",
    operatingHoursToday: 5.4,
    fuelLevelPct: 82,
    vibrationAlert: false,
    hydraulicPressurePsi: 3400,
    nextServiceDueHrs: 95
  },
  {
    unitId: "PUMP-08",
    type: "Dewatering Pump",
    model: "Kirloskar Multistage Submersible (120 HP)",
    status: "Operational",
    healthScorePct: 95,
    currentLocationBlock: "DB-SUMP-S1",
    operatingHoursToday: 21.4,
    fuelLevelPct: 100,
    vibrationAlert: false,
    hydraulicPressurePsi: 1850,
    nextServiceDueHrs: 320
  }
];

export const INITIAL_SPACE_WEATHER: SpaceWeatherTelemetry = {
  satelliteProvider: "Copernicus Sentinel-2 MSI",
  acquisitionTimestamp: "2026-09-16T05:32:00Z",
  rainfallPast24hMm: 48.6,
  rainfall7DayCumulativeMm: 112.4,
  soilMoistureSaturationPct: 76.5,
  ndviVegetationIndex: 0.24,
  landSurfaceTemperatureC: 32.8,
  cloudCoverPct: 18.0,
  pitSlopePorePressureKPa: 142.0,
  weatherRiskAlert: "ELEVATED"
};

export const INITIAL_SHORTFALL_PREDICTIONS: ShortfallPrediction[] = [
  {
    horizon: "7-Day",
    targetProductionMT: 12500,
    predictedProductionMT: 9800,
    shortfallVolumeMT: 2700,
    probabilityPct: 74,
    severity: "HIGH",
    topDrivers: [
      { driver: "Rainfall & Bench Incline Slurry (Haul Speed down 45%)", impactMT: 1450, contributionPct: 53.7 },
      { driver: "Excavator EX-104 Hydraulic Pump Cavitation", impactMT: 850, contributionPct: 31.5 },
      { driver: "Blasting Pattern Wet Hole Loading Delays", impactMT: 400, contributionPct: 14.8 }
    ]
  },
  {
    horizon: "30-Day",
    targetProductionMT: 48000,
    predictedProductionMT: 41200,
    shortfallVolumeMT: 6800,
    probabilityPct: 68,
    severity: "HIGH",
    topDrivers: [
      { driver: "Bench 2 West Blasting Delay & DGMS Vibration Zone", impactMT: 3100, contributionPct: 45.6 },
      { driver: "Dumper Fleet Maintenance Staggering", impactMT: 2200, contributionPct: 32.4 },
      { driver: "Monsoon Infiltration at Sump Pit RL +232m", impactMT: 1500, contributionPct: 22.0 }
    ]
  },
  {
    horizon: "90-Day",
    targetProductionMT: 145000,
    predictedProductionMT: 139500,
    shortfallVolumeMT: 5500,
    probabilityPct: 38,
    severity: "MODERATE",
    topDrivers: [
      { driver: "Deep Syncline Overburden Stripping Deficit", impactMT: 3200, contributionPct: 58.2 },
      { driver: "Crusher Plant Secondary Screen Wear", impactMT: 2300, contributionPct: 41.8 }
    ]
  }
];

export const INITIAL_ACTION_SCENARIOS: ActionPilotScenario[] = [
  {
    id: "ACT-SCEN-01",
    title: "Divert Excavator Fleet to High-wall Bench 4 East & Dry Bench Extraction",
    targetHorizon: "Immediate (Next Shift)",
    category: "Mine Schedule",
    tonnesProtectedMT: 3200,
    costImpactLakhs: 24.5,
    feasibilityScorePct: 94,
    safetyCompliance: "DGMS Open-Cast Slope Guideline compliant; Bench width 22m > 3x excavator width.",
    actions: [
      "Shift Komatsu PC1250 from waterlogged Bench 2 West to dry elevated Bench 4 East (RL 285.5m).",
      "Route dumper traffic via Upper East Ramp avoiding slippery Sump incline.",
      "Target high-grade braunite zone (44.1% Mn) to maintain shipment blending grade."
    ],
    status: "Approved by Mine Manager",
    auditableTrail: {
      approvedBy: "Er. Rajesh K. Mishra (Agent / Mine Manager, Dongri Buzurg)",
      approvedAt: "2026-09-16 08:30 IST",
      notes: "Approved under contingency protocol CP-04. Shift in charge instructed to log haul speeds."
    }
  },
  {
    id: "ACT-SCEN-02",
    title: "Electronic Detonator Precision Blasting & Non-Electric Buffer Timing",
    targetHorizon: "7-Day Tactical",
    category: "Blasting Optimization",
    tonnesProtectedMT: 4600,
    costImpactLakhs: 18.2,
    feasibilityScorePct: 89,
    safetyCompliance: "Complies with DGMS Tech Circular 3; Ground vibration peak particle velocity < 5 mm/s.",
    actions: [
      "Convert 48 wet blast holes in Block DB-WEST-B2 to emulsion slurry with 25ms staggered delays.",
      "Mitigate fly-rock risk to preserve nearby 33kV transmission corridor.",
      "Generate 28,000 tonnes of well-fragmented ore with mean block size < 350mm."
    ],
    status: "Proposed",
    auditableTrail: {}
  },
  {
    id: "ACT-SCEN-03",
    title: "Deploy Auxiliary Dewatering Sump Booster & Rapid Slurry Drainage",
    targetHorizon: "7-Day Tactical",
    category: "Water Drainage",
    tonnesProtectedMT: 2400,
    costImpactLakhs: 12.0,
    feasibilityScorePct: 96,
    safetyCompliance: "Safe toe clearance maintained; hydrostatic pore pressure reduced by 35 kPa.",
    actions: [
      "Commission second 120 HP submersible pump at Sump RL +232m.",
      "Clear 6,400 m³ standing pond water within 18 hours to reopen Pit Floor haul access."
    ],
    status: "Proposed",
    auditableTrail: {}
  }
];

export const INITIAL_TOPO_HAZARDS: TopoHazardError[] = [
  {
    id: "TOPO-01",
    type: "SLOPE_OVERHANG",
    severity: "CRITICAL",
    blockId: "BLK-DB-02",
    location: "West Extension Bench 2 (RL 270m)",
    description: "DSM profile detects 78° overhang angle exceeding statutory 60° limit. Risk of wedge failure along bedding plane.",
    detectedBy: "DSM/DTM LiDAR Gradient",
    suggestedFix: "Execute mechanical scaling with backhoe breaker; trim crest to 55° repose angle.",
    autoFixAvailable: true,
    status: "PENDING"
  },
  {
    id: "TOPO-02",
    type: "HAUL_ROAD_SATURATION",
    severity: "WARNING",
    blockId: "BLK-DB-04",
    location: "Incline Ramp 3 (RL 250m to 232m)",
    description: "NASA SMAP and ground sensor detect 76.5% moisture saturation. Coefficient of traction decreased by 40%.",
    detectedBy: "InSAR Subsidence",
    suggestedFix: "Lay 150mm crushed quartzite ballast; grade ditch drains along road toe.",
    autoFixAvailable: true,
    status: "PENDING"
  },
  {
    id: "TOPO-03",
    type: "BUFFER_BREACH",
    severity: "WARNING",
    blockId: "BLK-DB-01",
    location: "Mining Lease Boundary Pillar 14",
    description: "Pit rim approach within 42 meters of statutory 50m barrier with neighboring forest boundary.",
    detectedBy: "Drone Photogrammetry",
    suggestedFix: "Establish rigid geo-fence alert; adjust berm safety bund alignment.",
    autoFixAvailable: false,
    status: "RESOLVED"
  }
];

export const INITIAL_ROVER_TASKS: GroundTruthingRoverTask[] = [
  {
    id: "GT-ROV-01",
    boreholeOrCollarId: "BH-DB-2026-103",
    blockCode: "DB-NORTH-DEEP",
    gnssCoordinates: {
      latitude: 21.6535,
      longitude: 79.6750,
      altitudeM: 318.9,
      rtkAccuracyCm: 1.4,
      satelliteCount: 22
    },
    geologistAssignee: "Dr. Ananya Sen (Chief Geologist)",
    lithologySample: "Dense Black Braunite with Braunite-Pyrolusite banding",
    fieldMnReadingPct: 47.8,
    labVerifiedMnPct: 47.9,
    syncStatus: "SYNCED",
    updatedAt: "2026-09-16 07:15"
  },
  {
    id: "GT-ROV-02",
    boreholeOrCollarId: "BH-DB-2026-104 (Infill-A)",
    blockCode: "DB-WEST-B2",
    gnssCoordinates: {
      latitude: 21.6508,
      longitude: 79.6702,
      altitudeM: 298.4,
      rtkAccuracyCm: 2.1,
      satelliteCount: 19
    },
    geologistAssignee: "S. K. Verma (Geotechnical Officer)",
    lithologySample: "Ferruginous Manganese Ore with Gondite lenses",
    fieldMnReadingPct: 39.2,
    labVerifiedMnPct: 39.5,
    syncStatus: "FIELD_LOGGED",
    updatedAt: "2026-09-16 09:05"
  },
  {
    id: "GT-ROV-03",
    boreholeOrCollarId: "BH-DB-2026-105 (Bench Rim)",
    blockCode: "DB-PIT-A1",
    gnssCoordinates: {
      latitude: 21.6522,
      longitude: 79.6740,
      altitudeM: 305.2,
      rtkAccuracyCm: 1.8,
      satelliteCount: 20
    },
    geologistAssignee: "P. R. Deshmukh (Survey Surveyor)",
    lithologySample: "Pyrolusite Lode with crystalline quartz vugs",
    fieldMnReadingPct: 43.5,
    syncStatus: "QUEUED",
    updatedAt: "2026-09-16 09:20"
  }
];

// SIH 26009 6-Slide presentation deck data matching the user's PPT exactly!
export const SIH_PPT_SLIDES: SIHSlide[] = [
  {
    slideNumber: 1,
    title: "SMART INDIA HACKATHON 2026",
    subtitle: "Using AI/ML and Space Technology to Identify Manganese Reserves and Overcome Production Shortfalls",
    badge: "SIH26009",
    sections: [
      {
        heading: "Problem Statement Details",
        bullets: [
          "Problem Statement ID: SIH26009",
          "Problem Statement Title: Using AI/ML and Space Technology to Identify Manganese Reserves and Overcome Production Shortfalls.",
          "Theme: Space Technology & Software",
          "PS Category: Software",
          "Client Organization: MOIL Limited (Manganese Ore India Limited)"
        ]
      },
      {
        heading: "Team Identification",
        bullets: [
          "Team ID: CSPIT-SIH-951352",
          "Team Name: Team NeuroSpark Astra",
          "Objective: Transform manual survey & reserve estimates into a continuous, space-informed AI decision ecosystem."
        ],
        highlights: [
          { label: "Team ID", value: "CSPIT-SIH-951352" },
          { label: "PS ID", value: "SIH26009" },
          { label: "Client", value: "MOIL Limited" }
        ]
      }
    ],
    footerNote: "Team NeuroSpark Astra • SMART INDIA HACKATHON 2026"
  },
  {
    slideNumber: 2,
    title: "PROPOSED SOLUTION",
    subtitle: "MANGAN-ORBIT OPERATIONAL ECOSYSTEM",
    badge: "Ecosystem Architecture",
    sections: [
      {
        heading: "1. ReserveLens",
        content: "Evidence-weighted reserve intelligence for high-confidence spatial mapping.",
        bullets: [
          "1) Boreholes + Assays: Align geological and drilling evidence.",
          "2) Surface + Subsurface: Combine satellite proxies (Sentinel-2, CartoDEM) with drilling data.",
          "3) Data Gaps: Guide future survey priorities through active learning."
        ]
      },
      {
        heading: "2. Shortfall Sentinel",
        content: "Production risk forecasting over 7, 30, and 90-day operational windows.",
        bullets: [
          "1) Equipment Downtime: Models maintenance and availability risks.",
          "2) Weather + Blasting: Integrates rainfall, soil moisture, and blast delays.",
          "3) Risk Levels: Shows probability and contributing root causes."
        ]
      },
      {
        heading: "3. ActionPilot",
        content: "Prescriptive mine continuity engine for corrective intervention.",
        bullets: [
          "1) Scenario Simulation: Test face rescheduling and equipment redeployment.",
          "2) Action Ranking: Prioritise tonnes protected under safety constraints.",
          "3) Human Approval: Maintain an auditable decision trail for mine managers."
        ]
      },
      {
        heading: "THE NOVEL CLOSED LOOP",
        content: "MAP EVIDENCE  ➔  FORECAST  ➔  SIMULATE  ➔  CAPTURE  ➔  UPDATE",
        highlights: [
          { label: "Loop Step 1", value: "MAP EVIDENCE" },
          { label: "Loop Step 2", value: "FORECAST" },
          { label: "Loop Step 3", value: "SIMULATE" },
          { label: "Loop Step 4", value: "CAPTURE" },
          { label: "Loop Step 5", value: "UPDATE" }
        ]
      }
    ],
    footerNote: "MANGAN-ORBIT Closed-Loop Architecture • Team NeuroSpark Astra"
  },
  {
    slideNumber: 3,
    title: "TECHNICAL APPROACH",
    subtitle: "Data-to-Decision Architecture",
    badge: "5-Tier Pipeline",
    sections: [
      {
        heading: "Multi-Modal Inputs",
        bullets: [
          "🪨 Geological: Assays, Boreholes, Mine Plans, Lithological Cross-sections",
          "⛏️ Operational: Production records, Equipment fleet telemetry, Blast logs",
          "🛰️ Space & Weather: Rainfall (IMD 0.25°), Soil moisture (SMAP), NDVI + Land Temp"
        ]
      },
      {
        heading: "Processing Stages",
        bullets: [
          "⚙️ STANDARDISE: Mine-coordinate alignment, Time synchronisation, Missing-data handling, QA/QC, Versioned data catalogue.",
          "🧠 + 🛰️ GEO-AI FUSION: Spatial feature engineering, Satellite time-series, Borehole/assay features, Geological constraints.",
          "📈 FORECAST: Reserve-confidence model, 7 / 30 / 90-day production forecast, Shortfall probability, Uncertainty intervals.",
          "⚙️ OPTIMISE: Mine schedule optimisation, Blast optimisation, Maintenance planning, Equipment redeployment.",
          "🖥️ PRESENT: GIS dashboard, Risk alerts, Evidence cards, Action queue & statutory reports."
        ]
      }
    ],
    footerNote: "Data-to-Decision Architecture • Smart India Hackathon 2026"
  },
  {
    slideNumber: 4,
    title: "FEASIBILITY & VIABILITY",
    subtitle: "From Existing Data to Real-World Deployment",
    badge: "Roadmap & Risks",
    sections: [
      {
        heading: "Technical Feasibility",
        bullets: [
          "01 Operational Data Onboarding: Leverages existing drilling logs, assay records, and equipment history. Progressive onboarding ensures zero disruption.",
          "02 Complementary Intelligence: Satellite data prioritizes zones and detects weather risks; complements rather than replaces high-fidelity drilling evidence.",
          "03 Human-in-the-Loop: Engineers retain final approval. System provides explainable evidence cards for every recommendation."
        ]
      },
      {
        heading: "Viability Pathway (Phased Timeline)",
        bullets: [
          "PHASE 1 (6–8 Weeks): Data Audit, GIS Prototype, Single Mine Pilot at Dongri Buzurg.",
          "PHASE 2 (8–12 Weeks): Multimodal Model, Scenario Engine, Retrospective Validation.",
          "PHASE 3 (Controlled Pilot): Shadow-mode alerts, Prospective measurement, Scale decision."
        ]
      },
      {
        heading: "Challenge / Risk & Mitigation Matrix",
        bullets: [
          "• Data Sparsity ➔ Active-learning survey queue & data-quality scoring.",
          "• Model Drift ➔ Champion-challenger models & scheduled revalidation.",
          "• Alert Fatigue ➔ Severity tiers & top-driver explanations.",
          "• Safety Conflicts ➔ Hard constraints for safety & DGMS statutory requirements.",
          "• Connectivity ➔ On-prem deployment option & offline report exports.",
          "• Adoption ➔ Co-design with geologists; evidence-based overrides."
        ]
      },
      {
        heading: "Architectural Principles",
        bullets: [
          "SUSTAINABLE BY DESIGN: Reusable platform configured per mine via data connectors.",
          "RESILIENT BY DESIGN: Operates with degraded-confidence flags if satellite feeds fail."
        ]
      }
    ],
    footerNote: "Technical Feasibility & Viability Pathway • Team NeuroSpark Astra"
  },
  {
    slideNumber: 5,
    title: "IMPACT AND BENEFITS",
    subtitle: "Baseline First — Targets Finalised with MOIL",
    badge: "KPIs & Flywheel",
    sections: [
      {
        heading: "Key Performance Indicators",
        bullets: [
          "⌖ Reserve Intelligence: Better identification and ranking of prospective mining zones.",
          "▥ Production Continuity: Earlier shortfall warnings and fewer avoidable production losses.",
          "⚙ Equipment Efficiency: Better visibility of downtime and smarter maintenance prioritisation.",
          "☁ Weather Resilience: Early identification of weather-sensitive work for timely replanning.",
          "▥ Decision Quality & Adoption: Evidence-based recommendations, clear accountability, and time saved in planning."
        ]
      },
      {
        heading: "Wider Outcomes",
        bullets: [
          "● Economic: Protect production, reduce idle fleet capacity.",
          "● Operational: Convert fragmented records into one unified decision system.",
          "● Environmental: Support better sequencing and monitoring (measure before claiming improvement).",
          "● Social & Governance: Improve transparency, preserve expert accountability, create auditable basis for decisions."
        ]
      },
      {
        heading: "Impact Flywheel",
        content: "EARLIER EVIDENCE ➔ EARLIER WARNING ➔ BETTER ACTION ➔ STEADIER SUPPLY ➔ BETTER DATA ➔ STRONGER MODEL"
      }
    ],
    footerNote: "Impact Flywheel & Outcomes • Team NeuroSpark Astra"
  },
  {
    slideNumber: 6,
    title: "RESEARCH AND REFERENCES",
    subtitle: "Authoritative Sources, Data Methods & Governance Integrity",
    badge: "Statutory Integrity",
    sections: [
      {
        heading: "01 Authoritative Sources",
        bullets: [
          "• MOIL Limited — official company context and historical mining records",
          "• Indian Bureau of Mines (IBM) — MCDR, 2017 & UNFC guidelines",
          "• IMD — 0.25° daily rainfall gridded data (1901–2024)",
          "• ISRO / NRSC Bhuvan — Geo & Earth observation datasets",
          "• NASA / JPL SMAP — Soil moisture products",
          "• DGMS — Directorate General of Mines Safety regulations & open-cast circulars"
        ]
      },
      {
        heading: "02 Data & Technical Methods",
        bullets: [
          "• Sentinel-2 multispectral imagery (Bands 2, 4, 8, 11, 12)",
          "• DEM-derived slope, drainage & terrain curvature",
          "• Cloud mask + acquisition-date documentation",
          "• Authorised MOIL boreholes, assays & structural geology",
          "• Production, dispatch & equipment telemetry feeds",
          "• Blasting, maintenance & shift logs"
        ]
      },
      {
        heading: "03 Model Evaluation & Reference Integrity",
        bullets: [
          "• Spatial & temporal holdout testing with cross-validation",
          "• Calibration curves, uncertainty intervals, ablation tests",
          "• Human review before any operational action is dispatched"
        ],
        content: "REFERENCE INTEGRITY: MANGAN-ORBIT is a decision-support and prioritisation layer — not a certified mineral reserve classification tool. Reserve, mine-planning and statutory decisions remain subject to authorised geological investigation, approved plans and applicable Indian mining rules (MCDR 2017 / Mines Act 1952)."
      }
    ],
    footerNote: "MANGAN-ORBIT: Evidence-led exploration. Forecast-led production. Human-approved action."
  }
];
