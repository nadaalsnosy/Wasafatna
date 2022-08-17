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
} = require("./UserControllers");

//get all for admin only
userRouter.get("/", verifyToken, getUsers);
userRouter.get("/:id", verifyToken, profile);
//
userRouter.post("/signUp", passwordHash, signUp);
userRouter.post("/signIn", login);
//update
userRouter.patch("/:id", verifyToken, validate, passwordHash, updateUser);
userRouter.delete("/:id", verifyToken, deleteUser);

module.exports = userRouter;
