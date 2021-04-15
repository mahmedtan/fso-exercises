interface BMI {
  height: number;
  weight: number;
  bmi: string;
}

const calculateBmi = (height: number, weight: number): BMI => {
  const bmi = weight / Math.pow(height / 100, 2);
  return {
    height,
    weight,
    bmi:
      bmi < 14.5
        ? "Underweight (Unhealthy)"
        : bmi >= 25
        ? "Overweight (Unhealthy)"
        : "Normal (healthy)",
  };
};

export default calculateBmi;
