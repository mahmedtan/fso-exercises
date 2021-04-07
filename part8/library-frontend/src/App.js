import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import { useApolloClient } from "@apollo/client";
import Recommendation from "./components/Recommendation";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    if (window.localStorage.getItem("user-token"))
      setToken(window.localStorage.getItem("user-token"));
  }, []);

  const handleError = (error) => {
    setError(error);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  if (!token)
    return (
      <>
        {error}
        <Login
          setToken={(receivedToken) => setToken(receivedToken)}
          setError={handleError}
        />
      </>
    );

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommendation")}>
          recommendation
        </button>
        <button
          onClick={() => {
            window.localStorage.clear();
            setToken(null);
            client.resetStore();
          }}
        >
          logout
        </button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
      <Recommendation show={page === "recommendation"} />
    </div>
  );
};

export default App;
