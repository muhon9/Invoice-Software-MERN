export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST_SEND":
      return { loading: true };
    case "LOGIN_REQUEST_SUCCESS":
      return { loading: false, userInfo: action.payloads };
    case "LOGIN_REQUEST_FAIL":
      return { loading: false, error: action.payloads };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

export const registrationReducer = (state = {}, action) => {
  switch (action.type) {
    case "REGISTRATION_REQUEST_SEND":
      return { loading: true };
    case "REGISTRATION_REQUEST_SUCCESS":
      return { loading: false, userInfo: action.payloads };
    case "REGISTRATION_REQUEST_FAIL":
      return { loading: false, error: action.payloads };

    default:
      return state;
  }
};

export const getUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "GET_USER_REQUEST_SEND":
      return { ...state, loading: true };
    case "GET_USER_REQUEST_SUCCESS":
      return { loading: false, user: action.payloads };
    case "GET_USER_REQUEST_FAIL":
      return { loading: false, error: action.payloads };
    default:
      return state;
  }
};

export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_USER_REQUEST_SEND":
      return { ...state, loading: true };
    case "UPDATE_USER_REQUEST_SUCCESS":
      return { loading: false, success: true, userInfo: action.payloads };
    case "UPDATE_USER_REQUEST_FAIL":
      return { loading: false, error: action.payloads };
    default:
      return state;
  }
};
