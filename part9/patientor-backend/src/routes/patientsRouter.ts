import express from "express";
import { addNewPatient, getPatients } from "../services/patientsService";
import toNewPatient from "../utils/toNewPatient";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(getPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = addNewPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
export default router;
