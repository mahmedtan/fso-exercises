import Content from "./Content";
import Header from "./Header";
import Total from "./Total";
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

//base with desc
interface CoursePartBaseDesc extends CoursePartBase {
  description: string;
}

//normal
interface CourseNormalPart extends CoursePartBaseDesc {
  type: "normal";
}

//groupProject
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

//groupProject
interface CourseSpecialPart extends CoursePartBaseDesc {
  type: "special";
  requirements: string[];
}

//submission
interface CourseSubmissionPart extends CoursePartBaseDesc {
  type: "submission";
  exerciseSubmissionLink: string;
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

function App() {
  //base

  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal",
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special",
    },
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
}

export default App;
