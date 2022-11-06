const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const util = require("util");
const User = require("./UserModel");
const Recipe = require("../Recipes/RecipeModel");
const asynSign = util.promisify(jwt.sign);

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password });

    const { id: uID } = newUser;
    const token = await asynSign(
      { id: uID, isAdmin: newUser.isAdmin },
      process.env.SECRET_KEY
    );

    const createdUser = await await newUser.save();
    res.send({ token, createdUser });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("invalid email or password");
    }

    const { password: originalHashedPassword } = user;
    const result = await bcrypt.compare(password, originalHashedPassword);
    if (!result) {
      throw new Error("invalid email or password");
    }

    const { id: uID } = user;
    const token = await asynSign(
      { id: uID, isAdmin: user.isAdmin },
      process.env.SECRET_KEY
    );

    res.send({ token, user });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  const { userPassword, newPassword } = req.body;
  try {
    const userId = req.userPayload.id;
    const user = await User.findById(userId);

    const { password } = user;
    const result = await bcrypt.compare(userPassword, password);

    if (result) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { password: newPassword },
        { new: true }
      );
      res.send(updatedUser);
    } else {
      res.send("The Password is Wrong");
    }
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    if (req.userPayload.isAdmin) {
      const users = await User.find();
      res.send(users);
    } else {
      throw new Error(`You are not allowed to see all users!`);
    }
  } catch (error) {
    error.statusCode = 403;
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const { id } = req.userPayload;
    const { username, email, userImg, userList } = await User.findById(id);

    res.send({ username, email, userImg, userList });
  } catch (error) {
    error.statusCode = 403;
    next(error);
  }
};

const userList = async (req, res, next) => {
  try {
    const { id } = req.userPayload;
    const { userList } = await User.findById(id);

    const listFilter = [];
    userList.forEach((item) => listFilter.push({ _id: item }));

    const favouriteList = await Recipe.find({ $or: listFilter }).populate({
      path: "createdBy",
      select: ["username", "userImg"],
    });

    res.send(favouriteList);
  } catch (error) {
    error.statusCode = 403;
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password, userListItem } = req.body;
    let userId;

    if (req.userPayload.isAdmin && id) {
      userId = id;
    } else if (req.userPayload.id) {
      userId = req.userPayload.id;
    } else {
      throw new Error(`You are not allowed to update this profile!`);
    }
    const user = await User.findById(userId);

    // if (userListItem) {
    //   const exists = user.userList.some(
    //     (item) => item._id === userListItem._id
    //   );
    //   user.userList = exists
    //     ? user.userList.filter((item) => item._id !== userListItem._id)
    //     : [...user.userList, userListItem];
    // }

    if (userListItem) {
      const exists = user.userList.some((item) => item == userListItem);
      user.userList = exists
        ? user.userList.filter((item) => item != userListItem)
        : [...user.userList, userListItem];
    }

    if (req.file) {
      if (
        req.file.mimetype === "image/jpeg" ||
        req.file.mimetype === "image/png"
      ) {
        if (user.userImg) {
          fs.unlinkSync(user.userImg);
        }
        user.userImg = req.file.path;
      } else {
        throw new Error(`You must add jpeg or png only!`);
      }
    }

    const updatedUsers = await User.findByIdAndUpdate(
      userId,
      {
        username,
        email,
        password,
        userList: user.userList,
        userImg: user.userImg,
      },
      { new: true }
    );
    res.send(updatedUsers);
  } catch (error) {
    error.statusCode = 403;
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userImg } = await User.findById(id);

    if (req.userPayload.id === id || req.userPayload.isAdmin) {
      if (userImg !== "images\\userIcon.png") {
        fs.unlinkSync(userImg);
      }
      const deletedUser = await User.findByIdAndDelete(id);
      res.send(`${deletedUser.username} is deleted successfully`);
    } else {
      throw new Error(`You are not allowed to delete this profile!`);
    }
  } catch (error) {
    error.statusCode = 403;
    next(error);
  }
};

module.exports = {
  signUp,
  login,
  getUsers,
  profile,
  updateUser,
  deleteUser,
  changePassword,
  userList,
};
