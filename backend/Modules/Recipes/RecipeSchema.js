const mongoose = require("mongoose");
// const User = require("../Users/UserModel");

const { Schema } = mongoose;
const RecipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  recipeMainImg: {
    type: Object,
  },
  rate: {
    type: Number,
  },
  rateList: {
    // type: Object,
    type: Array,
  },
  userRateList: {
    type: Array,
  },
  recipeImgs: {
    type: Array,
  },
  ingredients: {
    type: String,
  },
  instructions: {
    type: String,
  },
  recipeVideos: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  genre: {
    type: String,
    enum: [
      "desserts",
      "juices",
      "meals",
      "salad",
      "breakfast",
      "pastries",
      "others",
    ],
    default: "others",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = { RecipeSchema };
