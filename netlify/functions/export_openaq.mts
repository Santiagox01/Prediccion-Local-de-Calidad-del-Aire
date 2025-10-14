import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const headers = {
    'Content-Type': 'text/csv',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Disposition': 'attachment; filename="openaq_data.csv"'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Mock OpenAQ CSV data
    const csvData = `timestamp,location,lat,lon,parameter,value,unit,city,country
${new Date().toISOString()},Bogotá Centro,4.711,-74.0721,pm25,25.5,µg/m³,Bogotá,CO
${new Date(Date.now() - 3600000).toISOString()},Bogotá Norte,4.720,-74.070,pm25,30.2,µg/m³,Bogotá,CO`;

    return {
      statusCode: 200,
      headers,
      body: csvData
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error generating OpenAQ CSV export' })
    };
  }
};