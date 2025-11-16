import { getTempoData } from './_shared_store.js';

export const handler = async (event) => {
  const data = getTempoData();

  if (!data || data.length === 0) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="tempo_data.csv"',
        'Access-Control-Allow-Origin': '*'
      },
      body: 'timestamp,lat,lon,no2_tempo,o3_tempo,aod\n'
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
      'Content-Disposition': 'attachment; filename="tempo_data.csv"',
      'Access-Control-Allow-Origin': '*'
    },
    body: csvContent
  };
};