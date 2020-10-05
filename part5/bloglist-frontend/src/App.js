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
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = await loginService.authorize({ username, password });
    setUser(user);
    setUsername("");
    setPassword("");
  };
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
          handleSubmit={handleSubmit}
          username={username}
          password={password}
          passwordChange={passwordChange}
          usernameChange={usernameChange}
        />
      ) : (
        <Blogs blogs={blogs} user={user} />
      )}

      <pre style={{ backgroundColor: "MistyRose", margin: 50, padding: 10 }}>
        <code>{JSON.stringify({ username, password, user }, null, 4)}</code>
      </pre>
    </div>
  );
};

export default App;
