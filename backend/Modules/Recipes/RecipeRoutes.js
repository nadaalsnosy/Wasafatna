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
recipeRouter.get("/", getAll);
recipeRouter.get("/:id", getOne);
recipeRouter.get("/user/:id", getUserRecipes);

//
recipeRouter.post(
  "/:id",
  upload.array("uploadedFiles", 30),
  upload.single("mainImg"),
  verifyToken,
  addNew
);
//update
recipeRouter.patch(
  "/:id",
  verifyToken,
  upload.array("uploadedFiles", 30),
  upload.single("mainImg"),
  updateOne
);
recipeRouter.delete("/:id", verifyToken, deleteOne);

module.exports = recipeRouter;
