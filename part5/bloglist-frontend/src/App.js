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

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = await loginService.authorize({ username, password });
    setUser(user);
    window.localStorage.setItem("user", JSON.stringify(user));
    setUsername("");
    setPassword("");
  };
  const usernameChange = ({ target }) => {
    setUsername(target.value);
  };
  const passwordChange = ({ target }) => {
    setPassword(target.value);
  };
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("user");
  };

  return (
    <div>
      {!user ? (
        <Login
          handleSubmit={handleSubmit}
          username={username}
          password={password}
          passwordChange={passwordChange}
          usernameChange={usernameChange}
        />
      ) : (
        <Blogs blogs={blogs} user={user} handleLogout={handleLogout} />
      )}

      <pre style={{ backgroundColor: "MistyRose", margin: 50, padding: 10 }}>
        <code>{JSON.stringify({ username, password, user }, null, 4)}</code>
      </pre>
    </div>
  );
};

export default App;
