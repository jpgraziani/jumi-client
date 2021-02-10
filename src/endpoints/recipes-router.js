const path = require('path')
const express = require('express')
const uuid = require('uuid/v4')
const RecipesService = require('./recipes-service')
const store = require('../../recipes')

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
    const newRecipe = { id: uuid(), name, created, directions, ingredients, main_protein, protein, calories }

    for (const [key, value] of Object.entries(newRecipe)) {
      if (value == null && key !== 'created') {
        return res.status(400).json({
          error: {
            message: `${key} is required`
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

module.exports = recipesRouter;