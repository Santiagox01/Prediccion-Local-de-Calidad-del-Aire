// Export OpenAQ data as CSV
export const handler = async (event) => {
  const data = [
    {
      timestamp: new Date().toISOString(),
      city: "Bogotá",
      lat: 4.711,
      lon: -74.0721,
      parameter: "pm25",
      value: 25.3,
      unit: "µg/m³",
      location: "Station 1"
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
      'Content-Disposition': 'attachment; filename="openaq_data.csv"',
      'Access-Control-Allow-Origin': '*'
    },
    body: csvContent
  };
};