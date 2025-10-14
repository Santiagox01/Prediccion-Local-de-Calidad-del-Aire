// Unified data API endpoint for Power BI integration
export const handler = async (event) => {
  // Generate mock unified data
  const currentTime = new Date();
  const data = [];
  
  // Calculate AQI based on PM2.5 (EPA 2024 standard)
  function calculateAQI(pm25) {
    if (pm25 <= 9.0) return Math.round((50 / 9.0) * pm25);
    if (pm25 <= 35.4) return Math.round(((100 - 51) / (35.4 - 9.1)) * (pm25 - 9.1) + 51);
    if (pm25 <= 55.4) return Math.round(((150 - 101) / (55.4 - 35.5)) * (pm25 - 35.5) + 101);
    if (pm25 <= 125.4) return Math.round(((200 - 151) / (125.4 - 55.5)) * (pm25 - 55.5) + 151);
    if (pm25 <= 225.4) return Math.round(((300 - 201) / (225.4 - 125.5)) * (pm25 - 125.5) + 201);
    return Math.round(((500 - 301) / (525.4 - 225.5)) * (pm25 - 225.5) + 301);
  }
  
  // Generate 24 hours of sample data
  for (let i = 0; i < 24; i++) {
    const timestamp = new Date(currentTime.getTime() - (i * 3600000)).toISOString();
    const pm25_sensor = 15 + Math.random() * 25;
    const pm25_openaq = pm25_sensor + (Math.random() - 0.5) * 8;
    const no2_tempo = 8 + Math.random() * 15;
    const o3_tempo = 25 + Math.random() * 35;
    const temp_c = 18 + Math.random() * 10;
    const rh_pct = 45 + Math.random() * 30;
    const aqi = calculateAQI(pm25_sensor);
    const alert_flag = aqi >= 101;
    
    data.push({
      timestamp,
      lat: 4.711,
      lon: -74.0721,
      pm25_sensor: Number(pm25_sensor.toFixed(1)),
      pm25_openaq: Number(pm25_openaq.toFixed(1)),
      no2_tempo: Number(no2_tempo.toFixed(1)),
      o3_tempo: Number(o3_tempo.toFixed(1)),
      temp_c: Number(temp_c.toFixed(1)),
      rh_pct: Number(rh_pct.toFixed(1)),
      aqi,
      alert_flag
    });
  }
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    },
    body: JSON.stringify(data)
  };
};