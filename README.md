## Bobaflix please!

This is a small React + Node.js app that uses Yelp Business Search to let users know where to get boba close to their office.

# To run it locally you need to clone the repo and run:

- Frontend:
    - cd into /frontend
    - run:
    ```
    pnpm dev-fe
    ```

- Backend:
    - cd into /backend
    - put your yelp api key into the `.env` file
    - run:
    ```
    pnpm dev-be
    ```

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
    
    I will make the table know how many pages we would need to display all results for the query and load as user moves through pages. (yelp api supports `limit` and `offset` params, AND gives a `total` so we know how many results we can expect from a first call)
        
        In simple terms:
        Frontend: Asks for desired page or offset/limit to the backend.
        
        Backend: Pass those params to the yelp api and return results to frontend.


    ### Random comments

    - Planning and preping time spent 1 hour.
    - Decided to go with axios instead of the yelp api package.
    - Cant live without hot reload!
    - time spent on BE so far and first project pause after 1.5 hours
    - Made it to the 4h mark, FE and BE look very good.
    - I have a pending bug: after asking the yelp api for more results with an offset >230 it returns a 400
    - Search filtered by distance is very loose, but that is on yelp side. Could verify data and crop results.
