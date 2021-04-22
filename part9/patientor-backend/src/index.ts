import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnosesRouter";
import patientsRouter from "./routes/patientsRouter";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
