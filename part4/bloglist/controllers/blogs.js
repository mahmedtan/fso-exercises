const Router = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const app = require("../app");

Router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { blogs: 0 });
  response.json(blogs);
});

Router.post("/", async (request, response, next) => {
  const { title, url } = request.body;

  try {
    if (title && url) {
      const decodedToken = jwt.verify(request.token, config.SECRET);
      const user = await User.findById(decodedToken.id);

      const blog = new Blog({ ...request.body, user: user._id });
      const result = await blog.save();
      const savedBlog = await Blog.findById(result._id).populate("user", {
        blogs: 0,
      });

      user.blogs = user.blogs.concat(result._id);
      await user.save();
      response.status(201).json(savedBlog);
    } else {
      response.status(400).json({ error: "title or author prop missing" });
    }
  } catch (error) {
    next(error);
  }
});

Router.put("/:id", async (req, res, next) => {
  try {
    const doc = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    doc ? res.status(202).json(doc) : res.status(404).end();
  } catch (error) {
    next(error);
  }
});

Router.delete("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const { id } = jwt.verify(req.token, config.SECRET);
    if (!blog) {
      return res.status(404);
    } else if (blog.user.toString() === id) {
      await Blog.findByIdAndDelete(req.params.id);
      return res.status(204).end();
    } else {
      return res
        .status(401)
        .json({ error: "The token does not match the required user" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = Router;
