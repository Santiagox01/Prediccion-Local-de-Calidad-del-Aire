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
    // Return stored OpenAQ data (empty for now, but uploads will populate this)
    const mockStoredData = [
      {
        timestamp: new Date().toISOString(),
        location: "Bogotá Stored",
        lat: 4.711,
        lon: -74.0721,
        value: 27.8,
        parameter: "pm25",
        unit: "µg/m³"
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
      body: JSON.stringify({ error: 'Error fetching stored OpenAQ data' })
    };
  }
};