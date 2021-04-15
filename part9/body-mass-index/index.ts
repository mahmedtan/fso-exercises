import express from "express";
import calcBmi from "./bmiModule";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", ({ query: { height, weight } }, res) => {
  if (isNaN(Number(height)) || isNaN(Number(weight)))
    res.status(400).json({ error: "malformatted parameters" });
  res.json(calcBmi(Number(height), Number(weight)));
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target)
    res.status(400).json({ error: "parameters missing" });
  else if (!Array.isArray(daily_exercises) || typeof target !== "number")
    res.status(400).json({ error: "malformatted parameters " });
  else res.json(calculateExercises(daily_exercises, target));
});

app.listen(3000, () => {
  console.log("Server running");
});
