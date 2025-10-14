// OpenAQ API proxy
export const handler = async (event) => {
  const { city, lat, lon } = event.queryStringParameters || {};
  
  try {
    // Mock data for OpenAQ API - in a real app, you'd call the actual OpenAQ API
    const mockData = [
      {
        timestamp: new Date().toISOString(),
        city: city || "Bogotá",
        lat: parseFloat(lat) || 4.711,
        lon: parseFloat(lon) || -74.0721,
        parameter: "pm25",
        value: 25.3,
        unit: "µg/m³",
        location: "Station 1"
      },
      {
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        city: city || "Bogotá",
        lat: parseFloat(lat) || 4.711,
        lon: parseFloat(lon) || -74.0721,
        parameter: "pm25",
        value: 28.1,
        unit: "µg/m³",
        location: "Station 1"
      }
    ];
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(mockData)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};