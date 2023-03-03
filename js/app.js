async function fetchMovie(movieName, pageNumber = 1) {
  const response = await fetch(`./.netlify/functions/fetch-movie?s=${movieName}&page=${pageNumber}`);
  const movieSearchResults = await response.json();
  return movieSearchResults;
}

function disableForm() {
  let formInput = document.querySelector('.search__box');
  let submitButton = document.querySelector('.btn--submit');

  // Disable input but while keeping its value because it disappers with the disabled HTML attribute
  formInput.classList.toggle('search__box--disabled');
  formInput.setAttribute('disabled', true);
  formInput.setAttribute('value', formInput.value);

  // Disable submit button
  submitButton.setAttribute('disabled', true);
  submitButton.classList.toggle('btn--disabled');

  // Remove focus and active states that remain after the button is clicked
  submitButton.blur();
}

function enableForm() {
  let formInput = document.querySelector('.search__box');
  let submitButton = document.querySelector('.btn--submit');

  // Enable input
  formInput.classList.toggle('search__box--disabled');
  formInput.removeAttribute('disabled');

  // Enable submit button
  submitButton.removeAttribute('disabled');
  submitButton.classList.toggle('btn--disabled');
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

function showPagination(results, movie, pageNumber) {
  const resultsShown = results.Search.length;
  const totalPagesNumber = Math.ceil(results.totalResults / 10);
  let totalPagesArray = [];

  // Show pagination container at the top and at the bottom
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
      `<div class="pagination"><span class="pagination__text">Showing ${resultsShown} of ${results.totalResults} results</span></div>`
    );

  // Create pagination container for the numbers
  document.querySelectorAll('.pagination').forEach((element) => {
    element.insertAdjacentHTML('beforeend', `<div class="pagination__numbers"></div>`);
  });

  // Show the page numbers
  // document.querySelectorAll('.pagination__numbers').forEach((element) => {
  //   for (let i = 1; i <= totalPagesNumber; i++) {
  //     element.insertAdjacentHTML('beforeend', `<button data-page="${i}" class="btn btn--pagination">${i}</button>`);
  //   }
  // });

  // Create array of total pages
  for (let i = 1; i <= totalPagesNumber; i++) {
    totalPagesArray.push(i);
  }

  // If less than 6 pages, show the entire array as buttons
  if (totalPagesArray.length <= 6) {
    for (let i = 1; i <= totalPagesArray.length; i++) {
      document.querySelectorAll('.pagination__numbers').forEach((element) => {
        element.insertAdjacentHTML('beforeend', `<button data-page="${i}" class="btn btn--pagination">${i}</button>`);
      });
    }
  } else {
    let leftSidePagination = totalPagesArray.slice(0, 3);
    let rightSidePagination = totalPagesArray.slice(Math.max(totalPagesArray.length - 3, 0));
    let finalPagination = leftSidePagination.concat(rightSidePagination);

    document.querySelectorAll('.pagination__numbers').forEach((element) => {
      for (let i = 0; i < finalPagination.length; i++) {
        element.insertAdjacentHTML(
          'beforeend',
          `<button data-page="${finalPagination[i]}" class="btn btn--pagination">${finalPagination[i]}</button>`
        );
      }
    });

    console.log('left', leftSidePagination);
    console.log('right', rightSidePagination);
    console.log(finalPagination);
  }

  // Show current page as active
  document.querySelectorAll(`[data-page="${pageNumber}"]`).forEach((button) => {
    button.classList.add('btn--pagination--active');
  });

  // Add functionality to buttons
  document.querySelectorAll('.btn--pagination').forEach((button) => {
    // Store the number of the button to indicate the page of results to fetch
    const pageNumber = Number(button.dataset.page);

    button.addEventListener('click', () => {
      searchMovie(movie, pageNumber);
    });
  });
}

function removePagination() {
  document.querySelectorAll('.pagination').forEach((element) => element.remove());
}

function searchMovie(movieName = '', pageNumber = 1) {
  // Clear the section from any previous elements
  clearResultsSection();
  removePagination();

  // Save the name of the movie to search
  movieName = document.querySelector('.search__box').value;

  // Disable the form while searching, using the event as parameter
  disableForm();

  // Show loader while searching
  toggleLoader();

  // Simulate delay for illustration purposes
  setTimeout(() => {
    fetchMovie(movieName, pageNumber)
      .then((searchResults) => {
        showResults(searchResults);
        showPagination(searchResults, movieName, pageNumber);
        toggleLoader();
        enableForm();
      })
      .catch((error) => console.log(error.message));
  }, 3000);
}

document.querySelector('.search').addEventListener('submit', (e) => {
  // Don't want the form to submit
  e.preventDefault();
  searchMovie();
});
