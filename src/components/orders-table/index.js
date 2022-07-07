import React from "react";

import Table from "../../components/table";

export default ({ orders, isBuys = false }) => {
  const tableData = isBuys
    ? {
        header: ["COUNT", "AMOUNT", "PRICE"],
        keys: ["quantity", "amount", "price"],
      }
    : {
        header: ["PRICE", "AMOUNT", "COUNT"],
        keys: ["price", "amount", "quantity"],
      };

  return orders.length ? (
    <Table
      header={tableData.header}
      keys={tableData.keys}
      data={orders}
      isNegativePercentage={!isBuys}
    />
  ) : null;
};
