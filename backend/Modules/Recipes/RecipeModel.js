const mongoose = require("mongoose");
const { RecipeSchema } = require("./RecipeSchema");

const Recipe = mongoose.model("Recipes", RecipeSchema, "recipes");

module.exports = Recipe;
