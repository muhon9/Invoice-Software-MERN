import axios from "axios";

export const addInvoiceAction = (invoice) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ADD_INVOICE_REQUEST_SEND",
    });
    const {
      loginUser: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/invoice/add`,
      invoice,
      config
    );

    dispatch({
      type: "ADD_INVOICE_REQUEST_SUCCESS",
      payloads: data,
    });
  } catch (error) {
    dispatch({
      type: "ADD_INVOICE_REQUEST_FAIL",
      payloads:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listInvoicesAction =
  ({ filterOptions, page, rowsPerPage }) =>
  async (dispatch, getState) => {
    const { status, createdById, start_date, end_date, invoiceNo } =
      filterOptions;

    try {
      dispatch({
        type: "LIST_INVOICE_REQUEST_SEND",
      });
      const {
        loginUser: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      //createdById=${createdBy}&start_date=${start_date}&end_date=${end_date}
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/invoice/list?page=${page}&rowsPerPage=${rowsPerPage}&createdById=${createdById}&status=${status}&start_date=${start_date}&end_date=${end_date}&invoiceNo=${invoiceNo}`,
        config
      );

      dispatch({
        type: "LIST_INVOICE_REQUEST_SUCCESS",
        payloads: data,
      });
    } catch (error) {
      dispatch({
        type: "LIST_INVOICE_REQUEST_FAIL",
        payloads:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const singleInvoiceAction =
  (invoice_id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "SINGLE_INVOICE_REQUEST_SEND",
      });
      const {
        loginUser: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      //createdById=${createdBy}&start_date=${start_date}&end_date=${end_date}
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/invoice/${invoice_id}`,
        config
      );

      dispatch({
        type: "SINGLE_INVOICE_REQUEST_SUCCESS",
        payloads: data,
      });
    } catch (error) {
      dispatch({
        type: "SINGLE_INVOICE_REQUEST_FAIL",
        payloads:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
