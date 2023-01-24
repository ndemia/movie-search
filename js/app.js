async function fetchMovie (movieName) {

  const response = await fetch(`/.netlify/functions/fetch-movie?s=${movieName}`);
  const movieSearchResults = await response.json();
  return movieSearchResults;

};



function disableButton (e) {

  e.target.classList.toggle('btn--disabled');

  // Remove focus and active states that remain after being clicked
  e.target.blur();

}


  
function enableButton (e) {
  e.target.classList.toggle('btn--disabled');
}



document.querySelector('.btn--submit').addEventListener('click', (e) => {

  // Prevent the form from submitting, which could create issues
  e.preventDefault();

  let movieName = document.querySelector('.form__input').value;

  disableButton(e);

  // Simulate delay for illustration purposes
  setTimeout(() => {

    fetchMovie(movieName)
      .then((results) => {console.log(results)})
      .catch((error) => console.log(error));

  }, 3000);

  // fetch(`/.netlify/functions/fetch-movie?s=${movieName}`)
  //   .then((response) => response.json())
  //   .then((content) => console.log(content.Search[0]))
  //   .catch((error) => console.log(error.message));

});