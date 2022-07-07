import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import OrderBook from "./modules/order-book";

import { connectOrders } from "./redux/orders/actions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectOrders());
  }, [dispatch]);

  return (
    <>
      <OrderBook />
    </>
  );
};

export default App;
