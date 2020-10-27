const Blog = require("../models/Blog");
const User = require("../models/User");
const testRouter = require("express").Router();

testRouter.post("/reset", async (req, res) => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  res.status(204).end();
});
module.exports = testRouter;
