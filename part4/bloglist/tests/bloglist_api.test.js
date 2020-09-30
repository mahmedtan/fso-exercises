const app = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/Blog");

const api = supertest(app);
const initialBlogs = [
  {
    title: "hwat ryot is a king",
    author: "Baby Jackal",
    url: "www.babyyoyoy.com/post/345",
    likes: 3456,
  },
  {
    title: "How to be a don chito",
    author: "Renny Quakers",
    url: "www.liefeofme.com/article/42421",
    likes: 987654,
  },
];
beforeEach(async () => {
  await Blog.deleteMany({});

  await Promise.all(initialBlogs.map(async (item) => new Blog(item).save()));
  console.log("saved");
});

describe("Blogs", () => {
  test(" are returned in JSON format and in full length", async () => {
    await api
      .get("/api/blogs/")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length);
  });
  test('should return a unique identifier "id"', async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});
afterAll(() => {
  mongoose.connection.close();
});
