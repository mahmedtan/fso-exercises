import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const reg = new RegExp(filter, "i");
  const names = persons
    .filter((person) => reg.test(person.name))
    .map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ));

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input type="text" value={filter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
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

      {/* <pre style={{ backgroundColor: "MistyRose", margin: 30, padding: 10 }}>
        <code>
          Debug:{" "}
          {JSON.stringify({ newName, newNumber, filter, persons }, null, 4)}
        </code>
      </pre> */}
    </div>
  );
};

export default App;
