// Export TEMPO data as CSV
export const handler = async (event) => {
  const data = [
    {
      timestamp: new Date().toISOString(),
      lat: 4.711,
      lon: -74.0721,
      no2_tempo: 15.2,
      o3_tempo: 45.8,
      aod: 0.25
    }
  ];

  // Convert to CSV
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => row[header]).join(','))
  ].join('\\n');

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