import React from "react";
const Blog = ({ blog }) => (
  <div>
    {blog.title} <em>{blog.author}</em>
  </div>
);

export default Blog;
