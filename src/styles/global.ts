import { createGlobalStyle } from "styled-components";
import { Color } from "./constants";

export const GlobalStyle = createGlobalStyle`
  :root {
    --white: ${Color.white};
  }

  body {
    font-size: 16px;
    line-height: 1.25;
    color: ${Color.black};
    background-color: ${Color.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* overflow-x: hidden;
    overflow-y: scroll; */
  }


  svg {
    display: block;
  }

  iframe {
    border: 0;
  }

  address {
    font-style: normal;
  }
`;
