import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  loginReducer,
  registrationReducer,
  getUserReducer,
  updateUserReducer,
} from "./reducers/userReducers";
import {
  addInvoiceReducer,
  listInvoicesReducer,
  singleInvoiceReducer,
} from "./reducers/invoiceReducers";
import { jssPreset } from "@material-ui/styles";
import {
  addClientReducer,
  listClientsReducer,
} from "./reducers/clientReducers";

const rootReducer = combineReducers({
  loginUser: loginReducer,
  registrationUser: registrationReducer,
  userDetails: getUserReducer,
  updateUser: updateUserReducer,
  clients: listClientsReducer,
  addClient: addClientReducer,
  addInvoice: addInvoiceReducer,
  listInvoices: listInvoicesReducer,
  singleInvoice: singleInvoiceReducer,
});

const userInfoFromLocal = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  loginUser: { userInfo: userInfoFromLocal },
};
const middlewares = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
