import patients from "../data/patients";
import { Patient, NewPatient } from "../types";
import { v4 as uuid } from "uuid";

export const getPatients = (): Omit<Patient, "ssn">[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

export const addNewPatient = (object: NewPatient): Patient => {
  const newPatient: Patient = {
    ...object,
    id: uuid(),
  };

  patients.push(newPatient);
  return newPatient;
};
