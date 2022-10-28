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
recipeRouter.get("/userRecipes/:id", getUserRecipes);

//
recipeRouter.post(
  "/",
  upload.fields([
    {
      name: "mainImg",
      maxCount: 1,
    },
    {
      name: "uploadedImgs",
      maxCount: 30,
    },
    {
      name: "uploadedVideos",
      maxCount: 30,
    },
  ]),
  verifyToken,
  addNew
);

//update
recipeRouter.patch(
  "/:id",
  upload.fields([
    {
      name: "mainImg",
      maxCount: 1,
    },
    {
      name: "uploadedImgs",
      maxCount: 30,
    },
    {
      name: "uploadedVideos",
      maxCount: 30,
    },
  ]),
  verifyToken,
  updateOne
);
recipeRouter.delete("/:id", verifyToken, deleteOne);

module.exports = recipeRouter;
