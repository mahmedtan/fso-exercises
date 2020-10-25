import React, { useState } from "react";

const Blog = ({ blog, handleLikes, handleDelete, user }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div
      className="blogContainer"
      style={{
        borderRadius: 10,
        background: "#09e79e",
        color: "#e00051",
        borderWidth: 2,
        margin: 10,
        padding: 10,
        width: "90%",
        maxWidth: "500px",
        fontFamily: "sans-serif",
        borderStyle: "solid",
        borderColor: "#40b087",
      }}
    >
      <strong>{blog.title}</strong> {blog.author}{" "}
      <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      {visible && (
        <div>
          <a style={{ textDecoration: "none", color: "red" }} href={blog.url}>
            {blog.url}
          </a>{" "}
          <br /> likes: {blog.likes}{" "}
          <button
            onClick={() => {
              handleLikes(blog);
            }}
          >
            like
          </button>
          <br /> {blog.user.name}
          <br />
          {user.username === blog.user.username ? (
            <button onClick={() => handleDelete(blog)}>remove</button>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
