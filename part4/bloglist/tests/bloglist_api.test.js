const app = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/Blog");
const User = require("../models/User");

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
let token = null;

beforeEach(async () => {
  await Blog.deleteMany({});

  await Promise.all(
    initialBlogs.map(async (item) => await new Blog(item).save())
  );
  console.log("saved");
  await User.deleteMany({});
  await api
    .post("/api/users")
    .send({ username: "ahmed", name: "Ahmed", password: "apisample" });
  const result = await api
    .post("/api/login")
    .send({ username: "ahmed", password: "apisample" });

  token = result.body.token;
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
      .auth(token, { type: "bearer" })
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
  test("should fail with 401 if token not provided", async () => {
    const newBlog = {
      title: "Kingdom of Russia",
      author: "Randy",
      url: "www.helyo.com/post/345",
      likes: 43,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });
});

describe("deleting a blog", () => {
  test("should remove the blog", async () => {
    const newBlog = {
      title: "Kingdom of Russia",
      author: "Randy",
      url: "www.helyo.com/post/345",
      likes: 43,
    };

    const result = await api
      .post("/api/blogs")
      .send(newBlog)
      .auth(token, { type: "bearer" });

    await api
      .delete(`/api/blogs/${result.body.id}`)
      .auth(token, { type: "bearer" })
      .expect(204);
  });
  test("should fail with 404 if id doesn't exit", async () => {
    await api.delete(`/api/blogs/5f72161b53f63f74`).expect(404);
  });
});

describe("updating a blog", () => {
  test("should replace the blog with new data", async () => {
    const response = await api.get("/api/blogs");
    const { id } = response.body[0];
    const updatedBlog = {
      ...response[0],
      likes: 1234,
      title: "We the best music",
    };

    await api
      .put(`/api/blogs/${id}`)
      .send(updatedBlog)
      .expect(202)
      .expect("Content-Type", /application\//);
  });
});

describe("adding a user", () => {
  test("should add a user to the list", async () => {
    const newUser = {
      username: "edvdsdejkr",
      name: "Drokwefaesy",
      password: "sifojf",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });
  test("should not add a user if username < 3 characters", async () => {
    const newUser = {
      username: "kr",
      name: "Drokwefaesy",
      password: "ddjf",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("should not add a user if password < 3 characters", async () => {
    const newUser = {
      username: "dfdkr",
      name: "Drokwefaesy",
      password: "jf",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
  test("should not add a user if username not given", async () => {
    const newUser = {
      username: "dfdkr",
      name: "Drokwefaesy",
      password: "jf",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
  test("should not add a user if password not given", async () => {
    const newUser = {
      username: "dfdkr",
      name: "Drokwefaesy",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
  test("should not add a user if username not unique", async () => {
    const newUser = {
      username: "eer",
      name: "Drokwefaesy",
      password: "jfjdfje",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
