import axios from "axios";

export const getTotalUsers = async (token) => {};

export const listUsers = async (token) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/user/list`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
