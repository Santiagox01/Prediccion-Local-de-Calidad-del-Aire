import { Handler } from '@netlify/functions';

// Simple in-memory storage for demo purposes
let storedSensorData: any[] = [];
let storedOpenAQData: any[] = [];
let storedTEMPOData: any[] = [];

export const handler: Handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { city, lat, lon, radiusKm } = body;

    // Create unified records from all data sources
    const unifiedData: any[] = [];
    const now = Date.now();

    // Add sensor data
    storedSensorData.forEach(sensor => {
      unifiedData.push({
        timestamp: sensor.timestamp,
        lat: sensor.lat,
        lon: sensor.lon,
        pm25_sensor: sensor.pm2_5,
        pm10_sensor: sensor.pm10_0,
        pm1_sensor: sensor.pm1_0,
        temp_c: sensor.temp_c,
        rh_pct: sensor.rh_pct,
        aqi: calculateAQI(sensor.pm2_5),
        source: 'sensor'
      });
    });

    // Add OpenAQ data
    storedOpenAQData.forEach(openaq => {
      unifiedData.push({
        timestamp: openaq.timestamp,
        lat: openaq.lat,
        lon: openaq.lon,
        pm25_openaq: openaq.value,
        aqi: calculateAQI(openaq.value),
        source: 'openaq'
      });
    });

    // Add TEMPO data
    storedTEMPOData.forEach(tempo => {
      unifiedData.push({
        timestamp: tempo.timestamp,
        lat: tempo.lat,
        lon: tempo.lon,
        no2_tempo: tempo.no2_tempo,
        o3_tempo: tempo.o3_tempo,
        aod: tempo.aod,
        aqi: calculateAQI(null), // TEMPO doesn't have PM2.5
        source: 'tempo'
      });
    });

    // If no data exists, create some mock data for demonstration
    if (unifiedData.length === 0) {
      const mockData = [
        {
          timestamp: new Date().toISOString(),
          lat: 4.711,
          lon: -74.0721,
          pm25_sensor: 25.5,
          pm25_openaq: 28.3,
          no2_tempo: 15.8,
          o3_tempo: 45.2,
          aqi: 85,
          source: 'mock'
        },
        {
          timestamp: new Date(now - 3600000).toISOString(),
          lat: 4.720,
          lon: -74.070,
          pm25_sensor: 30.2,
          pm25_openaq: 32.1,
          no2_tempo: 18.3,
          o3_tempo: 42.1,
          aqi: 95,
          source: 'mock'
        },
        {
          timestamp: new Date(now - 7200000).toISOString(),
          lat: 4.705,
          lon: -74.075,
          pm25_sensor: 22.8,
          pm25_openaq: 24.5,
          no2_tempo: 12.5,
          o3_tempo: 48.7,
          aqi: 75,
          source: 'mock'
        }
      ];
      unifiedData.push(...mockData);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(unifiedData)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error merging data sources' })
    };
  }
};

function calculateAQI(pm25: number | null): number | null {
  if (pm25 === null) return null;
  // Simplified AQI calculation for PM2.5
  if (pm25 <= 12.0) return Math.round(pm25 * 50 / 12.0);
  if (pm25 <= 35.4) return Math.round(50 + (pm25 - 12.0) * 50 / 23.4);
  if (pm25 <= 55.4) return Math.round(100 + (pm25 - 35.4) * 50 / 20.0);
  if (pm25 <= 150.4) return Math.round(150 + (pm25 - 55.4) * 50 / 95.0);
  if (pm25 <= 250.4) return Math.round(200 + (pm25 - 150.4) * 100 / 100.0);
  return Math.round(300 + (pm25 - 250.4) * 100 / 99.6);
}