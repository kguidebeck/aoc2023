import styled from "styled-components";
import { rem } from "../../styles/helpers";
import { Color } from "../../styles/constants";

export const StyledHeader = styled.header`
  padding: ${rem(30)};
  color: ${Color.white};
  background-color: ${Color.green};
  text-align: right;

  a {
    color: ${Color.white};
    font-weight: bold;
    text-decoration: none;

    border: 1px solid ${Color.white};
    padding: ${rem(7)} ${rem(10)};
  }
`;
