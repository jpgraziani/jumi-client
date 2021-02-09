require('dotenv').config()
const express = require('express')
const uuid = require('uuid/v4')
const recipesRouter = express.Router()
const jsonParser = express.json()
const store = require('../../recipes')


recipesRouter
  .route('/api/recipes')
  .get((req, res) => {
    res.status(200).json(store.recipes)
  })
  .post(jsonParser, (req, res) => {
    for (const field of ['name', 'created', 'directions', 'ingredients', 'main_protein', 'calories', 'protein']) {
      if (!req.body[field]) {
        return res.status(400).send(`${field} is required`)
      }
    }

    const { name, created, directions, ingredients, main_protein, calories, protein } = req.body

    const recipe = { id: uuid(), name, created, directions, ingredients, main_protein, calories, protein }

    store.recipes.push(recipe)

    res.status(201).location(`${process.env.DATABASE_URL}/recipes/${recipe.id}`).json(recipe)
  })

recipesRouter
  .route('/api/recipes/:recipeId')
  .get((req, res) => {
    const { recipeId } = req.params

    const recipe = store.recipes.find(item => item.id == recipeId)

    if(!recipe) {
      return res
        .status(404)
        .send('Recipe not found')
    }

    res.json(recipe)
  })
  .delete((req, res) => {
    const { recipeId } = req.params

    const recipeIndex = store.recipes.findIndex(index => index.id == recipeId)

    if (recipeIndex === -1) {
      return res
        .status(404)
        .send('Recipe not found')
    }

    store.recipes.splice(recipeIndex, 1)

    res
      .status(204)
      .end()
  })
  
module.exports = recipesRouter;
