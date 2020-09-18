import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};
const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  );
};

const Content = (props) => {
  const [part1, part2, part3] = props.parts;
  return (
    <div>
      <Part part={part1.name} exercises={part1.exercises} />
      <Part part={part2.name} exercises={part2.exercises} />
      <Part part={part3.name} exercises={part3.exercises} />
    </div>
  );
};

const Total = (props) => {
  const [part1, part2, part3] = props.parts;

  return (
    <div>
      <p>
        Number of exercises{" "}
        {part1.exercises + part2.exercises + part3.exercises}
      </p>
    </div>
  );
};

const App = () => {
  const course = "Half stack application development";
  const parts = [
    { name: "fundamentals of React", exercises: 10 },
    { name: "Using props to pass data", exercises: 7 },
    { name: "State of a component", exercises: 14 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
