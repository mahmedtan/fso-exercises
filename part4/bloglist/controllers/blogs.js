const Router = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

Router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { blogs: 0 });
  response.json(blogs);
});

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  } else return null;
};
Router.post("/", async (request, response, next) => {
  const { title, url } = request.body;
  const token = getTokenFrom(request);
  try {
    const decodedToken = jwt.verify(token, config.SECRET);

    if (title && url) {
      if (!token || !decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" });
      }

      const user = await User.findById(decodedToken.id);

      const blog = new Blog({ ...request.body, user: user._id });
      const result = await blog.save();
      user.blogs = user.blogs.concat(result._id);
      await user.save();
      response.status(201).json(result);
    } else {
      response.status(400).json({ error: "title or author prop missing" });
    }
  } catch (error) {
    next(error);
  }
});

Router.put("/:id", async (req, res) => {
  try {
    const doc = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    doc ? res.status(202).json(doc) : res.status(404).end();
  } catch (error) {
    res.status(400).end();
    next(error);
  }
});

Router.delete("/:id", async (req, res, next) => {
  try {
    const result = await Blog.findByIdAndDelete(req.params.id);

    result ? res.status(204).json(result) : res.status(404).end();
  } catch (error) {
    res.status(400).end();
    next(error);
  }
});

module.exports = Router;
