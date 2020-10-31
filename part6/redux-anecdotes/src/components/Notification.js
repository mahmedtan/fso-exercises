import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../reducers/notificationReducer";
const Notification = () => {
  const notification = useSelector(({ notification }) => notification);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  }, [notification, dispatch]);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return notification ? <div style={style}>{notification}</div> : null;
};

export default Notification;
