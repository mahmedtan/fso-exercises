import React from "react";
import Blog from "./Blog";

function Blogs({ blogs, user, handleLogout }) {
  return (
    <div>
      <h2>Blogs</h2>
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <hr />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default Blogs;
