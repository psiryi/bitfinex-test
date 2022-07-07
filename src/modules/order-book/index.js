import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import OrdersTable from "../../components/orders-table";
import { Container, PrecisionControls, PrecissionButton } from "./styled";

function Grid() {
  const buys = useSelector((state) => state.orders.buy_orders);
  const sales = useSelector((state) => state.orders.sale_orders);
  const [pricePrecision, setPricePrecision] = useState(0);
  const [sortedBuys, setSortedBuys] = useState([]);
  const [sortedSales, setSortedSales] = useState([]);

  const sortOrders = (orders, desc = false) =>
    orders.sort((a, b) => {
      if (a.amount < b.amount) return desc ? -1 : 1;
      if (a.amount > b.amount) return desc ? 1 : -1;
      return 0;
    });

  const getTotalOrdersAmount = (orders) =>
    orders.reduce((prev, order) => prev + order.amount, 0);

  const updateOrders = (orders, setOrders, desc) => {
    const totalAmount = getTotalOrdersAmount(orders);
    const mappedOrders = sortOrders(orders, desc).map(({ price, ...rest }) => ({
      ...rest,
      price: price.toFixed(pricePrecision),
      percentage: (rest.amount / totalAmount) * 100,
    }));
    setOrders(mappedOrders);
  };

  useEffect(() => {
    updateOrders(buys, setSortedBuys);
  }, [buys]);

  const transformNegativeSalesAmount = (sales) =>
    sales.map((sale) => ({ ...sale, amount: -sale.amount }));

  useEffect(() => {
    updateOrders(transformNegativeSalesAmount(sales), setSortedSales, true);
  }, [sales]);

  const handlePrecisionChange = (isPlus) => () => {
    setPricePrecision(isPlus ? pricePrecision + 1 : pricePrecision - 1);
  };

  return (
    <Container>
      <PrecisionControls>
        Precision:{" "}
        <PrecissionButton onClick={handlePrecisionChange(true)}>
          +
        </PrecissionButton>
        <PrecissionButton onClick={handlePrecisionChange(false)}>
          -
        </PrecissionButton>
      </PrecisionControls>
      <OrdersTable orders={sortedBuys} isBuys={true} />
      <OrdersTable orders={sortedSales} />
    </Container>
  );
}

export default Grid;
