const express = require("express");
const recipeRouter = express.Router();
const { verifyToken } = require("../Middelwares");
const upload = require("../Uploads");
const {
  addNew,
  updateOne,
  deleteOne,
  getOne,
  getAll,
  getUserRecipes,
} = require("./RecipeControllers");

//get
recipeRouter.get("/", verifyToken, getAll);
recipeRouter.get("/:id", verifyToken, getOne);
recipeRouter.get("/user/:id", verifyToken, getUserRecipes);

//
recipeRouter.post(
  "/:id",
  upload.array("uploadedFiles", 30),
  verifyToken,
  addNew
);
//update
recipeRouter.patch(
  "/:id",
  verifyToken,
  upload.array("uploadedFiles", 30),
  updateOne
);
recipeRouter.delete("/:id", verifyToken, deleteOne);

module.exports = recipeRouter;
