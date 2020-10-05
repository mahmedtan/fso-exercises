import React from "react";
import Blog from "./Blog";
import CreateBlog from "./CreateBlog";

function Blogs({ blogs, user, handleLogout, ...props }) {
  return (
    <div>
      <h2>Blogs</h2>
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <hr />
      <CreateBlog {...props} />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default Blogs;
