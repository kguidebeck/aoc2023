import styled from "styled-components";
import { Color } from "../../styles/constants";
import { rem } from "../../styles/helpers";

export const LayoutWrap = styled.div`
  --color: ${Color.white};
  --background: ${Color.green};
  color: var(--color);
  background-color: var(--background);
  padding-bottom: ${rem(40)};

  h1 {
    padding: 0 ${rem(40)};
    margin-top: 0;
  }
`;

export const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 ${rem(40)};
`;
