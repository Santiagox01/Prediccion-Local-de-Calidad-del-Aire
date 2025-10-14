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
    // Mock TEMPO satellite data for demonstration
    const mockData = [
      {
        timestamp: new Date().toISOString(),
        lat: 4.711,
        lon: -74.0721,
        no2_tempo: 15.8,
        o3_tempo: 45.2,
        aod: 0.25
      },
      {
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        lat: 4.720,
        lon: -74.070,
        no2_tempo: 18.3,
        o3_tempo: 42.1,
        aod: 0.28
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
      body: JSON.stringify({ error: 'Error fetching TEMPO data' })
    };
  }
};