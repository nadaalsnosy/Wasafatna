const Recipe = require("./RecipeModel");
const User = require("../Users/UserModel");

const fs = require("fs");

const getRecipes = async (req, res, next) => {
  try {
    const { id } = req.params;

    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const order = parseInt(req.query.order) || -1;

    const sort = req.query.sort || "createdAt";
    const search = req.query.search || "";
    const favourite = req.query.favourite || "";

    let genre = req.query.genre || "";

    if (genre === "all") {
      genre = "";
    }

    let sortBy = {};
    sortBy[sort] = order;
    sortBy["title"] = 1;

    let filterRecipes = [];

    if (id) filterRecipes.push({ createdBy: id });

    if (favourite) {
      const { id } = req.userPayload;
      const { userList } = await User.findById(id);

      const listFilter = [];
      userList.forEach((item) => listFilter.push({ _id: item }));
      filterRecipes.push({ $or: listFilter });
    }

    if (search) {
      filterRecipes.push({
        $or: [
          { title: { $regex: search } },
          { ingredients: { $regex: search } },
          { instructions: { $regex: search } },
        ],
      });
    }

    if (genre) filterRecipes.push({ genre: genre });

    const findFilter =
      filterRecipes.length !== 0 ? { $and: filterRecipes } : {};

    const recipesLength = (await Recipe.find(findFilter)).length;

    let recipesPageCounter;

    if (recipesLength % limit === 0) {
      recipesPageCounter = recipesLength / limit;
    } else {
      const rest = recipesLength % limit;
      recipesPageCounter = (recipesLength - rest + limit) / limit;
    }

    const recipes = await Recipe.find(findFilter)
      .limit(limit)
      .skip(page * limit)
      .sort(sortBy)
      .populate({
        path: "createdBy",
        select: ["username", "userImg"],
      });
    res.send({ recipes, recipesPageCounter });
  } catch (error) {
    error.statusCode = 403;
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const order = parseInt(req.query.order) || -1;

    const sort = req.query.sort || "createdAt";
    const search = req.query.search || "";
    let genre = req.query.genre || "";

    if (genre === "all") {
      genre = "";
    }

    let sortBy = {};
    sortBy[sort] = order;
    sortBy["title"] = 1;

    const filterRecipes = [
      {
        $or: [
          { title: { $regex: search } },
          { ingredients: { $regex: search } },
          { instructions: { $regex: search } },
        ],
      },
    ];
    if (genre) filterRecipes.push({ genre: genre });

    const recipesLength = (
      await Recipe.find({ $and: filterRecipes }).sort(sortBy)
    ).length;

    let recipesPageCounter;

    if (recipesLength % limit === 0) {
      recipesPageCounter = recipesLength / limit;
    } else {
      const rest = recipesLength % limit;
      recipesPageCounter = (recipesLength - rest + limit) / limit;
    }

    const recipes = await Recipe.find({ $and: filterRecipes })
      .limit(limit)
      .skip(page * limit)
      .sort(sortBy)
      .populate({
        path: "createdBy",
        select: ["username", "userImg"],
      });
    res.send({ recipes, recipesPageCounter });
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
    let genre = req.query.genre || "";

    if (genre === "all") {
      genre = "";
    }

    let sortBy = {};
    sortBy[sort] = order;
    sortBy["title"] = 1;

    const filterRecipes = [{ createdBy: id }];
    if (genre) filterRecipes.push({ genre: genre });

    const recipesLength = (await Recipe.find({ $and: filterRecipes })).length;

    let recipesPageCounter;

    if (recipesLength % limit === 0) {
      recipesPageCounter = recipesLength / limit;
    } else {
      const rest = recipesLength % limit;
      recipesPageCounter = (recipesLength - rest + limit) / limit;
    }

    const recipes = await Recipe.find({ $and: filterRecipes })
      .limit(limit)
      .skip(page * limit)
      .sort(sortBy)
      .populate({
        path: "createdBy",
        select: ["username", "userImg"],
      });

    res.send({ recipes, recipesPageCounter });
  } catch (error) {
    error.statusCode = 403;
    next(error);
  }
};

const addNew = async (req, res, next) => {
  try {
    const { title, rate, ingredients, instructions, createdAt, genre } =
      req.body;

    let recipeMainImg;
    let recipeImgs = [];
    let recipeVideos = [];

    if (req.files) {
      const { mainImg, uploadedImgs, uploadedVideos } = req.files;
      if (mainImg)
        recipeMainImg = {
          imgPath: mainImg[0].path,
          imgName: mainImg[0].filename,
        };
      if (uploadedImgs)
        uploadedImgs.forEach((item) =>
          recipeImgs.push({ imgPath: item.path, imgName: item.filename })
        );

      if (uploadedVideos)
        uploadedVideos.forEach((item) =>
          recipeVideos.push({ videoPath: item.path, videoName: item.filename })
        );
    }

    const newRecipe = new Recipe({
      title,
      recipeMainImg,
      rate,
      recipeImgs,
      ingredients,
      instructions,
      recipeVideos,
      createdAt,
      genre,
      createdBy: req.userPayload.id,
    });

    const createdRecipe = await newRecipe.save();
    res.send(createdRecipe);
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
      const {
        title,
        rate,
        ingredients,
        instructions,
        genre,
        deleteImgs,
        deleteVideos,
      } = req.body;

      if (req.files) {
        const { mainImg, uploadedImgs, uploadedVideos } = req.files;
        if (mainImg) {
          if (recipe.recipeMainImg.imgPath) {
            fs.unlinkSync(recipe.recipeMainImg.imgPath);
          }
          recipe.recipeMainImg = {
            imgPath: mainImg[0].path,
            imgName: mainImg[0].filename,
          };
        }
        if (uploadedImgs)
          uploadedImgs.forEach((item) =>
            recipe.recipeImgs.push({
              imgPath: item.path,
              imgName: item.filename,
            })
          );
        if (uploadedVideos)
          uploadedVideos.forEach((item) =>
            recipe.recipeVideos.push({
              videoPath: item.path,
              videoName: item.filename,
            })
          );
      }

      if (deleteImgs) {
        if (typeof deleteImgs === "object") {
          deleteImgs.forEach((imgName) => {
            recipe.recipeImgs.forEach((item, index) => {
              if (item.imgName === imgName) {
                fs.unlinkSync(item.imgPath);
                recipe.recipeImgs.splice(index, 1);
              }
            });
          });
        } else {
          recipe.recipeImgs.forEach((item, index) => {
            if (item.imgName === deleteImgs) {
              fs.unlinkSync(item.imgPath);
              recipe.recipeImgs.splice(index, 1);
            }
          });
        }
      }
      if (deleteVideos) {
        if (typeof deleteVideos === "object") {
          deleteVideos.forEach((videoName) => {
            recipe.recipeVideos.forEach((item, index) => {
              if (item.videoName === videoName) {
                fs.unlinkSync(item.videoPath);
                recipe.recipeVideos.splice(index, 1);
              }
            });
          });
        } else {
          recipe.recipeVideos.forEach((item, index) => {
            if (item.videoName === deleteVideos) {
              fs.unlinkSync(item.videoPath);
              recipe.recipeVideos.splice(index, 1);
            }
          });
        }
      }

      const updatedRecipes = await Recipe.findByIdAndUpdate(
        id,
        {
          title,
          recipeMainImg: recipe.recipeMainImg,
          rate,
          recipeImgs: recipe.recipeImgs,
          ingredients,
          instructions,
          recipeVideos: recipe.recipeVideos,
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
  getRecipes,
};
