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
  // upload.array("uploadedImgs", 30),
  // upload.single("mainImg"),
  // upload.array("uploadedFiles", 30),
  // upload.array("uploadedVideos", 30),

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
