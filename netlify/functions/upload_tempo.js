import { getTempoData, setTempoData } from './_shared_store.js';

export const handler = async (event) => {
  if (event.httpMethod === 'POST') {
    try {
      const { rows } = JSON.parse(event.body);
      setTempoData(rows || []);
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'TEMPO data uploaded successfully', count: getTempoData().length })
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
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(getTempoData())
  };
};