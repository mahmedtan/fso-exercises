import React from "react";

function Persons({ persons, filter }) {
  return (
    <div>
      {persons
        .filter((person) => new RegExp(filter, "i").test(person.name))
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
    </div>
  );
}

export default Persons;
