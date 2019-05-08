import styled from "styled-components";
import { click } from "../../styles/effects";

const Button = styled.button`
  ${click}

  &:disabled {
    color: ${props => props.theme.foreground.dark};
  }
`;

export default Button;
