import React from "react";

function Login({
  handleLogin,
  username,
  usernameChange,
  password,
  passwordChange,
}) {
  return (
    <div>
      <h2>Login to application</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">
            username:
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={usernameChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            password:
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={passwordChange}
            />
          </label>
        </div>
        <input type="submit" value="Login" id="login" />
      </form>
    </div>
  );
}

export default Login;
