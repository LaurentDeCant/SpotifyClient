const ripple = (props: any) => `
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
    } 20%, transparent 20%);
    opacity: 0;
    transform: scale(5, 5);
    transition: transform .2s, opacity 0s .2s;
  }
  
  &:not(:disabled):hover {
    color: ${props.theme.foreground.default};
  }

  &:not(:disabled):hover::before {
    background: ${props.theme.background.hover};
  }

  &:not(:disabled):active::after {
    transform: scale(0, 0);
    opacity: 1;
    transition: 0s;
  }
`;

export { ripple };
