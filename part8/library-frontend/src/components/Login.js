import { useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { LOGIN } from "../graphql/mutations";
const Login = ({ setToken, setError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ variables: { username, password } });
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if (result.data) {
      setToken(result.data.login.value);
      window.localStorage.setItem("user-token", result.data.login.value);
    }
  }, [result.data]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            username:
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={({ target: { value } }) => setUsername(value)}
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
              onChange={({ target: { value } }) => setPassword(value)}
            />
          </label>
        </div>

        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
