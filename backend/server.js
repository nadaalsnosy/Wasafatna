const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./Modules/Users/UserRoutes");
const recipeRouter = require("./Modules/Recipes/RecipeRoutes");

const port = process.env.PORT;
app.use(express.json());
// app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use(function (req, res, next) {
  const allowedOrigins = [
    "http://localhost:3000/",
    "http://localhost:3001/",
    "http://localhost:3002/",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/users", userRouter);
app.use("/recipes", recipeRouter);
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.DB, (err) => {
  if (err) process.exit(1);
  console.log("connected to database successfully");
});
app.listen(port, () => {
  console.log(`Server listening on your port`);
});

app.use((err, req, res, next) => {
  res.send({
    status: err.statusCode,
    message: err.message,
    errors: err.errors || [],
  });
});
