import { type } from "node:os";
import { CoursePart } from "./App";

export const Part = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((part) => {
        switch (part.type) {
          case "normal":
            return (
              <div style={{ background: "#eee", margin: "10px", padding: 10 }}>
                <p>
                  <h2>
                    {" "}
                    {part.name} {part.exerciseCount}{" "}
                  </h2>{" "}
                  {part.description}
                </p>
              </div>
            );
          case "groupProject":
            return (
              <div style={{ background: "#eee", margin: "10px", padding: 10 }}>
                <p>
                  <h2>
                    {" "}
                    {part.name} {part.exerciseCount}{" "}
                  </h2>
                  {part.groupProjectCount}
                </p>
              </div>
            );
          case "submission":
            return (
              <div style={{ background: "#eee", margin: "10px", padding: 10 }}>
                <p>
                  <h2>
                    {" "}
                    {part.name} {part.exerciseCount}{" "}
                  </h2>
                  {part.description} {part.exerciseSubmissionLink}
                </p>
              </div>
            );
          case "special":
            return (
              <div style={{ background: "#eee", margin: "10px", padding: 10 }}>
                <p>
                  <h2>
                    {part.name} {part.exerciseCount}{" "}
                  </h2>
                  {part.description} <br />
                  Required skills:
                  <ul>
                    {part.requirements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </p>
              </div>
            );
          default:
            assertNever(part);
        }
      })}
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
