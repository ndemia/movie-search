# Movie search (Interview test, volume 3)

![Image of the search movie website](https://github.com/ndemia/demia.me/blob/main/assets/images/movie_x2.png)

## Context
This assignment was part of the process for a position at a payments processor company. It's great to realize that I managed to make a lot of improvements from what I originally did.

## Tech stack
HTML, CSS (SASS), TypeScript.

## Requirements
- The assignment was meant to be completed in vanilla JavaScript, without any frameworks or libraries. But to practice I rebuilt it using TypeScript.
- It was not allowed to use any external libraries to make the request either (Axios or similar).
- Mobile-first approach.
- Each result should have its own card (or among those lines, can't remember exactly as it was long ago and I haven't kept the documentation).

## Obstacles
It was my first time dealing with pagination and it was the most difficult part. I had to rely on a third-party solution to accomplish it, but not before understanding how it works. Although I do need to practice it more often, it's still complicated to achieve while providing a good user experience.

Dealing with the card layout was also tricky since there's always going to be some undesired whitespace, whether inside the car to match all the heights, or outside to avoid it. I chose the latter one in this case.

Another challenge was learning how to manage and hide the API key. I didn't get it the first time I did this assignment, but this time I did. And it's pretty cool! Since I also learned about Netlify, a bit more about Node.js, which I use today.

## What I learned
I got more comfortable with asynchronous code in general, as well as TypeScript. Learned about Netlify, working with external APIs, hiding API keys in environment variables, and deploying the project. Got more familiar with testing accessibility (keyboard navigation and using screen-readers).

https://ndemia-movie.netlify.app/
