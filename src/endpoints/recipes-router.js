const express = require('express')
const recipesRouter = express.Router()
// const jsonParser = express.json()
const store = require('../../recipes')

recipesRouter
  .route('/api/recipes')
  .get((req, res) => {
    res.json(store.recipes)
  })
  
module.exports = recipesRouter;



