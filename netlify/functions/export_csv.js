// Export unified data as CSV
export const handler = async (event) => {
  // Mock unified data for CSV export
  const data = [
    {
      timestamp: new Date().toISOString(),
      lat: 4.711,
      lon: -74.0721,
      pm25_sensor: 25.3,
      pm25_openaq: 23.8,
      no2_tempo: 15.2,
      o3_tempo: 45.8,
      temp_c: 22.5,
      rh_pct: 65.2,
      aqi: 78,
      alert_flag: false
    },
    {
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      lat: 4.711,
      lon: -74.0721,
      pm25_sensor: 28.1,
      pm25_openaq: 26.5,
      no2_tempo: 18.7,
      o3_tempo: 42.3,
      temp_c: 23.1,
      rh_pct: 63.8,
      aqi: 85,
      alert_flag: false
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
      'Content-Disposition': 'attachment; filename="unified_data.csv"',
      'Access-Control-Allow-Origin': '*'
    },
    body: csvContent
  };
};