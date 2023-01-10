const fetch = require('node-fetch');

const handler = async (event) => {

  const movieName = event.queryStringParameters.s;
  const API_KEY = process.env.API_KEY;
  const URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}`;

  try {
    let res = await fetch(URL);
    let data = await res.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
    
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }