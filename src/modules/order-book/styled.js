import styled from "styled-components";
import { light, main, success } from "../../constants/colors";

export const Container = styled.section`
  width: 100vw;
  height: 100vh;
  background: ${main};
  display: flex;
`;

export const PrecisionControls = styled.div`
  color: ${light};
`;

export const PrecissionButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  outline: none;
  background: ${success};
  color: ${light};
  margin-right: 10px;
  cursor: pointer;
`;
