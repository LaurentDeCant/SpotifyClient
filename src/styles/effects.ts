const click = (props: any) => `
  overflow: hidden;
  position relative;
  
  &::before, &::after {
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &::after {
    background: ${props.theme.background.active};
    opacity: 0;
    transition: opacity .2s;
  }
  
  &:not(:disabled):hover {
    color: ${props.theme.foreground.default};
  }

  &:not(:disabled):hover::before {
    background: ${props.theme.background.hover};
  }

  &:not(:disabled):active::after {
    opacity: 1;
    transition: 0s;
  }
`;

export { click };
