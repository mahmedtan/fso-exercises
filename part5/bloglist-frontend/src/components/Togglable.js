import React, { useState, useImperativeHandle } from "react";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      {visible ? (
        <div>
          {props.children}
          <button onClick={toggleVisibility}>{props.close}</button>
        </div>
      ) : (
        <div>
          <button onClick={toggleVisibility}>{props.open}</button>
        </div>
      )}
    </div>
  );
});
Togglable.displayName = "Togglabe";

export default Togglable;
