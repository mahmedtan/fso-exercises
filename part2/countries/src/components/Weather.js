import React from "react";

function Weather({ weather, country }) {
  return (
    <div>
      <h2>{`Weather in ${country.capital}`}</h2>
      <p>
        <strong>Temperature: </strong>
        {`${weather.temperature}ºC`}
      </p>
      <img src={weather.weather_icons[0]} alt="" />
      <p>
        <strong>Feels like: </strong>
        {weather.feelslike}
      </p>

      <p>
        <strong>Wind: </strong>
        {`${weather.wind_speed} mph ${weather.wind_dir}`}
      </p>
      <p>
        <strong>UV Index: </strong>
        {weather.uv_index}
      </p>
    </div>
  );
}

export default Weather;
