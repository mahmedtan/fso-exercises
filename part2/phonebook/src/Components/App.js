import Axios from "axios";
import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/persons").then((result) => {
      setPersons(result.data);
    });
  }, [setPersons]);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const addNewName = (e) => {
    e.preventDefault();

    if (!persons.find((person) => person.name === newName)) {
      const payload = { name: newName, number: newNumber };

      Axios.post("http://localhost:3001/persons", payload).then((response) => {
        setPersons(persons.concat(response.data));
      });
    } else window.alert(`${newName} is already added to the phonebook`);

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
        <code>Debug: {JSON.stringify({ persons }, null, 4)}</code>
      </pre> */}
    </div>
  );
};

export default App;
