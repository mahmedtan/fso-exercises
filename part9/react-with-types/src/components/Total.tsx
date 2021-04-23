const Total = ({
  courseParts,
}: {
  courseParts: { name: string; exerciseCount: number; type: string }[];
}) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;
