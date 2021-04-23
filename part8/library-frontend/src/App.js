import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import { useApolloClient, useSubscription } from "@apollo/client";
import Recommendation from "./components/Recommendation";
import { AUTHOR_ADDED, BOOK_ADDED } from "./graphql/subscriptions";
import { ALL_AUTHORS, ALL_BOOKS } from "./graphql/queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const client = useApolloClient();

  const updateCacheWithBooks = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((book) => book.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };
  const updateCacheWithAuthor = (addedAuthor) => {
    const includedIn = (set, object) =>
      set.map((author) => author.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_AUTHORS });

    if (!includedIn(dataInStore.allAuthors, addedAuthor)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: dataInStore.allAuthors.concat(addedAuthor) },
      });
    } else {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: dataInStore.allAuthors.map((author) =>
            author.id === addedAuthor.id ? addedAuthor : author
          ),
        },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      updateCacheWithBooks(subscriptionData.data.bookAdded);
    },
  });

  useSubscription(AUTHOR_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log("Line 21");
      updateCacheWithAuthor(subscriptionData.data.authorAdded);
    },
  });
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

      <NewBook
        show={page === "add"}
        updateCacheWithBooks={updateCacheWithBooks}
      />
      <Recommendation show={page === "recommendation"} />
    </div>
  );
};

export default App;
