import styled, { css } from "styled-components";

export const VisuallyHiddenCSS = css`
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

// Requires parent `position: relative;`
export const CoverLinkCSS = css`
  position: initial;
  &:after {
    bottom: 0;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export const CoverLink = styled.a`
  ${CoverLinkCSS}
`;

/**
 * @desc Converts px units to rems
 * @param px - Value in pixels
 * @returns {string}
 */
export const rem = (px: number) => {
  return `${parseFloat((px / 16).toFixed(4))}rem`;
};
