const mongoose = require("mongoose");
const { userSchema } = require("./UserSchema");

const User = mongoose.model("Users", userSchema, "users");

module.exports = User;
