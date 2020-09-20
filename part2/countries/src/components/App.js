import Axios from "axios";
import React, { useState, useEffect } from "react";
import Content from "./Content";

function App() {
  const [apiRes, setApiRes] = useState([]);
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  const handleFinderChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    Axios.get("https://restcountries.eu/rest/v2/all").then((result) => {
      setApiRes(result.data);
    });
  }, [setApiRes]);

  useEffect(() => {
    const regx = new RegExp(filter, "i");
    console.log("regex:", regx);

    if (filter)
      setCountries(apiRes.filter((country) => regx.test(country.name)));
    else setCountries([]);
  }, [filter, apiRes]);

  return (
    <div>
      <label htmlFor="finder">
        Find countries:
        <input
          id="finder"
          name="find"
          type="text"
          value={filter}
          onChange={handleFinderChange}
        />
      </label>

      {countries.length ? <Content countries={countries} /> : null}
    </div>
  );
}

export default App;
