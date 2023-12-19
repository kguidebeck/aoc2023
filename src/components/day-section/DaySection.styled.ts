import styled from "styled-components";
import { rem } from "../../styles/helpers";
import { Color } from "../../styles/constants";

export const StyledSection = styled.section`
  --color: ${Color.white};
  --background: ${Color.red};
  padding: ${rem(40)} ${rem(20)};
  color: var(--color);
  background-color: var(--background);
  min-height: 330px;
  border: 2px solid ${Color.white};
  margin: 0 ${rem(40)};

  &:nth-of-type(odd) {
    --background: ${Color.green};
    border: 2px solid ${Color.white};
  }

  h2 {
    font-size: ${rem(20)};
  }

  h3 {
    font-size: ${rem(18)};
  }

  a {
    color: var(--color);
  }
`;
