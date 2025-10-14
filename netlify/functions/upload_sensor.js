// Store for uploaded sensor data
let sensorData = [];

export const handler = async (event) => {
  if (event.httpMethod === 'POST') {
    try {
      const { rows } = JSON.parse(event.body);
      sensorData = rows || [];
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'Sensor data uploaded successfully', count: sensorData.length })
      };
    } catch (error) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: error.message })
      };
    }
  }
  
  // GET request - return stored sensor data
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(sensorData)
  };
};