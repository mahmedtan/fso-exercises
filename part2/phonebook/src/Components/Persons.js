import React from "react";

function Persons({ persons, filter, handleDelete }) {
  return (
    <div>
      {persons
        .filter((person) => new RegExp(filter, "i").test(person.name))
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}{" "}
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </div>
        ))}
    </div>
  );
}

export default Persons;
