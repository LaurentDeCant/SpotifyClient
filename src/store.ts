import { createStore as _createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import fetchMiddleware from "./fetchMiddleware";

export const createStore = () =>
  _createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware, fetchMiddleware))
  );
