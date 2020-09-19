import React from "react";

const Header = (props) => {
  return (
    <div>
      <h2>{props.course}</h2>
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

const Content = ({ parts }) => {
  const content = parts.map((part) => (
    <Part key={part.id} part={part.name} exercises={part.exercises} />
  ));

  return <div>{content}</div>;
};

const Total = ({ parts }) => {
  const total = parts.reduce((total, present) => total + present.exercises, 0);

  return (
    <div>
      <p>
        Total number of exercises <strong>{total}</strong>
      </p>
    </div>
  );
};
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
