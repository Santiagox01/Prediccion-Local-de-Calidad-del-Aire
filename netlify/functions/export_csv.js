import { getSensorData, getOpenaqData, getTempoData } from './_shared_store.js';

function calculateAQI(pm25) {
  if (pm25 <= 9.0) return Math.round((50 / 9.0) * pm25);
  if (pm25 <= 35.4) return Math.round(((100 - 51) / (35.4 - 9.1)) * (pm25 - 9.1) + 51);
  if (pm25 <= 55.4) return Math.round(((150 - 101) / (55.4 - 35.5)) * (pm25 - 35.5) + 101);
  if (pm25 <= 125.4) return Math.round(((200 - 151) / (125.4 - 55.5)) * (pm25 - 55.5) + 151);
  if (pm25 <= 225.4) return Math.round(((300 - 201) / (225.4 - 125.5)) * (pm25 - 125.5) + 201);
  return Math.round(((500 - 301) / (525.4 - 225.5)) * (pm25 - 225.5) + 301);
}

export const handler = async (event) => {
  const sensorData = getSensorData();
  const openaqData = getOpenaqData();
  const tempoData = getTempoData();
  
  const mergedMap = new Map();
  
  if (sensorData.length > 0) {
    for (const sensor of sensorData) {
      const key = sensor.timestamp || new Date().toISOString();
      if (!mergedMap.has(key)) {
        mergedMap.set(key, {
          timestamp: key,
          lat: sensor.lat || 4.711,
          lon: sensor.lon || -74.0721,
          pm25_sensor: Number(sensor.pm2_5?.toFixed(1)),
          pm1_0: Number(sensor.pm1_0?.toFixed(1)),
          pm10_0: Number(sensor.pm10_0?.toFixed(1)),
          temp_c: Number(sensor.temp_c?.toFixed(1)),
          rh_pct: Number(sensor.rh_pct?.toFixed(1)),
          sensor_id: sensor.sensor_id
        });
      }
    }
  }
  
  if (openaqData.length > 0) {
    for (const openaq of openaqData) {
      const key = openaq.timestamp;
      const existing = mergedMap.get(key) || {
        timestamp: key,
        lat: openaq.lat || 4.711,
        lon: openaq.lon || -74.0721
      };
      existing.pm25_openaq = Number(openaq.value?.toFixed(1));
      existing.openaq_location = openaq.location;
      mergedMap.set(key, existing);
    }
  }
  
  if (tempoData.length > 0) {
    for (const tempo of tempoData) {
      const key = tempo.timestamp;
      const existing = mergedMap.get(key) || {
        timestamp: key,
        lat: tempo.lat || 4.711,
        lon: tempo.lon || -74.0721
      };
      existing.no2_tempo = Number(tempo.no2_tempo?.toFixed(1));
      existing.o3_tempo = Number(tempo.o3_tempo?.toFixed(1));
      if (tempo.aod) existing.aod = Number(tempo.aod?.toFixed(3));
      mergedMap.set(key, existing);
    }
  }
  
  const data = [];
  for (const [, record] of mergedMap) {
    const pm25 = record.pm25_sensor || record.pm25_openaq || 0;
    record.aqi = calculateAQI(pm25);
    record.alert_flag = record.aqi >= 101;
    data.push(record);
  }
  
  data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  if (!data || data.length === 0) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="unified_data.csv"',
        'Access-Control-Allow-Origin': '*'
      },
      body: 'timestamp,lat,lon,pm25_sensor,pm25_openaq,no2_tempo,o3_tempo,temp_c,rh_pct,aqi,alert_flag\n'
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
      'Content-Disposition': 'attachment; filename="unified_data.csv"',
      'Access-Control-Allow-Origin': '*'
    },
    body: csvContent
  };
};