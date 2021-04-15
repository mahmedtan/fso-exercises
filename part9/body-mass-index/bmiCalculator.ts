const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  return bmi < 14.5
    ? "Underweight (Unhealthy)"
    : bmi >= 25
    ? "Overweight (Unhealthy)"
    : "Normal (healthy)";
};

interface Arguments {
  height: number;
  weight: number;
}
const parseArguments = (argss: string[]): Arguments => {
  if (process.argv.length < 4) throw new Error("Not enough arguments");
  if (process.argv.length > 4) throw new Error("Too many arguments");
  if (isNaN(Number(argss[2])) || isNaN(Number(argss[3])))
    throw new Error("Provided values were not numbers");
  else
    return {
      height: Number(argss[2]),
      weight: Number(argss[3]),
    };
};

const { height, weight } = parseArguments(process.argv);
console.log(calculateBmi(height, weight));
