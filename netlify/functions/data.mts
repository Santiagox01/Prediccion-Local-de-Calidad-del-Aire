import { Handler } from '@netlify/functions';

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
    // Mock unified data for Power BI connection
    const now = Date.now();
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
        city: "Bogotá",
        source: "unified"
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
        city: "Bogotá",
        source: "unified"
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
        city: "Bogotá",
        source: "unified"
      }
    ];

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(mockData)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error fetching data for Power BI' })
    };
  }
};