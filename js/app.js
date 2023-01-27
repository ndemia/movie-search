// UI variables
const searchButton = document.querySelector('.btn--submit');



async function fetchMovie (movieName) {

  const response = await fetch(`/.netlify/functions/fetch-movie?s=${movieName}`);
  const movieSearchResults = await response.json();
  return movieSearchResults;

};



function disableForm (e) {

  // Disable input but while keeping its value because it disappers with the disabled HTML attribute
  e.target.firstElementChild.classList.toggle('search__box--disabled');
  e.target.firstElementChild.setAttribute('disabled', true);
  e.target.firstElementChild.setAttribute('value', e.target.value);

  // Disable submit button
  e.target.lastElementChild.setAttribute('disabled', true);
  e.target.lastElementChild.classList.toggle('btn--disabled');

  // Remove focus and active states that remain after the button is clicked
  e.target.blur();
}


  
function enableForm (e) {

  // Enable input
  e.target.firstElementChild.classList.toggle('search__box--disabled');
  e.target.firstElementChild.removeAttribute('disabled');

  // Enable submit button
  e.target.lastElementChild.removeAttribute('disabled');
  e.target.lastElementChild.classList.toggle('btn--disabled');
}



function toggleLoader () {
  document.querySelector('.loader').classList.toggle('hidden');
}



function showResults (searchResults) {

  // If movie not found

  searchResults.Search.forEach((movie, index) => {

    console.log(movie)
    
    document.querySelector('.search-results').insertAdjacentHTML('beforeend',
    `<div class="card">
      <figure class="card__figure">
        <img class="card__image" src="${movie.Poster}" alt="${movie.Title} poster">
      </figure>
      <h2 class="card__title">${movie.Title}</h2>
      <h3 class="card__year">${movie.Year}</h3>
    </div>`);
  });
}



document.querySelector('.search').addEventListener('submit', (e) => {

  console.log('a')
  e.preventDefault();

  let movieName = document.querySelector('.search__box').value;

  disableForm(e);

  toggleLoader();

  // Simulate delay for illustration purposes
  setTimeout(() => {

    fetchMovie(movieName)
      .then((searchResults) => {

        showResults(searchResults);
        toggleLoader();
        enableForm(e);
      })
      .catch((error) => console.log(error));

  }, 3000);
});