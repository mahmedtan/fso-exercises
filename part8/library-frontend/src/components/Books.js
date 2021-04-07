import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ALL_BOOKS } from "../graphql/queries";

const Books = (props) => {
  const [books, setBooks] = useState([]);
  const result = useQuery(ALL_BOOKS);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    if (result.data) setBooks(result.data.allBooks);
  }, [result]);

  useEffect(() => {
    if (books) {
      setGenres(
        books
          .reduce((prev, curr) => {
            return [...prev, ...curr.genres];
          }, [])
          .filter((val, index, arr) => arr.indexOf(val) === index)
      );
    }
  }, [books]);

  if (!props.show) {
    return null;
  }
  if (result.loading) return <div>loading...</div>;

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <div>
          in genre <strong>{genre}</strong>
        </div>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {!genre
            ? books.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : books
                .filter((book) => book.genres.indexOf(genre) >= 0)
                .map((a) => (
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
                ))}
        </tbody>
      </table>

      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => {
            setGenre(genre);
          }}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;
