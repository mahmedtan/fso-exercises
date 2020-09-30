const Router = require("express").Router();
const Blog = require("../models/Blog");

Router.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

Router.post("/", async (request, response) => {
  const { title, url } = request.body;
  if (title && url) {
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
  } else {
    response.status(400).json({ error: "title or author prop missing" });
  }
});
module.exports = Router;
