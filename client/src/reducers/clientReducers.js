export const addClientReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_CLIENT_REQUEST_SEND":
      return { loading: true };
    case "ADD_CLIENT_REQUEST_SUCCESS":
      return { loading: false, success: true, client: action.payloads };
    case "ADD_CLIENT_REQUEST_FAIL":
      return { loading: false, error: action.payloads };
    default:
      return state;
  }
};

export const listClientsReducer = (state = {}, action) => {
  switch (action.type) {
    case "LIST_CLIENTS_REQUEST_SEND":
      return { loading: true };
    case "LIST_CLIENTS_REQUEST_SUCCESS":
      return { loading: false, success: true, clientsList: action.payloads };
    case "LIST_CLIENTS_REQUEST_FAIL":
      return { loading: false, error: action.payloads };
    default:
      return state;
  }
};
