import axios from "axios";

export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LOGIN_REQUEST_SEND",
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/login`,
      {
        email,
        password,
      },
      config
    );

    dispatch({
      type: "LOGIN_REQUEST_SUCCESS",
      payloads: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "LOGIN_REQUEST_FAIL",
      payloads:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logOut = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: "USER_LOGOUT",
  });
};

export const registrationAction = (fName, lName, email, password) => async (
  dispatch
) => {
  try {
    dispatch({
      type: "REGISTRATION_REQUEST_SEND",
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/user`,
      {
        name: fName + lName,
        email,
        password,
      },
      config
    );

    dispatch({
      type: "REGISTRATION_REQUEST_SUCCESS",
      payloads: data,
    });

    dispatch({
      type: "LOGIN_REQUEST_SUCCESS",
      payloads: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "REGISTRATION_REQUEST_FAIL",
      payloads:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "GET_USER_REQUEST_SEND",
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
      `${process.env.REACT_APP_API_URL}/user/profile`,
      config
    );

    dispatch({
      type: "GET_USER_REQUEST_SUCCESS",
      payloads: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_USER_REQUEST_FAIL",
      payloads:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "UPDATE_USER_REQUEST_SEND",
    });

    const {
      loginUser: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log("oise", user);

    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/user/profile`,
      user,
      config
    );

    dispatch({
      type: "UPDATE_USER_REQUEST_SUCCESS",
      payloads: data,
    });

    dispatch({
      type: "GET_USER_REQUEST_SUCCESS",
      payloads: data,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_USER_REQUEST_FAIL",
      payloads:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
