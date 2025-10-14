// Store and retrieve OpenAQ data
let openaqData = [];

export const handler = async (event) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(openaqData)
  };
};