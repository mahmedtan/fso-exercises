import { NewPatient, Gender } from "../types";

interface Fields {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
}

const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatient => {
  return {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender),
  };
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) throw new Error("Field name is malformed");
  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) throw new Error("Field ssn is malformed");
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation))
    throw new Error("Field occupation is malformed");
  return occupation;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !Boolean(Date.parse(date)))
    throw new Error("Date is not correct" + date);
  return date;
};

const parseGender = (gender: unknown): string => {
  if (!gender || !isGender(gender))
    throw new Error("Field gender is malformed");
  return gender;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
const isString = (str: unknown): str is string => {
  return typeof str === "string" || str instanceof String;
};

export default toNewPatient;
