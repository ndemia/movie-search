async function fetchMovie(movieName) {
  const page = 1;
  const response = await fetch(`./.netlify/functions/fetch-movie?s=${movieName}&page=${page}`);
  const movieSearchResults = await response.json();
  return movieSearchResults;
}

function disableForm(e) {
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

function enableForm(e) {
  // Enable input
  e.target.firstElementChild.classList.toggle('search__box--disabled');
  e.target.firstElementChild.removeAttribute('disabled');

  // Enable submit button
  e.target.lastElementChild.removeAttribute('disabled');
  e.target.lastElementChild.classList.toggle('btn--disabled');
}

// Show and hide the loader
function toggleLoader() {
  document.querySelector('.icon--loader').classList.toggle('hidden');
}

function clearResultsSection() {
  // Check if there are results present from a previous search, so to provide a clean state
  // If it exists, save that NodeList of elements (each search result)
  if ((cards = document.querySelectorAll('.card'))) {
    // Iterate and remove all of them
    cards.forEach((card) => card.remove());
  }

  // Check if the 'Movie not found' error from a previous search is present
  // If it exists, remove
  if ((error = document.querySelector('.message--error'))) {
    error.remove();
  }
}

function showError() {
  document.querySelector('.search-results-container').insertAdjacentHTML(
    'beforeend',
    `<div class="message message--error">
    <span class="icon icon--error"></span>
    <p class="message__test">Movie not found :(</p>
  </div>`
  );
}

function showResults(searchResults) {
  // If no movie was found, show error
  if (searchResults.Response === 'False') {
    showError();
  } else {
    // Show the results
    searchResults.Search.forEach((movie) => {
      document.querySelector('.search-results-container').insertAdjacentHTML(
        'beforeend',
        `<div class="card">
        <figure class="card__figure">
          <img class="card__image" src="${movie.Poster}" alt="${movie.Title} poster">
        </figure>
        <h2 class="card__title" title="${movie.Title}">${movie.Title}</h2>
        <h3 class="card__year">${movie.Year}</h3>
      </div>`
      );
    });
  }
}

function showPagination(results) {
  const resultsShown = results.Search.length;
  const totalPages = Math.ceil(results.totalResults / 10);
  let currentPage = 1;

  // Show pagination at the top and at the bottom
  document
    .querySelector('.search-results')
    .insertAdjacentHTML(
      'afterbegin',
      `<div class="pagination"><span class="pagination__text">Showing ${resultsShown} of ${results.totalResults} results</span></div>`
    );
  document
    .querySelector('.search-results')
    .insertAdjacentHTML(
      'beforeend',
      `<div class="pagination"><span pagination__text>Showing ${resultsShown} of ${results.totalResults} results</span></div>`
    );

  // Create pagination container for the numbers
  document.querySelector('.pagination').insertAdjacentHTML('beforeend', `<div class="pagination__numbers"></div>`);

  for (let i = 1; i <= totalPages; i++) {
    document.querySelector('.pagination__numbers').insertAdjacentHTML('beforeend', `<button class="btn btn--pagination">${i}</button>`);
  }
}

function removePagination() {
  document.querySelectorAll('.pagination').forEach((element) => element.remove());
}

// Search action
document.querySelector('.search').addEventListener('submit', (e) => {
  // Don't want the form to submit
  e.preventDefault();

  // Clear the section from any previous elements
  clearResultsSection();
  removePagination();

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
        showPagination(searchResults);
        toggleLoader();
        enableForm(e);
      })
      .catch((error) => console.log(error.message));
  }, 3000);
});
