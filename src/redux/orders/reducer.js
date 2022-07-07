import { transformOrder } from "../../helpers/transform-order";
import {
  ADD_ORDERS,
  CONNECT_ORDERS,
  CONNECT_ORDERS_SUCCESS,
  LOAD_ORDERS,
  LOAD_ORDERS_ERROR,
} from "../orders/constants";

const initialState = {
  buy_orders: [],
  sale_orders: [],
  connecting: false,
  error: null,
};

const orders = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_ORDERS:
      return { ...state, connecting: true };

    case CONNECT_ORDERS_SUCCESS:
      return { ...state, connecting: false, error: null };

    case LOAD_ORDERS:
      const new_orders = action.payload[1].map((order) => {
        return transformOrder(order);
      });
      const buy_orders = new_orders.filter((order) => order.amount >= 0);
      const sale_orders = new_orders.filter((order) => order.amount < 0);

      return {
        ...state,
        buy_orders: buy_orders,
        sale_orders: sale_orders,
      };

    case ADD_ORDERS:
      const amount = action.payload[1][2];
      const price = action.payload[1][0];

      if (action.payload[1][1] === 0) {
        return state;
      } else if (amount >= 0) {
        const buy_orders = [...state.buy_orders];
        const index = buy_orders.findIndex((order) => order.price === price);

        if (index >= 0) {
          buy_orders[index] = transformOrder(action.payload[1], index);
        } else {
          buy_orders.unshift(transformOrder(action.payload[1]));
          if (buy_orders.length > 25) {
            buy_orders.pop();
          }
        }

        return { ...state, buy_orders: buy_orders };
      } else {
        const sale_orders = [...state.sale_orders];
        const index = sale_orders.findIndex((order) => order.price === price);

        if (index >= 0) {
          sale_orders[index] = transformOrder(action.payload[1], index);
        } else {
          sale_orders.unshift(transformOrder(action.payload[1]));
          if (sale_orders.length > 25) {
            sale_orders.pop();
          }
        }

        return { ...state, sale_orders: sale_orders };
      }

    case LOAD_ORDERS_ERROR:
      return { ...state, error: action.payload, connecting: false };

    default:
      return state;
  }
};

export default orders;
