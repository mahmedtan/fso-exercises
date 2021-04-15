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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
