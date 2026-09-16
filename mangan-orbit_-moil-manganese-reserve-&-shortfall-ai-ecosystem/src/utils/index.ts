// Utility functions for GIS, coordinate projections, Reserve math and DSM slicing
import type { MineBlockParcel, BoreholeRecord } from "../types/index.ts";

// WGS84 bounding center for MOIL Dongri Buzurg / Balaghat Manganese belt
export const MOIL_ORIGIN = {
  lat: 21.6528,
  lng: 79.6742,
  utmZone: '44N'
};

/**
 * Calculates polygon area in Hectares using geodesic shoelace formula
 */
export function calculatePolygonAreaHa(coords: [number, number][]): number {
  if (coords.length < 3) return 0;
  let area = 0;
  const rad = Math.PI / 180;
  const earthRadiusM = 6378137;

  for (let i = 0; i < coords.length; i++) {
    const p1 = coords[i];
    const p2 = coords[(i + 1) % coords.length];
    const x1 = p1[0] * rad * Math.cos(p1[1] * rad) * earthRadiusM;
    const y1 = p1[1] * rad * earthRadiusM;
    const x2 = p2[0] * rad * Math.cos(p2[1] * rad) * earthRadiusM;
    const y2 = p2[1] * rad * earthRadiusM;
    area += (x1 * y2) - (x2 * y1);
  }
  const areaSqMeters = Math.abs(area) / 2;
  return +(areaSqMeters / 10000).toFixed(2);
}

/**
 * Computes estimated manganese ore reserve in Million Tonnes (MT)
 * Bulk Density of braunite ore in MOIL mines ~ 4.15 tonnes/m³
 */
export function estimateOreTonnageMT(
  areaHa: number,
  oreThicknessM: number,
  recoveryFactor = 0.85,
  specificGravity = 4.15
): number {
  const volumeCubicMeters = areaHa * 10000 * oreThicknessM;
  const tonnageTonnes = volumeCubicMeters * specificGravity * recoveryFactor;
  return +(tonnageTonnes / 1_000_000).toFixed(3);
}

/**
 * Generate GeoJSON FeatureCollection from Mine Block Parcels
 */
export function exportToGeoJSON(parcels: MineBlockParcel[]): string {
  const featureCollection = {
    type: "FeatureCollection",
    name: "MOIL_Manganese_Blocks_UNFC",
    crs: {
      type: "name",
      properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" }
    },
    features: parcels.map((parcel) => ({
      type: "Feature",
      id: parcel.id,
      properties: {
        blockCode: parcel.blockCode,
        name: parcel.name,
        mineName: parcel.mineName,
        sector: parcel.sector,
        unfcCategory: parcel.unfcCategory,
        areaHectares: parcel.areaHectares,
        benchRL: parcel.benchRL,
        measuredReservesMT: parcel.measuredReservesMT,
        indicatedReservesMT: parcel.indicatedReservesMT,
        predictedAIGradeMnPct: parcel.predictedAIGradeMnPct,
        actualLabMnPct: parcel.actualLabMnPct,
        strippingRatio: parcel.strippingRatio,
        status: parcel.status,
        lastSurveyDate: parcel.lastSurveyDate
      },
      geometry: {
        type: "Polygon",
        coordinates: [parcel.coordinates.concat([parcel.coordinates[0]])]
      }
    }))
  };
  return JSON.stringify(featureCollection, null, 2);
}

/**
 * Generate PostGIS SQL statements for mining lease database ingestion
 */
export function exportToPostGIS(parcels: MineBlockParcel[]): string {
  const sqlLines: string[] = [
    `-- MOIL Limited - MANGAN-ORBIT PostGIS Ingestion Script`,
    `-- Generated on ${new Date().toISOString()}`,
    `-- Spatial Reference: EPSG:4326 (WGS 84)`,
    `CREATE TABLE IF NOT EXISTS moil_cadastral_mine_blocks (`,
    `  id VARCHAR(64) PRIMARY KEY,`,
    `  block_code VARCHAR(32) NOT NULL,`,
    `  mine_name VARCHAR(64) NOT NULL,`,
    `  sector VARCHAR(64),`,
    `  unfc_class VARCHAR(16),`,
    `  measured_reserves_mt NUMERIC(10,3),`,
    `  mn_grade_pct NUMERIC(5,2),`,
    `  geom GEOMETRY(Polygon, 4326)`,
    `);`,
    `CREATE INDEX IF NOT EXISTS moil_mine_blocks_gix ON moil_cadastral_mine_blocks USING GIST (geom);`,
    ``
  ];

  parcels.forEach((p) => {
    const coordsStr = p.coordinates
      .concat([p.coordinates[0]])
      .map(([lng, lat]) => `${lng} ${lat}`)
      .join(", ");
    sqlLines.push(
      `INSERT INTO moil_cadastral_mine_blocks (id, block_code, mine_name, sector, unfc_class, measured_reserves_mt, mn_grade_pct, geom) ` +
      `VALUES ('${p.id}', '${p.blockCode}', '${p.mineName}', '${p.sector}', '${p.unfcCategory}', ${p.measuredReservesMT}, ${p.predictedAIGradeMnPct}, ST_GeomFromText('POLYGON((${coordsStr}))', 4326)) ` +
      `ON CONFLICT (id) DO UPDATE SET measured_reserves_mt = EXCLUDED.measured_reserves_mt, mn_grade_pct = EXCLUDED.mn_grade_pct;`
    );
  });

  return sqlLines.join("\n");
}

/**
 * Generate synthetic Digital Surface Model (DSM) cross-section slice
 */
export function generateElevationProfile(benchRL: number, lengthMeters = 500, points = 30) {
  const profile: { distanceM: number; elevationM: number; oreBedElevationM: number; waterTableM: number }[] = [];
  const baseBench = benchRL;
  for (let i = 0; i <= points; i++) {
    const distanceM = Math.round((i / points) * lengthMeters);
    // realistic open-cast bench step profile
    const step = Math.floor(i / 6);
    const elevationM = +(baseBench + 25 - (step * 8) + Math.sin(i * 0.8) * 1.5).toFixed(1);
    const oreBedElevationM = +(elevationM - 12 - Math.cos(i * 0.5) * 2.2).toFixed(1);
    const waterTableM = +(baseBench - 8).toFixed(1);
    profile.push({ distanceM, elevationM, oreBedElevationM, waterTableM });
  }
  return profile;
}
