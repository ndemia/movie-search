import fetch from 'node-fetch';

export const handler = async (event) => {
  const movieName = event.queryStringParameters.s;
  const pageNumber = event.queryStringParameters.page;

  const API_KEY = process.env.API_KEY;
  const URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}&type=movie&page=${pageNumber}`;

  try {
    let response = await fetch(URL);
    let movieSearchResults = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(movieSearchResults),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    };
  }
};
