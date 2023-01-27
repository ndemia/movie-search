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


// Show and hide the loader
function toggleLoader () {
  document.querySelector('.loader').classList.toggle('hidden');
}



function showResults (searchResults) {

  console.log(searchResults)

  searchResults.Search.forEach((movie, index) => {    
    document.querySelector('.search-results').insertAdjacentHTML('beforeend',
    `<div class="card">
      <figure class="card__figure">
        <img class="card__image" src="${movie.Poster}" alt="${movie.Title} poster">
      </figure>
      <h2 class="card__title" title="${movie.Title}">${movie.Title}</h2>
      <h3 class="card__year">${movie.Year}</h3>
    </div>`);
  });
}


// Search action
document.querySelector('.search').addEventListener('submit', (e) => {

  // Don't want the form to submit
  e.preventDefault();

  // Check if there are results present from a previous search, so to provide a clean state
  // If exists, save that NodeList of elements (each search result)
  if (cards = document.querySelectorAll('.card')) {

    // Iterate and remove all of them
    cards.forEach((card) => card.remove());
  }

  // Save the name of the movie to search
  let movieName = document.querySelector('.search__box').value;

  // Disable the form while searching, using the event as parameter
  disableForm(e);

  // Show loader while searching
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