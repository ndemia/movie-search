fetch(`/.netlify/functions/fetch-movie?s=satantango`)
  .then((response) => response.json())
  .then((content) => {
    console.log(content.Search[0])
  })
  .catch((error) => console.log(error.message));