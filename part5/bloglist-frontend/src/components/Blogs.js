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

      <pre style={{ backgroundColor: "SkyBlue", margin: 50, padding: 10 }}>
        <code>{JSON.stringify({ props }, null, 4)}</code>
      </pre>
    </div>
  );
}

export default Blogs;
