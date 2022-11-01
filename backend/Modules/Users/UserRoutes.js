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
} = require("./UserControllers");
const upload = require("../Uploads");

//get all for admin only
userRouter.get("/", verifyToken, getUsers);
userRouter.get("/profile", verifyToken, profile);
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
userRouter.delete("/:id", verifyToken, deleteUser);
userRouter.post(
  "/changePass",
  // upload.any(),
  verifyToken,
  passwordHash,
  changePassword
);

module.exports = userRouter;
