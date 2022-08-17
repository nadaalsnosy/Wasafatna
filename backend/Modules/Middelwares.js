const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const util = require("util");
const Joi = require("joi");

const asyncVerify = util.promisify(jwt.verify);

const passwordHash = async (req, res, next) => {
  const saltRounds = 10;
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
  }
  next();
};

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (authorization) {
      try {
        const payload = await asyncVerify(
          authorization,
          process.env.SECRET_KEY
        );
        req.userPayload = payload;
        next();
      } catch (error) {
        error.message = "token isn't valid";
        error.statusCode = 403;
        next(error);
      }
    } else {
      throw new Error("you're not authorized");
    }
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};

const validate = (req, res, next) => {
  try {
    const schema = Joi.object({
      username: Joi.string().empty(""),
      email: Joi.string().email().empty(""),
      password: Joi.string()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
          )
        )
        .empty(""),
      userListItem: Joi.object(),
    });

    Joi.attempt(req.body, schema);
    next();
  } catch (error) {
    // error.message = error;
    error.statusCode = 409;
    next(error);
  }
};

module.exports = { verifyToken, passwordHash, validate };
