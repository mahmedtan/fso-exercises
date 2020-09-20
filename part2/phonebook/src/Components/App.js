import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const addNewName = (e) => {
    e.preventDefault();
    setPersons(persons.concat({ name: newName }));
    setNewName("");
  };

  const names = persons.map((person) => <p key={person.name}>{person.name}</p>);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name:{" "}
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {names}
    </div>
  );
};

export default App;
