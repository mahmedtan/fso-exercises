import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useState } from "react";
import { ALL_BOOKS, FAV_GENRE_BOOKS, GET_USER } from "../graphql/queries";

const Recommendation = ({ show }) => {
  const result = useQuery(GET_USER);
  const [getBooks, allBooks] = useLazyQuery(FAV_GENRE_BOOKS);

  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => result.data && setUser(result.data.me), [result.data]);
  useEffect(() => {
    if (user) getBooks({ variables: { genre: user.favoriteGenre } });
  }, [user]);

  useEffect(() => allBooks.data && setBooks(allBooks.data.allBooks), [
    allBooks.data,
  ]);

  if (!show) return null;
  if (result.loading || !user || allBooks.loading) return <div>loading!!!</div>;

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favourite genre <strong>{user.favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendation;
