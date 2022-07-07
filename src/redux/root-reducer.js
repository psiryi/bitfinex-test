import { combineReducers } from "redux";
import orders from "./orders/reducer";

const reducers = combineReducers({
  orders,
});

export default reducers;
