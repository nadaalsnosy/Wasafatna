const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "password must be of Minimum eight characters, contain at least 1 lowercase, 1 uppercase, one number and one special characher",
    ],
  },
  image: {
    type: String,
  },
  userList: {
    type: Array,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = { userSchema };
