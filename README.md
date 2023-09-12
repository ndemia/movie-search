# Movie search (Interview test, volume 3)

![Image of the search movie website](https://demia.me/assets/images/movie_x2.png)

## Context
Another of my interview test series. This time around, I did manage to pass the technical assessment! With some good parts and some bad parts, of course.

## Tech stack
HTML, CSS (SASS), TypeScript.

## Requirements
- The assignment was meant to be completed in vanilla JavaScript, without any frameworks or libraries. I've rebuilt it using TypeScript, improving it wherever I could, and to get more familiar with it.
- I was not allowed to use any framework to make the request (Axios or similar). UI frameworks were allowed but highly discouraged.
- Mobile-first approach.
- Each result should have its own card (or among those lines, can't remember exactly as it was long ago and I haven't kept the documentation).
- ~~There has to be a top bar, where the search box will be located.~~ I'm going to ditch this :)

## Problems
- It was my first time dealing with pagination and it was the most dificult part. I had to rely on a third party solution to accomplish it, but not before understanding how it works. Although I do need to practice it more often ;)
- Dealing with the card layout was also tricky, since there's always going to be some undesired whitespace, whether inside the car to match all the heights, or outside to avoid it. I chose the latter one.
- Learning how to manage and hide the API key, in order to be able to publish the project on GitHub, also took some time to properly grasp. 

## Learnings
I got more comfortable with promises and asynchronous JavaScript in general, as well as with TypeScript. Learned about Netlify, hiding API keys in environment variables, and deploying to it. Got more familiar with testing accessibility, with keyboard navigation and screen-readers.

https://ndemia-movie.netlify.app/
