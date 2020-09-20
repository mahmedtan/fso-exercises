import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const addNewName = (e) => {
    e.preventDefault();

    if (!persons.find((person) => person.name === newName))
      setPersons(persons.concat({ name: newName, number: newNumber }));
    else window.alert(`${newName} is already added to the phonebook`);

    setNewName("");
  };

  const names = persons.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}
    </p>
  ));

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name:{" "}
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>

        <div>
          number:{" "}
          <input type="text" value={newNumber} onChange={handleNumberChange} />
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
