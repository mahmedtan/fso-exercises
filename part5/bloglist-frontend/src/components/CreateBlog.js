import React from "react";

function CreateBlog({
  handleNewBlog,
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
}) {
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <label htmlFor="title">
            title:
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={setTitle}
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
              onChange={setAuthor}
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
              onChange={setUrl}
            />
          </label>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default CreateBlog;
