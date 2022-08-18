const Recipe = require("./RecipeModel");

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
        $and: [{ title: { $regex: search } }, { genre: { $regex: genre } }],
      })
        .limit(limit)
        .skip(page * limit)
        .sort(sortBy);
      res.send(recipes);
    } else {
      const recipes = await Recipe.find({
        title: { $regex: search },
      })
        .limit(limit)
        .skip(page * limit)
        .sort(sortBy);
      res.send(recipes);
    }
  } catch (error) {
    error.statusCode = 403;
    next(error);
  }
};

const addNew = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.userPayload.id === id) {
      const {
        title,
        rate,
        img,
        ingredients,
        preparing,
        video,
        createdAt,
        genre,
      } = req.body;

      const newRecipe = new Recipe({
        title,
        rate,
        img,
        ingredients,
        preparing,
        video,
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
      const { title, rate, img, ingredients, preparing, video, genre } =
        req.body;
      const updatedRecipes = await Recipe.findByIdAndUpdate(
        id,
        {
          title,
          rate,
          img,
          ingredients,
          preparing,
          video,
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
    const recipe = await Recipe.findById(id);

    if (
      req.userPayload.id === recipe.createdBy.toString() ||
      req.userPayload.isAdmin
    ) {
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
    const recipe = await Recipe.findById(id);
    res.send(recipe);
  } catch (error) {
    error.statusCode = 403;
    next(error);
  }
};

module.exports = { addNew, updateOne, deleteOne, getOne, getAll };
