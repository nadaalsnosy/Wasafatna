const Recipe = require("./RecipeModel");

const fs = require("fs");

const getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const order = parseInt(req.query.order) || -1;

    const sort = req.query.sort || "createdAt";
    const search = req.query.search || "";
    const genre = req.query.genre || "";

    let sortBy = {};
    sortBy[sort] = order;

    if (genre) {
      const recipes = await Recipe.find({
        $and: [{ title: { $regex: search } }, { genre: genre }],
      })
        .limit(limit)
        .skip(page * limit)
        .sort(sortBy)
        .populate({
          path: "createdBy",
          select: ["username", "userImg"],
        });
      res.send(recipes);
    } else {
      const recipes = await Recipe.find({
        title: { $regex: search },
      })
        .limit(limit)
        .skip(page * limit)
        .sort(sortBy)
        .populate({
          path: "createdBy",
          select: ["username", "userImg"],
        });
      res.send(recipes);
    }
  } catch (error) {
    error.statusCode = 403;
    next(error);
  }
};

const getUserRecipes = async (req, res, next) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const order = parseInt(req.query.order) || -1;
    const sort = req.query.sort || "createdAt";

    let sortBy = {};
    sortBy[sort] = order;

    const userRecipes = await Recipe.find({ createdBy: id })
      .limit(limit)
      .skip(page * limit)
      .sort(sortBy);

    res.send(userRecipes);
  } catch (error) {
    error.statusCode = 403;
    next(error);
  }
};

const addNew = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.userPayload.id === id) {
      const { title, rate, ingredients, instructions, createdAt, genre } =
        req.body;

      let recipeMainImg = "";
      let recipesImgs = [];
      let recipesVideos = [];

      if (req.files) {
        const { mainImg, uploadedImgs, uploadedVideos } = req.files;
        if (mainImg) recipeMainImg = mainImg[0].path;
        if (uploadedImgs)
          uploadedImgs.forEach((item) => recipesImgs.push(item.path));
        if (uploadedVideos)
          uploadedVideos.forEach((item) => recipesVideos.push(item.path));
      }

      const newRecipe = new Recipe({
        title,
        recipeMainImg,
        rate,
        recipesImgs,
        ingredients,
        instructions,
        recipesVideos,
        createdAt,
        genre,
        createdBy: req.userPayload.id,
      });

      const createdRecipe = await newRecipe.save();
      res.send(createdRecipe);
    } else {
      throw new Error(`You are not allowed to add Recipes Here`);
    }
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);

    if (req.userPayload.id === recipe.createdBy.toString()) {
      const { title, rate, ingredients, instructions, genre, deleteImgs } =
        req.body;

      if (req.files?.length) {
        req.files.forEach((item) => {
          if (item.mimetype === "video/mp4") {
            recipe.recipesVideos.push(item.path);
          } else {
            recipe.recipesImgs.push(item.path);
          }
        });
      }

      if (deleteImgs) {
        deleteImgs.forEach((imgPath) => {
          recipe.recipesImgs.forEach((item, index) => {
            if (item === imgPath) {
              fs.unlinkSync(item);
              recipe.recipesImgs.splice(index, 1);
            }
          });
        });
      }
      if (req.file) {
        if (
          req.file.mimetype === "image/jpeg" ||
          req.file.mimetype === "image/png"
        ) {
          if (recipe.mainImg) {
            fs.unlinkSync(recipe.mainImg);
          }
          recipe.mainImg = req.file.path;
        } else {
          throw new Error(`You must add jpeg or png only!`);
        }
      }

      const updatedRecipes = await Recipe.findByIdAndUpdate(
        id,
        {
          title,
          mainImg,
          rate,
          recipesImgs: recipe.recipesImgs,
          ingredients,
          instructions,
          recipesVideos: recipe.recipesVideos,
          genre,
        },
        { new: true }
      );
      res.send(updatedRecipes);
    } else {
      throw new Error(`You are not allowed to perform this operation!`);
    }
  } catch (error) {
    error.statusCode = 403;
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { recipesImgs, createdBy, recipesVideos, mainImg } =
      await Recipe.findById(id);

    if (
      req.userPayload.id === createdBy.toString() ||
      req.userPayload.isAdmin
    ) {
      if (recipesImgs.length !== 0) {
        recipesImgs.forEach((item) => {
          fs.unlinkSync(item);
        });
      }

      if (recipesVideos.length !== 0) {
        recipesVideos.forEach((item) => {
          fs.unlinkSync(item);
        });
      }
      if (mainImg !== "images\\foodIcon.png") {
        fs.unlinkSync(mainImg);
      }

      const deletedRecipe = await Recipe.findByIdAndDelete(id);
      res.send(`${deletedRecipe.title} is deleted successfully`);
    } else {
      throw new Error(`You are not allowed to perform this operation!`);
    }
  } catch (error) {
    error.statusCode = 403;
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).populate({
      path: "createdBy",
      select: ["username", "userImg"],
    });
    res.send(recipe);
  } catch (error) {
    error.statusCode = 403;
    next(error);
  }
};

module.exports = {
  addNew,
  updateOne,
  deleteOne,
  getOne,
  getAll,
  getUserRecipes,
};
