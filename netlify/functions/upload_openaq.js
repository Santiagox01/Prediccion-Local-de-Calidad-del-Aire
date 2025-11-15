import { getOpenaqData, setOpenaqData } from './_shared_store.js';

export const handler = async (event) => {
  if (event.httpMethod === 'POST') {
    try {
      const { rows } = JSON.parse(event.body);
      setOpenaqData(rows || []);
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'OpenAQ data uploaded successfully', count: getOpenaqData().length })
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
    body: JSON.stringify(getOpenaqData())
  };
};