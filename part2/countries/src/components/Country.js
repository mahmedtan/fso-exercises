import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./Country.css";
import Weather from "./Weather";
import dotenv from "dotenv";

dotenv.config();

function Country({ country }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    Axios.get("http://api.weatherstack.com/current", {
      params: {
        query: country.capital,
        access_key: process.env.REACT_APP_API_KEY,
      },
    }).then((result) => setWeather(result.data.current), console.error);
  }, [country.capital]);

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Spoken Languages</h2>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang["iso639_1"]}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={`${country.name}'s flag`} />

      {weather ? (
        <Weather country={country} weather={weather} />
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}

export default Country;
