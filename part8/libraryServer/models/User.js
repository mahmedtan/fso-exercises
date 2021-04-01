const { Schema, model } = require("mongoose");

const schema = new Schema({
  username: { type: String, required: true, minlength: 3, unique: true },
  favoriteGenre: { type: String, required: true, minlength: 3 },
});

module.exports = model("User", schema);
