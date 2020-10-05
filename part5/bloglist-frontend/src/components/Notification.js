import React from "react";
import { container, error, success } from "./Notification.module.css";

function Notification({ message }) {
  return (
    <div
      className={`${container} ${message.type === "success" ? success : error}`}
    >
      <h2>{message.text}</h2>
    </div>
  );
}

export default Notification;
