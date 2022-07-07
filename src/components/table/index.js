import React from "react";
import generateKey from "../../helpers/generate-key";
import generateTableData from "./helpers";
import {
  StyledTable,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
} from "./styled";

const Table = ({ header, data, keys, isNegativePercentage = false }) => {
  const tableData = generateTableData(data, keys);

  return (
    <StyledTable>
      <TableBody>
        <TableRow>
          {header.map((column) => (
            <TableHeader key={generateKey(column)}>{column}</TableHeader>
          ))}
        </TableRow>
        {tableData.map(({ row, percentage }, index) => (
          <TableRow
            key={generateKey(`row${index}`)}
            percentage={percentage}
            isNegativePercentage={isNegativePercentage}
          >
            {row.map((cell) => (
              <TableCell key={generateKey(`${cell}`)}>{`${cell}`}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </StyledTable>
  );
};

export default Table;
