const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  return bmi < 14.5
    ? "Underweight (Unhealthy)"
    : bmi >= 25
    ? "Overweight (Unhealthy)"
    : "Normal (healthy)";
};

console.log(calculateBmi(180, 74));
