import React, { useState } from "react";
import ListItem from "./ListItem";
import Country from "./Country";

function CountryList({ countries }) {
  const [item, setItem] = useState("");
  const handleDetails = (country) => {
    setItem(country);
  };

  if (item) return <Country country={item} />;
  return (
    <div>
      {countries.map((country) => (
        <ListItem
          key={country.numericCode}
          country={country}
          handleDetails={handleDetails}
        />
      ))}
    </div>
  );
}

export default CountryList;
