const path = require('path')
const express = require('express')
const RecipesService = require('./recipes-service')
const recipesRouter = express.Router()
const bodyParser = express.json();

const serializeRecipe = recipe => ({
  id: recipe.id,
  name: recipe.name,
  created: recipe.created,
  directions: recipe.directions,
  ingredients: recipe.ingredients,
  main_protein: recipe.main_protein,
  calories: recipe.calories,
  protein: recipe.protein,
});

recipesRouter
  .route('/api/recipes')
  .get((req, res, next) => {
    RecipesService.getAllRecipes(req.app.get('db'))
      .then(recipes => {
        res.json(recipes.map(serializeRecipe))
      })
      .catch(next)
  })
  .post(bodyParser, (req, res, next) => {
    const { name, created, directions, ingredients, main_protein, protein, calories } = req.body
    const newRecipe = { name, created, directions, ingredients, main_protein, protein, calories }

    for (const [key, value] of Object.entries(newRecipe)) {
      if (value == null && key !== 'created') {
        return res.status(400).json({
          error: {
            message: `Missing recipe ${key}`
          }
        })
      }
    }

    RecipesService.insertRecipe(
      req.app.get('db'),
      newRecipe
    )
      .then(recipe => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl + `/${recipe.id}`))
          .json(serializeRecipe(recipe))
      })
      .catch(next)
  })

  recipesRouter
    .route('/api/recipes/:id')
    .all((req, res, next) => {
      RecipesService.getById(
        req.app.get('db'),
        req.params.id
      )
        .then(recipe => {
          if (!recipe) {
            return res.status(404).json({
              error: {
                message: `The recipe doesn't exist`
              }
            })
          }
          res.recipe = recipe
          next()
          res.json(serializeRecipe(recipe))
        })
        .catch(next)
    })
    .get((req, res, next) => {
      res.json(serializeRecipe(res.recipe))
    })
    .delete((req, res, next) => {
      RecipesService.deleteRecipe(
        req.app.get('db'),
        req.params.id
      )
      .then(recipes => {
        res.status(204).json(recipes)
      })
      .catch(next)
    })

module.exports = recipesRouter;