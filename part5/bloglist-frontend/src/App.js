import React, { useState, useRef, useEffect } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const blogRef = useRef();

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
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  //Button handlers

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.authorize({ username, password });
      setUser(user);
      window.localStorage.setItem("user", JSON.stringify(user));
      setUsername("");
      setPassword("");
      blogService.setToken(user.token);
    } catch (error) {
      console.log(error);
      setMessage({
        type: "error",
        text: "username or password is not correct",
      });
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("user");
    setMessage({
      type: "success",
      text: "Logged out",
    });
    setTimeout(() => {
      setMessage(null);
    }, 4000);
  };

  const handleNewBlog = async ({ title, author, url }) => {
    try {
      const blog = await blogService.post({ title, author, url });
      setBlogs(blogs.concat(blog));

      blogRef.current.toggleVisibility();
      setMessage({
        type: "success",
        text: `new blog ${blog.title} ${blog.author} added`,
      });
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    } catch (error) {
      console.log(error);

      setMessage({
        type: "error",
        text: "Author or url missing",
      });
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    }
  };

  const handleLikes = async (blog) => {
    try {
      console.log(blog);

      const replacedBlog = await blogService.replace(blog.id, {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      });
      setBlogs(
        blogs.map((blog) => (blog.id === replacedBlog.id ? replacedBlog : blog))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Remove ${blog.title} ${blog.author}`)) {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((item) => item.id !== blog.id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  //input handlers

  const usernameChange = ({ target }) => {
    setUsername(target.value);
  };

  const passwordChange = ({ target }) => {
    setPassword(target.value);
  };

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {message && <Notification message={message} />}

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
          blogRef={blogRef}
          blogs={blogs}
          user={user}
          handleLikes={handleLikes}
          handleDelete={handleDelete}
          handleLogout={handleLogout}
          createNewBlog={handleNewBlog}
        />
      )}
    </div>
  );
};

export default App;
