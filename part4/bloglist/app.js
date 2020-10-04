const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use((error, req, res, next) => {
  console.log(error.name);

  if (error.name === "ValidationError" || error.name === "ValidatorError") {
    res.status(400).json({ error: error.message }).end();
  }
  if (error.name === "JsonWebTokenError") {
    res.status(401).json({ error: "token missing or invalid" }).end();
  }

  next(error);
});
module.exports = app;
