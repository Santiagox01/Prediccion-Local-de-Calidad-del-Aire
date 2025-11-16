import { getSensorData } from './_shared_store.js';

export const handler = async (event) => {
  const data = getSensorData();

  if (!data || data.length === 0) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="sensor_data.csv"',
        'Access-Control-Allow-Origin': '*'
      },
      body: 'timestamp,sensor_id,lat,lon,pm1_0,pm2_5,pm10_0,temp_c,rh_pct\n'
    };
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => row[header] ?? '').join(','))
  ].join('\n');

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="sensor_data.csv"',
      'Access-Control-Allow-Origin': '*'
    },
    body: csvContent
  };
};
