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
    // Return stored TEMPO data (empty for now, but uploads will populate this)
    const mockStoredData = [
      {
        timestamp: new Date().toISOString(),
        lat: 4.711,
        lon: -74.0721,
        no2_tempo: 16.5,
        o3_tempo: 43.8,
        aod: 0.26
      }
    ];

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(mockStoredData)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error fetching stored TEMPO data' })
    };
  }
};