import axios from "axios";

export const addClientsAction = (
  customerName,
  customerNumber,
  customerAddress
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ADD_CLIENT_REQUEST_SEND",
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
      `${process.env.REACT_APP_API_URL}/client/add`,
      { customerName, customerNumber, customerAddress },
      config
    );

    dispatch({
      type: "ADD_CLIENT_REQUEST_SUCCESS",
      payloads: data,
    });
  } catch (error) {
    dispatch({
      type: "ADD_CLIENT_REQUEST_FAIL",
      payloads:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listClientsAction = (
  sortOption,
  orderOption,
  page,
  rowsPerPage
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "LIST_CLIENTS_REQUEST_SEND",
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

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/client/list?page=${page}&rowsPerPage=${rowsPerPage}&sortOption=${sortOption}&orderOption=${orderOption}`,
      config
    );

    dispatch({
      type: "LIST_CLIENTS_REQUEST_SUCCESS",
      payloads: data,
    });
  } catch (error) {
    dispatch({
      type: "LIST_CLIENTS_REQUEST_FAIL",
      payloads:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
