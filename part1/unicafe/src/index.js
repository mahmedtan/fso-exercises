import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, bad, neutral }) => {
  if (good || bad || neutral)
    return (
      <div>
        <Header text="statistics" />
        <table>
          <tbody>
            <Statistic text={"good"} value={good} />
            <Statistic text={"neutral"} value={neutral} />
            <Statistic text={"bad"} value={bad} />
            <Statistic text={"all"} value={good + neutral + bad} />
            <Statistic
              text={"average"}
              value={(good * 1 + bad * -1) / (good + neutral + bad)}
            />
            <Statistic
              text={"positive"}
              value={`${(good / (good + neutral + bad)) * 100} %`}
            />
          </tbody>
        </table>
      </div>
    );
  return (
    <div>
      <p>No feedback given</p>
    </div>
  );
};

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

      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
