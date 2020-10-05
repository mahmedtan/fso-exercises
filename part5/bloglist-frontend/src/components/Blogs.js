import React from "react";
import Blog from "./Blog";

function Blogs({ blogs, user }) {
  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default Blogs;
