// TEMPO satellite data API
export const handler = async (event) => {
  const { lat, lon, sample } = event.queryStringParameters || {};
  
  try {
    // Mock data for TEMPO satellite data - in a real app, you'd call NASA Earthdata API
    const mockData = [
      {
        timestamp: new Date().toISOString(),
        lat: parseFloat(lat) || 4.711,
        lon: parseFloat(lon) || -74.0721,
        no2_tempo: 15.2,
        o3_tempo: 45.8,
        aod: 0.25
      },
      {
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        lat: parseFloat(lat) || 4.711,
        lon: parseFloat(lon) || -74.0721,
        no2_tempo: 18.7,
        o3_tempo: 42.3,
        aod: 0.31
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