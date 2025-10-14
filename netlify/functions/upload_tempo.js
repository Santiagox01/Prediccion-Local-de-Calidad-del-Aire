// Store for uploaded TEMPO data
let tempoData = [];

export const handler = async (event) => {
  if (event.httpMethod === 'POST') {
    try {
      const { rows } = JSON.parse(event.body);
      tempoData = rows || [];
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'TEMPO data uploaded successfully', count: tempoData.length })
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
  
  // GET request - return stored data
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(tempoData)
  };
};