import { all } from "redux-saga/effects";
import socketOrdersWatcher from "./orders/sagas";

export default function* rootSaga() {
  yield all([socketOrdersWatcher()]);
}
