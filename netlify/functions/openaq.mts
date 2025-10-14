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
    // Mock OpenAQ data for demonstration
    const mockData = [
      {
        timestamp: new Date().toISOString(),
        location: "Bogotá Centro",
        city: "Bogotá",
        lat: 4.711,
        lon: -74.0721,
        parameter: "pm25",
        value: 25.5,
        unit: "µg/m³",
        country: "CO"
      },
      {
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        location: "Bogotá Norte", 
        city: "Bogotá",
        lat: 4.720,
        lon: -74.070,
        parameter: "pm25",
        value: 30.2,
        unit: "µg/m³",
        country: "CO"
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
      body: JSON.stringify({ error: 'Error fetching OpenAQ data' })
    };
  }
};