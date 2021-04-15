import express from "express";
import calcBmi from "./bmiModule";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", ({ query: { height, weight } }, res) => {
  if (isNaN(Number(height)) || isNaN(Number(weight)))
    res.status(400).json({ error: "malformatted parameters" });
  res.json(calcBmi(Number(height), Number(weight)));
});
app.listen(3000, () => {
  console.log("Server running");
});
