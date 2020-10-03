const app = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");
const User = require("../models/User");
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  //   await new User({ name: "Ahmed", username: "abc", password: "dsgsf" }).save();
});
describe("Adding a user", () => {
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
