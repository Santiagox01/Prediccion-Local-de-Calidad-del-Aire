// Store for uploaded OpenAQ data
let openaqData = [];

export const handler = async (event) => {
  if (event.httpMethod === 'POST') {
    try {
      const { rows } = JSON.parse(event.body);
      openaqData = rows || [];
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'OpenAQ data uploaded successfully', count: openaqData.length })
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
    body: JSON.stringify(openaqData)
  };
};