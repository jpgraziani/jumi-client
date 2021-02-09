const uuid = require('uuid/v4')

const recipes = [
    {
      id: uuid(),
      name: "First test recipe!",
      created: "2029-01-22T16:28:32.615Z",
      directions: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      ingredients: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      main_protein: "Fish",
      calories: 400,
      protein: 27
    },
    {
      "id": uuid(),
      "name": "Second test recipe!",
      "created": "2029-01-22T16:28:32.615Z",
      "directions": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      "ingredients": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      "main_protein": "Beef",
      "calories": 400,
      "protein": 27
    },
    {
      "id": uuid(),
      "name": "Third test recipe!",
      "created": "2029-01-22T16:28:32.615Z",
      "directions": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      "ingredients": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      "main_protein": "Chicken",
      "calories": 400,
      "protein": 27
    }
  ]

  module.exports = { recipes }
