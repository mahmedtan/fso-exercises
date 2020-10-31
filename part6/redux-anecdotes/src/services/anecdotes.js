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
let addVote = async (id) => {
  const { data } = await axios.get(`${baseUrl}/${id}`);

  const response = await axios.put(`${baseUrl}/${id}`, {
    ...data,
    votes: data.votes + 1,
  });
  return response.data;
};

export default {
  getAll,
  createNew,
  addVote,
};
