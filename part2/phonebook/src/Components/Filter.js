import React from "react";

export default function Filter({ filter, handleFilterChange }) {
  return (
    <div>
      filter shown with{" "}
      <input type="text" value={filter} onChange={handleFilterChange} />
    </div>
  );
}
