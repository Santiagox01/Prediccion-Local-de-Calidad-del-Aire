import { getOpenaqData } from './_shared_store.js';

export const handler = async (event) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(getOpenaqData())
  };
};