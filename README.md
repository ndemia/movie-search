# Movie search (Interview test, volume 3)

![Image of the search movie website](https://github.com/ndemia/demia.me/blob/main/assets/images/movie_x2.png)

## Context
The third installment series of interview tests. This assignment was part of the process for a position at a payments processor company. It's great to realize that I managed to make a lot of improvements from what I originally did.

## Tech stack
HTML, CSS (SASS), TypeScript.

## Requirements
- The assignment was meant to be completed in vanilla JavaScript, without any frameworks or libraries, but to practice I've rebuilt it using TypeScript this time.
- It was not allowed to use any external libraries to make the request either (Axios or similar).
- Mobile-first approach.
- Each result should have its own card (or among those lines, can't remember exactly as it was long ago and I haven't kept the documentation).
- ~~There has to be a top bar, where the search box will be located.~~ I'm going to ditch this :)

## Problems
It was my first time dealing with pagination and it was the most difficult part. I had to rely on a third-party solution to accomplish it, but not before understanding how it works. Although I do need to practice it more often, since it's still complicated to achieve.

Dealing with the card layout was also tricky since there's always going to be some undesired whitespace, whether inside the car to match all the heights, or outside to avoid it. I chose the latter one in this case.

Another challenge was learning how to manage and hide the API key. I didn't manage it the first time I did this assignment, but this time I did. And it's pretty cool, since I also learned about Netlify which I use until today.

## Learnings
I got more comfortable with asynchronous code in general, as well as with TypeScript. Learned about Netlify, working with external APIs, hiding API keys in environment variables, and deploying the project. Got more familiar with testing accessibility (keyboard navigation and using screen-readers). 

https://ndemia-movie.netlify.app/
