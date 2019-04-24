import styled from "styled-components";

const StyedButton = styled.button`
  color: ${props => props.theme.foreground.dark};
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
    transition: background 0s 2s, height 2s, left 2s, top 2s, width 2s;
  }
  
  &:not(:disabled):hover {
    color: ${props => props.theme.foreground.default};
  }

  &:not(:disabled):hover::before {
    background: ${props => props.theme.background.hover};
  }

  &:not(:disabled):active::after {
    background: ${props => props.theme.background.active};
    height: 0;
    left: 50%;
    top: 50%;
    width: 0;
    transition: all 0s;
  }
`;

export default StyedButton;
