import { CoursePart } from "./App";
import { Part } from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return <Part courseParts={courseParts} />;
};

export default Content;
