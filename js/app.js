async function fetchMovie (movieName) {

  const response = await fetch(`/.netlify/functions/fetch-movie?s=${movieName}`);
  const movieSearchResults = await response.json();
  return movieSearchResults;
}

document.querySelector('.form__submit').addEventListener('click', (e) => {

  e.preventDefault();

  let movieName = document.querySelector('.form__input').value;

  fetchMovie(movieName)
    .then((results) => {console.log(results)})
    .catch((error) => console.log(error));

  // fetch(`/.netlify/functions/fetch-movie?s=${movieName}`)
  //   .then((response) => response.json())
  //   .then((content) => console.log(content.Search[0]))
  //   .catch((error) => console.log(error.message));

});