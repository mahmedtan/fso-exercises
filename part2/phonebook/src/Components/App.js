import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import phonebook from "../services/phonebook";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phonebook.getAll().then((data) => setPersons(data));
  }, [setPersons]);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${person.name} ?`)) {
      phonebook
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(console.error);
    }
  };
  const addNewName = (e) => {
    e.preventDefault();

    if (!persons.find((person) => person.name === newName)) {
      const person = { name: newName, number: newNumber };

      phonebook.create(person).then((data) => {
        setPersons(persons.concat(data));
      });
    } else if (
      window.confirm(
        `${newName} is already added to the phonebook, replace the old number with the new one?`
      )
    ) {
      const person = persons.find((person) => person.name === newName);
      const updatedPerson = { ...person, number: newNumber };

      phonebook.put(person.id, updatedPerson).then((data) => {
        setPersons(
          persons.map((item) => (item.id === person.id ? data : item))
        );
      });
    }

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

      <Persons filter={filter} persons={persons} handleDelete={handleDelete} />

      {/* <pre style={{ backgroundColor: "MistyRose", margin: 30, padding: 10 }}>
        <code>Debug: {JSON.stringify({ persons }, null, 4)}</code>
      </pre> */}
    </div>
  );
};

export default App;
