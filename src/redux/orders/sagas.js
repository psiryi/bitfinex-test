import { call, put, takeLatest, take } from "redux-saga/effects";
import ordersSocketChannel from "./orders-socket-channel";
import {
  loadOrders,
  addOrders,
  connectOrders,
  connectOrdersSuccess,
  loadOrdersError,
} from "./actions";
import {
  CONNECT_ORDERS,
  SOCKET_LOAD_DATA,
  SOCKET_ADD_DATA,
  SOCKET_CONNECTED,
  SOCKET_RECONNECT,
  SOCKET_ERROR,
} from "./constants";

export function* watchMessages(eventChannel) {
  while (true) {
    const event = yield take(eventChannel);
    switch (event.type) {
      case SOCKET_LOAD_DATA:
        yield put(loadOrders(event.payload));
        break;
      case SOCKET_ADD_DATA:
        yield put(addOrders(event.payload));
        break;
      case SOCKET_CONNECTED:
        yield put(connectOrdersSuccess());
        break;
      case SOCKET_RECONNECT:
        yield put(connectOrders());
        break;
      case SOCKET_ERROR:
        yield put(loadOrdersError("Error trying to connect."));
        break;
      default:
        break;
    }
  }
}

function* socketOrders() {
  try {
    const eventChannel = yield call(ordersSocketChannel);
    yield call(watchMessages, eventChannel);
  } catch (error) {
    yield put(loadOrdersError(error));
  }
}

const socketOrdersWatcher = function* socketOrdersWatcher() {
  yield takeLatest(CONNECT_ORDERS, socketOrders);
};

export default socketOrdersWatcher;
