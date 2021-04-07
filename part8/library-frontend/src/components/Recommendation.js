import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useState } from "react";
import { ALL_BOOKS, GET_USER } from "../graphql/queries";

const Recommendation = ({ show }) => {
  const result = useQuery(GET_USER);
  const allBooks = useQuery(ALL_BOOKS);

  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => result.data && setUser(result.data.me), [result.data]);
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
          {books
            .filter((book) => book.genres.indexOf(user.favoriteGenre) >= 0)
            .map((a) => (
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
