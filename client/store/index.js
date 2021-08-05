import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
// AN Edit: Importing Genies Reducer
import geniesReducer from "./genies";
import singleGenieReducer from './singleGenieRedux'
import orderReducer from "./orders";

// AN Edit: Added genies reducer to the combined reducer.
const reducer = combineReducers({ auth, genies: geniesReducer, genie: singleGenieReducer, orders: orderReducer});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
