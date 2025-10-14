// Store and retrieve TEMPO data
let tempoData = [];

export const handler = async (event) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(tempoData)
  };
};