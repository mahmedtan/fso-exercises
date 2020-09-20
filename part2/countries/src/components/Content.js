import React from "react";
import Country from "./Country";
import CountryList from "./CountryList";

function Content({ countries }) {
  return (
    <div>
      {countries.length > 10 ? (
        <p>Too many matches,specify another filter</p>
      ) : countries.length > 1 ? (
        <CountryList countries={countries} />
      ) : (
        <Country country={countries[0]} />
      )}
    </div>
  );
}

export default Content;
