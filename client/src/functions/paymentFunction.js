import axios from "axios";

export const singleInvoicePayment = async (token, invoiceId) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/payment/list/${invoiceId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const addPayment = async (token, payment) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/payment/add`,
    payment,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};
