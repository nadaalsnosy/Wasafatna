const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");
const User = require("./UserModel");

const asynSign = util.promisify(jwt.sign);

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password });
    if (req.file) {
      newUser.image = req.file.path;
    }
    const createdUser = await newUser.save();
    res.send(createdUser);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("invalid email or password");
    const { password: originalHashedPassword } = user;
    const result = await bcrypt.compare(password, originalHashedPassword);
    if (!result) throw new Error("invalid email or password");
    const { id: uID } = user;
    const token = await asynSign(
      { id: uID, isAdmin: user.isAdmin },
      process.env.SECRET_KEY
    );
    // { expiresIn: process.env.JWT_EXPIRES_IN }
    res.send({ token, user });
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
    const { id } = req.params;
    if (req.userPayload.id === id) {
      const { username, email } = await User.findById(id);
      res.send({ username, email });
    } else {
      throw new Error(`You are not allowed to view this profile!`);
    }
  } catch (error) {
    error.statusCode = 403;
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password, userListItem } = req.body;

    if (req.userPayload.id === id || req.userPayload.isAdmin) {
      let { userList } = await User.findById(id);

      if (userListItem) {
        const exists = userList.some((item) => item._id === userListItem._id);
        userList = exists
          ? userList.filter((item) => item._id !== userListItem._id)
          : [...userList, userListItem];
      }

      const updatedUsers = await User.findByIdAndUpdate(
        id,
        { username, email, password, userList },
        { new: true }
      );
      res.send(updatedUsers);
    } else {
      throw new Error(`You are not allowed to update this profile!`);
    }
  } catch (error) {
    error.statusCode = 403;
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.userPayload.id === id || req.userPayload.isAdmin) {
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
module.exports = { signUp, login, getUsers, profile, updateUser, deleteUser };
