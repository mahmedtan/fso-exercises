import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const replace = async (id, post) => {
  const response = await axios.put(`${baseUrl}/${id}`, post);
  return response.data;
};
const post = async (data) => {
  const response = await axios.post(baseUrl, data, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

export default { getAll, setToken, post, replace, remove };
