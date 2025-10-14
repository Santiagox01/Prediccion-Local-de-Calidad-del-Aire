import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const headers = {
    'Content-Type': 'text/csv',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Disposition': 'attachment; filename="unified_data.csv"'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Mock unified CSV data
    const csvData = `timestamp,lat,lon,pm25_sensor,pm25_openaq,no2_tempo,o3_tempo,aqi,city,source
${new Date().toISOString()},4.711,-74.0721,25.5,28.3,15.8,45.2,85,Bogotá,unified
${new Date(Date.now() - 3600000).toISOString()},4.720,-74.070,30.2,32.1,18.3,42.1,95,Bogotá,unified
${new Date(Date.now() - 7200000).toISOString()},4.705,-74.075,22.8,24.5,12.5,48.7,75,Bogotá,unified`;

    return {
      statusCode: 200,
      headers,
      body: csvData
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error generating CSV export' })
    };
  }
};