async function fetchMovie(movieName: string, pageNumber = 1) {
  const response = await fetch(`./.netlify/functions/fetch-movie?s=${movieName}&page=${pageNumber}`);
  const movieSearchResults = await response.json();
  return movieSearchResults;
}

function disableForm() {
  let formInput = document.querySelector('.search__box') as HTMLInputElement;
  let submitButton = document.querySelector('.btn--submit') as HTMLButtonElement;

  // Disable input but while keeping its value because it disappers with the disabled HTML attribute
  formInput.classList.toggle('search__box--disabled');
  formInput.setAttribute('disabled', 'true');
  formInput.setAttribute('value', formInput.value);

  // Disable submit button
  submitButton.setAttribute('disabled', 'true');
  submitButton.classList.toggle('btn--disabled');

  // Remove focus and active states that remain after the button is clicked
  submitButton.blur();
}

function enableForm() {
  let formInput = document.querySelector('.search__box') as HTMLInputElement;
  let submitButton = document.querySelector('.btn--submit') as HTMLButtonElement;

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
    searchResults.Search.forEach((movie) => {
      let moviePoster = movie.Poster;

      if (movie.Poster === 'N/A') {
        moviePoster = 'assets/images/404.jpg';
      }

      document.querySelector('.search-results-container').insertAdjacentHTML(
        'beforeend',
        `<div class="card">
        <figure class="card__figure">
          <img class="card__image" src="${moviePoster}" alt="${movie.Title} movie poster">
        </figure>
        <div class="card__info">
          <h2 class="card__title" title="${movie.Title}">${movie.Title}</h2>
          <h3 class="card__year">${movie.Year}</h3>
        </div>
      </div>`
      );
    });
  }
}

function showPagination(results, movie, pageNumber) {
  const totalPagesNumber = Math.ceil(results.totalResults / 10);

  // Return the total number of pages as an array
  const getRange = (start, end) => {
    return Array(end - start + 1)
      .fill()
      .map((v, i) => i + start);
  };

  const pagination = (currentPage, pageCount = totalPagesNumber) => {
    let delta;

    if (pageCount <= 7) {
      // delta === 7: [1 2 3 4 5 6]
      delta = 7;
    } else {
      // delta === 2: [1 ... 4 5 6 ... 10]
      // delta === 4: [1 2 3 4 5 ... 10]
      delta = currentPage > 4 && currentPage < pageCount - 3 ? 2 : 4;
    }

    const range = {
      start: Math.round(currentPage - delta / 2),
      end: Math.round(currentPage + delta / 2),
    };

    if (range.start - 1 === 1 || range.end + 1 === pageCount) {
      range.start += 1;
      range.end += 1;
    }

    let pages =
      currentPage > delta
        ? getRange(Math.min(range.start, pageCount - delta), Math.min(range.end, pageCount))
        : getRange(1, Math.min(pageCount, delta + 1));

    const withDots = (value, pair) => (pages.length + 1 !== pageCount ? pair : [value]);

    if (pages[0] !== 1) {
      pages = withDots(1, [1, '...']).concat(pages);
    }

    if (pages[pages.length - 1] < pageCount) {
      pages = pages.concat(withDots(pageCount, ['...', pageCount]));
    }

    return pages;
  };

  // Show pagination container at the top and at the bottom
  document
    .querySelector('.search-results')
    .insertAdjacentHTML(
      'afterbegin',
      `<div class="pagination"><span class="pagination__text">Showing ${results.Search.length} of ${results.totalResults} results</span></div>`
    );
  document
    .querySelector('.search-results')
    .insertAdjacentHTML(
      'beforeend',
      `<div class="pagination"><span class="pagination__text">Showing ${results.Search.length} of ${results.totalResults} results</span></div>`
    );

  // Create pagination container for the numbers
  document.querySelectorAll('.pagination').forEach((element) => {
    element.insertAdjacentHTML('beforeend', `<div class="pagination__numbers"></div>`);
  });

  //Show the page numbers
  document.querySelectorAll('.pagination__numbers').forEach((element) => {
    const pages = pagination(pageNumber, totalPagesNumber);

    pages.forEach((page) => {
      element.insertAdjacentHTML('beforeend', `<button data-page="${page}" class="btn btn--pagination">${page}</button>`);
    });
  });

  // Show current page as active
  document.querySelectorAll(`[data-page="${pageNumber}"]`).forEach((button) => {
    button.classList.add('btn--pagination--active');
  });

  // Add functionality to buttons
  document.querySelectorAll('.btn--pagination').forEach((button) => {
    // Store the number of the button to indicate the page of results to fetch function
    const pageNumber = Number(button.dataset.page);

    // If button has dots, do not add functionality
    if (button.dataset.page !== '...') {
      button.addEventListener('click', () => {
        searchMovie(movie, pageNumber);
      });
    }
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
        console.log(searchResults);
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
