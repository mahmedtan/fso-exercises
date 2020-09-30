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
