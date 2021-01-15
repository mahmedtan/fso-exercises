import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../../query";

const AuthorsBirthYear = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (e) => {
      console.log(e.graphQLErrors);
    },
  });
  const { data } = useQuery(ALL_AUTHORS);
  const [authors, setAuthors] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();
    editAuthor({ variables: { name, setBornTo: +born } });
    setName("");
    setBorn("");
  };
  useEffect(() => {
    if (data) {
      setAuthors(data.allAuthors);

      setName(data.allAuthors[0].name);
    }
  }, [data]);

  return (
    <div>
      <h2>Set Birth Year</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="js-author-name-input">
          Name:
          <select
            type="text"
            id="js-author-name-input"
            value={name}
            onChange={({ target }) => {
              setName(target.value);
            }}
          >
            {authors &&
              authors.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
          </select>
        </label>
        <br />
        <label htmlFor="js-author-born-input">
          Born:
          <input
            type="number"
            id="js-author-born-input"
            value={born}
            onChange={({ target }) => {
              setBorn(target.value);
            }}
          />
        </label>
        <br />
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default AuthorsBirthYear;
