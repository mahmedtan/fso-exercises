import React from "react";
import Country from "./Country";

function Content({ countries }) {
  return (
    <div>
      {countries.length > 10 ? (
        <p>Too many matches,specify another filter</p>
      ) : countries.length > 1 ? (
        countries.map((country) => (
          <p key={country.numericCode}>{country.name}</p>
        ))
      ) : (
        <Country country={countries[0]} />
      )}
    </div>
  );
}

export default Content;
