import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ALL_AUTHORS } from "../graphql/queries";
import AuthorBirthYearForm from "./AuthorBirthYearForm";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    if (result.data) setAuthors(result.data.allAuthors);
  }, [result]);

  if (!props.show) {
    return null;
  }

  if (result.loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birth Year</h2>
      <AuthorBirthYearForm authors={authors} />
    </div>
  );
};

export default Authors;
