var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// UI
const searchForm = document.querySelector('.search');
// Functionality
searchForm.addEventListener('submit', (e) => {
    // Don't want the form to submit
    e.preventDefault();
    searchMovie();
});
// Function declarations
function searchMovie(movieName = '', pageNumber = 1) {
    const searchBox = document.querySelector('.search__box');
    // Clear the section from any previous elements
    clearResultsSection();
    removePagination();
    // Save the name of the movie to search
    movieName = searchBox.value;
    // Disable the form while searching, using the event as parameter
    disableForm();
    // Show loader while searching
    toggleLoader();
    // Simulate delay to allow the loading illustration to show
    setTimeout(() => {
        fetchMovie(movieName, pageNumber)
            .then((searchResults) => {
            showResults(searchResults);
            showPagination(searchResults, movieName, pageNumber);
        })
            .catch((error) => console.log(error.message));
    }, 3000);
}
function fetchMovie(movieName, pageNumber = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`./.netlify/functions/fetch-movie?s=${movieName}&page=${pageNumber}`);
        const movieSearchResults = yield response.json();
        return movieSearchResults;
    });
}
function showResults(searchResults) {
    // If no movie was found, show error
    if (searchResults.Response === 'False') {
        showError();
    }
    else {
        // Show the search results
        searchResults.Search.forEach((movieResult) => {
            const searchResultsContainer = document.querySelector('.search-results-container');
            let moviePoster = movieResult.Poster;
            // If not poster was found, use a default image
            if (movieResult.Poster === 'N/A') {
                moviePoster = 'assets/images/404.jpg';
            }
            searchResultsContainer.insertAdjacentHTML('beforeend', `<div class="card">
        <figure class="card__figure">
          <img class="card__image" src="${moviePoster}" alt="${movieResult.Title} movie poster">
        </figure>
        <div class="card__info">
          <h2 class="card__title" title="${movieResult.Title}">${movieResult.Title}</h2>
          <h3 class="card__year">${movieResult.Year}</h3>
        </div>
      </div>`);
        });
        toggleLoader();
        enableForm();
    }
}
function disableForm() {
    const formInput = document.querySelector('.search__box');
    const submitButton = document.querySelector('.btn--submit');
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
    const formInput = document.querySelector('.search__box');
    const submitButton = document.querySelector('.btn--submit');
    // Enable input
    formInput.classList.toggle('search__box--disabled');
    formInput.removeAttribute('disabled');
    // Enable submit button
    submitButton.removeAttribute('disabled');
    submitButton.classList.toggle('btn--disabled');
}
// Show and hide the loader
function toggleLoader() {
    const loader = document.querySelector('.icon--loader');
    loader.classList.toggle('hidden');
}
function clearResultsSection() {
    const cards = document.querySelectorAll('.card');
    const error = document.querySelector('.message--error');
    if (cards) {
        cards.forEach((card) => card.remove());
    }
    // Check if the 'Movie not found' error from a previous search is present
    if (error) {
        error.remove();
    }
}
function showError() {
    const searchResultsContainer = document.querySelector('.search-results-container');
    toggleLoader();
    searchResultsContainer.insertAdjacentHTML('beforeend', `<div class="message message--error">
    <span class="icon icon--error"></span>
    <p class="message__text">Movie not found.</p>
  </div>`);
    enableForm();
}
function calculatePagination(results, pageNumber) {
    // Calculate the total amount of pages according the the amount of movies shown per page
    const totalPagesNumber = Math.ceil(results.totalResults / 10);
    // Save the total number of pages as the length of the array
    const getRange = (start, end) => {
        return Array(end - start + 1)
            .fill(undefined)
            .map((value, index) => index + start);
    };
    const pagination = (currentPage, pageCount = totalPagesNumber) => {
        let delta;
        if (pageCount <= 7) {
            // delta === 7: [1 2 3 4 5 6]
            delta = 7;
        }
        else {
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
        let pages = currentPage > delta
            ? getRange(Math.min(range.start, pageCount - delta), Math.min(range.end, pageCount))
            : getRange(1, Math.min(pageCount, delta + 1));
        const withDots = (value, pair) => {
            return pages.length + 1 !== pageCount ? pair : [value];
        };
        if (pages[0] !== 1) {
            pages = withDots(1, [1, '...']).concat(pages);
        }
        if (pages[pages.length - 1] < pageCount) {
            pages = pages.concat(withDots(pageCount, ['...', pageCount]));
        }
        return pages;
    };
    return pagination(pageNumber, totalPagesNumber);
}
function showPagination(results, movie, pageNumber) {
    // Calculate the array pf pages to show
    const pagination = calculatePagination(results, pageNumber);
    // Create pagination container at the top and at the bottom
    const searchResults = document.querySelector('.search-results');
    searchResults.insertAdjacentHTML('afterbegin', `<div class="pagination"><span class="pagination__text">Showing ${results.Search.length} of ${results.totalResults} results</span></div>`);
    searchResults.insertAdjacentHTML('beforeend', `<div class="pagination"><span class="pagination__text">Showing ${results.Search.length} of ${results.totalResults} results</span></div>`);
    // Create container only for the page numbers
    document.querySelectorAll('.pagination').forEach((element) => {
        element.insertAdjacentHTML('beforeend', `<div class="pagination__numbers"></div>`);
    });
    // Create the page numbers
    document.querySelectorAll('.pagination__numbers').forEach((element) => {
        pagination.forEach((page) => {
            element.insertAdjacentHTML('beforeend', `<button data-page="${page}" class="btn btn--pagination">${page}</button>`);
        });
    });
    // Show current page as active
    document.querySelectorAll(`[data-page="${pageNumber}"]`).forEach((button) => {
        button.classList.add('btn--pagination--active');
    });
    // Add functionality to buttons
    const paginationButtons = document.querySelectorAll('.btn--pagination');
    paginationButtons.forEach((button) => {
        // Save the number of the clicked button to later send it to the fetch function
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
export {};
