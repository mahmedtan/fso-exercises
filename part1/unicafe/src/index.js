import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Content = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  return (
    <div>
      <Header text="give feedback" />

      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <Header text="statistics" />
      <Content text={"good"} value={good} />
      <Content text={"neutral"} value={neutral} />
      <Content text={"bad"} value={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
