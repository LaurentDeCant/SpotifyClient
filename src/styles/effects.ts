const click = (props: any) => `
  overflow: hidden;
  position relative;
  
  &:not(:disabled):hover {
    color: ${props.theme.foreground.default};
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
    background: ${props.theme.background.hover};
  }

  &::after {
    background: ${props.theme.background.active};
  }

  &:not(:disabled):hover::before,
  &:not(:disabled):active::after {
    opacity: 1;
  }
`;

export { click };
