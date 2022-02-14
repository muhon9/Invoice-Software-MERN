import axios from "axios";

export const getTotalClients = async (token) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/client/totalclients`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const queryClients = async (q, token) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/client/listquery?q=${q}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};
