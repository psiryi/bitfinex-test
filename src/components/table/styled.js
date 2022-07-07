import styled from "styled-components";
import {
  light,
  borderColor,
  hoverColor,
  green,
  main,
  red,
} from "../../constants/colors";

export const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 13px;
  line-height: 30px;
  font-weight: 300;
  color: ${light};
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
`;

const sharedCellStyles = `
  padding: 2px 11px;
`;

export const TableHeader = styled.th`
  font-weight: 300;
  ${sharedCellStyles};
`;

export const TableCell = styled.td`
  min-wdth: 150px;
  ${sharedCellStyles};
`;

export const TableRow = styled.tr`
  background: ${({ percentage, isNegativePercentage }) =>
    percentage &&
    `linear-gradient(
          90deg
          , ${isNegativePercentage ? red : main} ${
      isNegativePercentage ? percentage : 100 - percentage
    }%, ${isNegativePercentage ? main : green} ${percentage}%);`};
`;

export const TableBody = styled.tbody`
  ${TableRow} {
    :not(:first-child) {
      border-bottom: 1px solid ${borderColor};
      :hover {
        background-color: ${hoverColor};
        cursor: pointer;
      }
    }
  }
`;
