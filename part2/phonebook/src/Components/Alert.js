import React from "react";
import "./Alert.css";

function Alert({ message, type }) {
  if (message)
    return (
      <div className={type}>
        <h3 className="alert">{message}</h3>
      </div>
    );
  else return null;
}

export default Alert;
