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
  img: {
    type: String,
  },
  ingredients: {
    type: String,
  },
  preparing: {
    type: String,
  },
  video: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date
  },
  genre: {
    type: String,
    enum: ["desserts", "juices", "meals", "salad", "breakfast", "pastries"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

module.exports = { RecipeSchema };
