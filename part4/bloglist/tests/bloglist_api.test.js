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
  {
    title: "How to open a paint bucket",
    author: "Rick Gervais",
    url: "www.ricktavy.com/art/534",
  },
];
beforeEach(async () => {
  await Blog.deleteMany({});

  await Promise.all(initialBlogs.map(async (item) => new Blog(item).save()));
  console.log("saved");
});

describe("Blogs", () => {
  test("should be returned in JSON format and in full length", async () => {
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
  test("should able to add a blog to the list", async () => {
    const newBlog = {
      title: "Kingdom of Russia",
      author: "Randy",
      url: "www.helyo.com/post/345",
      likes: 43,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length + 1);

    expect(response.body.map((blog) => blog.title)).toContain(
      "Kingdom of Russia"
    );
  });
  test("should default likes to zero if not provided", async () => {
    const response = await api.get("/api/blogs");

    response.body.forEach((blog) =>
      expect(blog.likes).toBeGreaterThanOrEqual(0)
    );
  });
});
afterAll(() => {
  mongoose.connection.close();
});
