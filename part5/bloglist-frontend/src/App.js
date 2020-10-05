import React, { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  //Lifecycle Methods

  useEffect(() => {
    const JSONUser = window.localStorage.getItem("user");
    if (JSONUser) {
      const user = JSON.parse(JSONUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  //Button handlers

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = await loginService.authorize({ username, password });
    setUser(user);
    window.localStorage.setItem("user", JSON.stringify(user));
    setUsername("");
    setPassword("");
    blogService.setToken(user.token);
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("user");
  };

  const handleNewBlog = async (e) => {
    e.preventDefault();

    const blog = await blogService.post({ title, author, url });
    setBlogs(blogs.concat(blog));
  };

  //input handlers

  const usernameChange = ({ target }) => {
    setUsername(target.value);
  };

  const passwordChange = ({ target }) => {
    setPassword(target.value);
  };

  return (
    <div>
      {!user ? (
        <Login
          handleLogin={handleLogin}
          username={username}
          password={password}
          passwordChange={passwordChange}
          usernameChange={usernameChange}
        />
      ) : (
        <Blogs
          blogs={blogs}
          user={user}
          handleLogout={handleLogout}
          handleNewBlog={handleNewBlog}
          title={title}
          author={author}
          url={url}
          setTitle={({ target }) => {
            setTitle(target.value);
          }}
          setAuthor={({ target }) => {
            setAuthor(target.value);
          }}
          setUrl={({ target }) => {
            setUrl(target.value);
          }}
        />
      )}

      <pre style={{ backgroundColor: "MistyRose", margin: 50, padding: 10 }}>
        <code>
          {JSON.stringify(
            { username, password, user, title, url, author },
            null,
            4
          )}
        </code>
      </pre>
    </div>
  );
};

export default App;
