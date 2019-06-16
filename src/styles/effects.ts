import { Theme } from "./theme";

const click = ({ theme }: { theme: Theme }) => `
  color: ${theme.onBackground.secondary};
  overflow: hidden;
  position relative;
  
  &:not(:disabled):hover {
    color: ${theme.onBackground.primary};
  }

  &::before, &::after {
    content: "";
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: opacity .2s;
    width: 100%;
    z-index: 1;
  }

  &::before {
    background: ${theme.onBackground.hover};
  }

  &::after {
    background: ${theme.onBackground.active};
  }

  &:not(:disabled):hover::before,
  &:not(:disabled):active::after {
    opacity: 1;
  }
`;

export { click };
