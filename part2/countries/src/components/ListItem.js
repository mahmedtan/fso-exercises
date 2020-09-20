import React from "react";

function ListItem({ country, handleDetails }) {
  const handleClick = () => {
    handleDetails(country);
  };
  return (
    <div>
      {country.name} <button onClick={handleClick}>show</button>
    </div>
  );
}

export default ListItem;
