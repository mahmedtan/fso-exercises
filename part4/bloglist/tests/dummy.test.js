const blog = require("../models/Blog");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blog = [];
  const result = listHelper.dummy(blog);
  expect(result).toBe(1);
});
