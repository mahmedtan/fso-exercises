const app = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/Blog");
const { request } = require("../app");

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

describe("getting bloglist", () => {
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
  test("should default likes to zero if not provided", async () => {
    const response = await api.get("/api/blogs");

    response.body.forEach((blog) =>
      expect(blog.likes).toBeGreaterThanOrEqual(0)
    );
  });
});

describe("posting blogs", () => {
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

  test("should return a BAD request if title or url not provided", async () => {
    const newBlog = {
      url: "www.yuppy.com/post/345",
      likes: 33,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

describe("deleting a blog", () => {
  test("should remove the blog", async () => {
    const response = await api.get("/api/blogs");
    const { id } = response.body[0];

    await api.delete(`/api/blogs/${id}`).expect(204);
  });
  test("should fail with 404 if id doesn't exit", async () => {
    await api.delete(`/api/blogs/5f72161b551fe08ca3f63f74`).expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
