async function fetchMovie (movieName) {

  const response = await fetch(`/.netlify/functions/fetch-movie?s=${movieName}`);
  const movieSearchResults = await response.json();
  return movieSearchResults;

};



function disableButton (e) {

  e.target.setAttribute('disabled', true);

  e.target.classList.toggle('btn--disabled');

  // Remove focus and active states that remain after the button is clicked
  e.target.blur();

}


  
function enableButton (e) {
  e.target.classList.toggle('btn--disabled');
}




function showLoader () {
  document.querySelector('.loader').classList.toggle('hidden');
}



document.querySelector('.btn--submit').addEventListener('click', (e) => {

  // Prevent the form from submitting, which creates issues when it's not the actual intention
  e.preventDefault();

  let movieName = document.querySelector('.form__input').value;

  disableButton(e);

  showLoader();

  // Simulate delay for illustration purposes
  setTimeout(() => {

    fetchMovie(movieName)
      .then((results) => {console.log(results)})
      .catch((error) => console.log(error));

  }, 3000);

});