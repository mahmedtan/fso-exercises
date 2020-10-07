import React from "react";
import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";

function Blogs({
  blogs,
  user,
  handleLogout,
  handleLikes,
  handleDelete,
  blogRef,
  ...props
}) {
  return (
    <div>
      <h2>Blogs</h2>
      <div>
        <strong>{user.name}</strong> logged in{" "}
        <button onClick={handleLogout}>logout</button>
      </div>
      <hr />
      <Togglable open="new note" close="cancel" ref={blogRef}>
        <CreateBlog {...props} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleDelete={handleDelete}
          handleLikes={handleLikes}
          user={user}
        />
      ))}
    </div>
  );
}

export default Blogs;
