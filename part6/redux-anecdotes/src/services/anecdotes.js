import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";
let getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
let createNew = async (data) => {
  const response = await axios.post(baseUrl, data);
  return response.data;
};

export default {
  getAll,
  createNew,
};
