## Bobaflix please!

This is a small React + Node.js app that uses Yelp Business Search to let users know where to get boba close to their office.

This is set up with pnpm as package manager.
To run it locally you need to clone the repo and run:

here goes how to run it.

## How I approached and tackled this mini project:

Planning:

Stack:

- From the requirements:
    - Use React (frontend) and Node.js (backend).
    - Get boba shops with the Yelp Business Search API.
    - Freedom to use a open-source component library for UI components.
    - Use Git
- Personal early choices:
    - pnpm as package manager (personal preference over npm or yarn)
    - Express as a Node.js framework with TS
    - React with TS
    - Prettier for formatting
    - api key will live in a .env file in the backend (use dotenv package)
    - Ant Design as Component Library
    - use CORS
    - use Vite to setup the frontend app
    - Do a monorepo setup for ease
    
    Thinking about pagination…
    
    I have two options in my mind atm:
    
    1. Proper, make the table know how many pages we would need to display all results for the query and load as user moves through pages. (yelp api supports `limit` and `offset` params, AND gives a `total` so we know how many results we can expect from a first call)
        
        In simple terms:
        Frontend: Asks for desired page or offset/limit to the backend.
        
        Backend: Pass those params to the yelp api and return results to frontend.
        
    2. Quick and dirty is to just load all results and send to frontend and just have “pagination” in the table view. THIS WOULD BE ONLY IF I AM RUNNING OUT OF TIME.


    ### Random comments

    - Decided to go with axios instead of the yelp api package.
    - Cant live without hot reload!
    - time spent on BE so far and first project pause 1 hour
