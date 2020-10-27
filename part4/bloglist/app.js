const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const testRouter = require("./controllers/test");
const morgan = require("morgan");

mongoose.connect(
  config.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connected");
    }
  }
);

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(morgan("tiny"));
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
if (config.NODE_ENV === "test") {
  app.use("/api/test", testRouter);
}
app.use(middleware.errorHandler);
module.exports = app;
