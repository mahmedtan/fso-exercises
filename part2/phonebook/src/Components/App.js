import React, { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

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
    setNewNumber("");
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>

      <PersonForm
        handleNameChange={handleNameChange}
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addNewName={addNewName}
      />

      <h2>Numbers</h2>

      <Persons filter={filter} persons={persons} />

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
