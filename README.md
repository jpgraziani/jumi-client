# jumai&dash!

# Summary
This database was built for the jumi&dash recipe App. The database will allow you to see all recipes, add recipes and delete recipes. It was built using PostgreSQL and an express.js RESTful API. Contains a recipes table.

# Built with
* PostgreSQL
* express.js
* node.js


# API documentation

#### /recipes
- (/api/recipes)
- GET: Returns a list of all current recipes.
- POST: Create a new recipe to the datatbase

#### /recipes/:id
- (/api/recipes/:id)
- GET: Return a single recipe
- DELETE: Remove a single recipe from the dataas wtih a valid recipe id