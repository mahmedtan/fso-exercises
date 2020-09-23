import React from "react";
import "./Alert.css";

function Alert({ message }) {
  if (message)
    return (
      <div className="box">
        <h3 className="alert">{message}</h3>
      </div>
    );
  else return null;
}

export default Alert;
