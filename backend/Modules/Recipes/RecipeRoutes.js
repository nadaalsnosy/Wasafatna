const express = require("express");
const recipeRouter = express.Router();
const { verifyToken } = require("../Middelwares");
const { addNew, updateOne, deleteOne, getOne, getAll } = require("./RecipeControllers");

//get
recipeRouter.get("/", verifyToken, getAll);
recipeRouter.get("/:id", verifyToken, getOne);
//
recipeRouter.post("/:id", verifyToken, addNew);
//update
recipeRouter.patch("/:id", verifyToken, updateOne);
recipeRouter.delete("/:id", verifyToken, deleteOne);

module.exports = recipeRouter;
