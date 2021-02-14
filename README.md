# jumai&dash!

# Summary
This database was built for the jumi&dash recipe App. The database will allow you to see all recipes, add recipes and delete recipes. It was built using PostgreSQL and an express.js RESTful API. Contains a recipes table.

# Built with
*PostgreSQL
*express.js
*node.js


## How do set up?

1. Clone this repository to your local machine
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests in watch mode `npm test`

## Deploying

When your new project is ready for deployment, add a new heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.