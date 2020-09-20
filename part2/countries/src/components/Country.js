import React from "react";
import "./Country.css";

function Country({ country }) {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p> <h2>Languages</h2>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang["iso639_1"]}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={`${country.name}'s flag`} />
    </div>
  );
}

export default Country;
