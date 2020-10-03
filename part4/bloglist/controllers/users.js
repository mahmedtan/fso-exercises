const Router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

Router.post("/", async (req, res) => {
  const { username, password, name } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    passwordHash,
    name,
  });
  const saveUser = await user.save();
  res.json(saveUser);
});
Router.get("/", async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

module.exports = Router;
