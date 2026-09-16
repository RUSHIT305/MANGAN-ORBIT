export type UNFCClassification = 'UNFC-111' | 'UNFC-121' | 'UNFC-122' | 'UNFC-333' | 'UNFC-334';

export interface BoreholeRecord {
  id: string;
  collarId: string;
  x: number; // Local or Easting
  y: number; // Local or Northing
  elevationRL: number; // Reduced Level in meters
  depthMeters: number;
  drilledDate: string;
  coreRecoveryPct: number;
  assays: {
    fromMeters: number;
    toMeters: number;
    mnGradePct: number;
    fePct: number;
    phosphorusPct: number;
    silicaPct: number;
    lithology: 'Braunite-Rich Ore' | 'Pyrolusite Lode' | 'Quartzite Hanging Wall' | 'Schist Footwall' | 'Overburden Laterite';
  }[];
}

export interface MineBlockParcel {
  id: string;
  blockCode: string;
  leaseId: string;
  name: string;
  mineName: string;
  sector: string;
  unfcCategory: UNFCClassification;
  areaHectares: number;
  benchRL: number; // Bench level in meters
  benchHeightM: number;
  coordinates: [number, number][]; // Polygon vertices [lng/easting, lat/northing]
  measuredReservesMT: number; // Million Tonnes
  indicatedReservesMT: number;
  inferredReservesMT: number;
  predictedAIGradeMnPct: number;
  actualLabMnPct: number;
  phosphorusPct: number;
  strippingRatio: number; // Waste to Ore ratio (e.g. 3.2:1)
  status: 'Active Extraction' | 'Blasting Scheduled' | 'Exploration Drilling' | 'Dewatering' | 'Reclaimed';
  riskScore: number; // 0-100
  lastSurveyDate: string;
  dsmElevationM: number;
}

export interface EquipmentTelemetry {
  unitId: string;
  type: 'Excavator' | 'Dumper' | 'Blast Drill Rig' | 'Dewatering Pump' | 'Wheel Loader';
  model: string;
  status: 'Operational' | 'Degraded' | 'Maintenance' | 'Standby';
  healthScorePct: number;
  currentLocationBlock: string;
  operatingHoursToday: number;
  fuelLevelPct: number;
  vibrationAlert: boolean;
  hydraulicPressurePsi: number;
  nextServiceDueHrs: number;
}

export interface SpaceWeatherTelemetry {
  satelliteProvider: 'ISRO Bhuvan CartoDEM' | 'Copernicus Sentinel-2 MSI' | 'NASA SMAP L3';
  acquisitionTimestamp: string;
  rainfallPast24hMm: number;
  rainfall7DayCumulativeMm: number;
  soilMoistureSaturationPct: number;
  ndviVegetationIndex: number;
  landSurfaceTemperatureC: number;
  cloudCoverPct: number;
  pitSlopePorePressureKPa: number;
  weatherRiskAlert: 'NORMAL' | 'ELEVATED' | 'HAZARDOUS';
}

export interface ShortfallPrediction {
  horizon: '7-Day' | '30-Day' | '90-Day';
  targetProductionMT: number;
  predictedProductionMT: number;
  shortfallVolumeMT: number;
  probabilityPct: number;
  severity: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  topDrivers: {
    driver: string;
    impactMT: number;
    contributionPct: number;
  }[];
}

export interface ActionPilotScenario {
  id: string;
  title: string;
  targetHorizon: 'Immediate (Next Shift)' | '7-Day Tactical' | '30-Day Strategic';
  category: 'Mine Schedule' | 'Blasting Optimization' | 'Equipment Redeployment' | 'Water Drainage';
  tonnesProtectedMT: number;
  costImpactLakhs: number;
  feasibilityScorePct: number;
  safetyCompliance: string;
  actions: string[];
  status: 'Proposed' | 'Simulating' | 'Approved by Mine Manager' | 'Executed';
  auditableTrail: {
    approvedBy?: string;
    approvedAt?: string;
    notes?: string;
  };
}

export interface TopoHazardError {
  id: string;
  type: 'SLOPE_OVERHANG' | 'BENCH_CRACK_DISPLACEMENT' | 'BUFFER_BREACH' | 'HAUL_ROAD_SATURATION';
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  blockId: string;
  location: string;
  description: string;
  detectedBy: 'DSM/DTM LiDAR Gradient' | 'InSAR Subsidence' | 'Drone Photogrammetry';
  suggestedFix: string;
  autoFixAvailable: boolean;
  status: 'PENDING' | 'RESOLVED' | 'SUPPRESSED';
}

export interface GroundTruthingRoverTask {
  id: string;
  boreholeOrCollarId: string;
  blockCode: string;
  gnssCoordinates: {
    latitude: number;
    longitude: number;
    altitudeM: number;
    rtkAccuracyCm: number;
    satelliteCount: number;
  };
  geologistAssignee: string;
  lithologySample: string;
  fieldMnReadingPct: number;
  labVerifiedMnPct?: number;
  syncStatus: 'SYNCED' | 'QUEUED' | 'FIELD_LOGGED';
  updatedAt: string;
}

export interface SIHSlide {
  slideNumber: number;
  title: string;
  subtitle: string;
  badge: string;
  sections: {
    heading: string;
    bullets?: string[];
    content?: string;
    highlights?: { label: string; value: string }[];
  }[];
  footerNote?: string;
}
