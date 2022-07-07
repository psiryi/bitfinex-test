import {
  CONNECT_ORDERS,
  CONNECT_ORDERS_SUCCESS,
  LOAD_ORDERS,
  ADD_ORDERS,
  LOAD_ORDERS_ERROR,
} from "./constants";

export const connectOrders = () => ({
  type: CONNECT_ORDERS,
});

export const connectOrdersSuccess = () => ({
  type: CONNECT_ORDERS_SUCCESS,
});

export const loadOrders = (orders) => ({
  type: LOAD_ORDERS,
  payload: orders,
});

export const loadOrdersError = () => ({
  type: LOAD_ORDERS_ERROR,
});

export const addOrders = (order) => ({
  type: ADD_ORDERS,
  payload: order,
});
