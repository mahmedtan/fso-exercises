import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses";

const app = express();
const PORT = 3001;

app.use(cors());
app.use("/api/diagnoses", diagnosesRouter);

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
