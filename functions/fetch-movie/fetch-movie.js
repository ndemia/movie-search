const fetch = require('node-fetch');

const handler = async (event) => {

  const movieName = event.queryStringParameters.s;
  const API_KEY = process.env.API_KEY;
  const URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}&type=movie`;

  try {
    let response = await fetch(URL);
    let movieSearchResults = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(movieSearchResults)
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString()
    };
  };
};

module.exports = { handler }