import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { SET_BIRTHYEAR } from "../graphql/mutations";
import { ALL_AUTHORS } from "../graphql/queries";

const AuthorBirthYearForm = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [editAuthor] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = (e) => {
    e.preventDefault();
    editAuthor({ variables: { name: name, born: +born } });

    setName("");
    setBorn("");
  };

  return (
    <form onSubmit={submit}>
      <div>
        <label htmlFor="nameInput">
          name:
          <select
            id="nameInput"
            value={name}
            onChange={({ target: { value } }) => setName(value)}
          >
            {authors.map(({ name }) => (
              <option value={name} key={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label htmlFor="bornInput">
          born:
          <input
            type="number"
            name="born"
            id="bornInput"
            value={born}
            onChange={({ target: { value } }) => setBorn(value)}
          />
        </label>
      </div>

      <div>
        <input type="submit" value="update author" />
      </div>
    </form>
  );
};

export default AuthorBirthYearForm;
