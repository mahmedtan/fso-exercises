import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (obj) => {
  return axios.post(baseUrl, obj).then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};
const put = (id, newObj) => {
  return axios.put(`${baseUrl}/${id}`, newObj).then((res) => res.data);
};
export default { getAll, create, remove, put };
