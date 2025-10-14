import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const headers = {
    'Content-Type': 'text/csv',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Disposition': 'attachment; filename="tempo_data.csv"'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Mock TEMPO CSV data
    const csvData = `timestamp,lat,lon,no2_tempo,o3_tempo,aod
${new Date().toISOString()},4.711,-74.0721,15.8,45.2,0.25
${new Date(Date.now() - 3600000).toISOString()},4.720,-74.070,18.3,42.1,0.28`;

    return {
      statusCode: 200,
      headers,
      body: csvData
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error generating TEMPO CSV export' })
    };
  }
};