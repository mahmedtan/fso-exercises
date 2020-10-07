import React, { useState } from "react";
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div
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
      <button onClick={toggleVisibility}>view</button>
      {visible && (
        <div>
          {blog.url} <br /> likes: {blog.likes} <button>like</button>
          <br /> {blog.author}
        </div>
      )}
    </div>
  );
};

export default Blog;
