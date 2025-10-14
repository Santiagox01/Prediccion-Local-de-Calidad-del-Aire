// Merge data from all sources
let sensorData = [];
let openaqData = [];
let tempoData = [];

// Calculate AQI based on PM2.5 (EPA 2024 standard)
function calculateAQI(pm25) {
  if (pm25 <= 9.0) return Math.round((50 / 9.0) * pm25);
  if (pm25 <= 35.4) return Math.round(((100 - 51) / (35.4 - 9.1)) * (pm25 - 9.1) + 51);
  if (pm25 <= 55.4) return Math.round(((150 - 101) / (55.4 - 35.5)) * (pm25 - 35.5) + 101);
  if (pm25 <= 125.4) return Math.round(((200 - 151) / (125.4 - 55.5)) * (pm25 - 55.5) + 151);
  if (pm25 <= 225.4) return Math.round(((300 - 201) / (225.4 - 125.5)) * (pm25 - 125.5) + 201);
  return Math.round(((500 - 301) / (525.4 - 225.5)) * (pm25 - 225.5) + 301);
}

// Calculate distance between two coordinates (Haversine formula)
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { city, lat, lon, radiusKm = 50 } = JSON.parse(event.body);
    
    // Generate mock unified data for demonstration
    const currentTime = new Date();
    const unifiedData = [];
    
    // Create sample merged data
    for (let i = 0; i < 24; i++) {
      const timestamp = new Date(currentTime.getTime() - (i * 3600000)).toISOString();
      const pm25_sensor = 20 + Math.random() * 30;
      const pm25_openaq = pm25_sensor + (Math.random() - 0.5) * 10;
      const no2_tempo = 10 + Math.random() * 20;
      const o3_tempo = 30 + Math.random() * 40;
      const temp_c = 18 + Math.random() * 12;
      const rh_pct = 40 + Math.random() * 40;
      const aqi = calculateAQI(pm25_sensor);
      const alert_flag = aqi >= 101;
      
      unifiedData.push({
        timestamp,
        lat: lat || 4.711,
        lon: lon || -74.0721,
        pm25_sensor,
        pm25_openaq,
        no2_tempo,
        o3_tempo,
        temp_c,
        rh_pct,
        aqi,
        alert_flag
      });
    }
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(unifiedData)
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