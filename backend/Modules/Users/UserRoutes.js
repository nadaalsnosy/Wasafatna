const express = require("express");
const userRouter = express.Router();
const { passwordHash, verifyToken, validate } = require("../Middelwares");
const {
  signUp,
  login,
  getUsers,
  profile,
  updateUser,
  deleteUser,
  changePassword,
  userList,
} = require("./UserControllers");
const upload = require("../Uploads");

//get
userRouter.get("/", verifyToken, getUsers);
userRouter.get("/profile", verifyToken, profile);
userRouter.get("/userList", verifyToken, userList);

//
userRouter.post(
  "/signUp",
  validate,
  passwordHash,
  upload.single("userImg"),
  signUp
);
userRouter.post("/signIn", login);

//update
userRouter.patch(
  "/",
  upload.single("userImg"),
  verifyToken,
  validate,
  passwordHash,
  updateUser
);
userRouter.post("/changePass", verifyToken, passwordHash, changePassword);
userRouter.delete("/:id", verifyToken, deleteUser);

module.exports = userRouter;
