interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
const calculateExercises = (daily: number[], target: number): Result => {
  const average = daily.reduce((prev, curr) => prev + curr, 0) / daily.length;
  const percentile = (average / target) * 100;

  return {
    periodLength: daily.length,
    trainingDays: daily.filter((item) => item).length,
    success: average === target,
    rating: Number(percentile / 100) * 3,
    ratingDescription:
      Number(percentile / 20) > 4
        ? "You're almost there"
        : "You are getting there",
    target,
    average,
  };
};

interface ArgumentsExercises {
  dailyHours: number[];
  target: number;
}
const parseExerciseArguments = (arguments: string[]): ArgumentsExercises => {
  if (process.argv.length < 4) throw new Error("Not enough arguments");
  arguments.slice(2).forEach((item) => {
    if (isNaN(Number(item))) {
      throw new Error("Provided values were not numbers");
    }
  });

  return {
    dailyHours: arguments.slice(3).map((item) => Number(item)),
    target: Number(arguments[2]),
  };
};

const { dailyHours, target } = parseExerciseArguments(process.argv);
console.log(calculateExercises(dailyHours, target));
