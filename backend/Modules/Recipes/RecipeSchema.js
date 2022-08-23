const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
  },
  recipesImgs: {
    type: Array,
  },
  ingredients: {
    type: String,
  },
  preparing: {
    type: String,
  },
  recipesVideos: {
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
    ref: "User",
  },
});

module.exports = { RecipeSchema };
