const ripple = (props: any) => `
  color: ${props.theme.foreground.dark};
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
    background: radial-gradient(circle, ${
      props.theme.background.active
    } .1%, transparent .1%) center/200000%;
    opacity: 0;
    transition: background 0.8s, opacity 0.2s 0.2s;
  }
  
  &:not(:disabled):hover {
    color: ${props.theme.foreground.default};
  }

  &:not(:disabled):hover::before {
    background: ${props.theme.background.hover};
  }

  &:not(:disabled):active::after {
    background-size: 100%;
    opacity: 1;
    transition: 0s;
  }
`;

export { ripple };
