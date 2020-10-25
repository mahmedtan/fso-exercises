import React, { useState } from "react";

function CreateBlog({ createNewBlog }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleNewBlog = (e) => {
    e.preventDefault();
    createNewBlog({ title, author, url });
    setAuthor("");
    setTitle("");
    setUrl("");
  };
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleNewBlog} id="form">
        <div>
          <label htmlFor="title">
            title:
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="author">
            author:
            <input
              type="text"
              name="author"
              id="author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="url">
            url:
            <input
              type="url"
              name="url"
              id="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <input type="submit" value="create" />
      </form>
    </div>
  );
}

export default CreateBlog;
