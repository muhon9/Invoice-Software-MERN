import axios from "axios";

export const getTotalInvoices = async (token) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/client/totalclients`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateInvoice = async (token, invoice_id, invoice) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/invoice/${invoice_id}`,
    invoice,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};
