import styled from "../../styles/styled";
import { clickable } from "../../styles/effects";

interface Props {
  isOnPrimary?: boolean;
}

const Button = styled.button<Props>`
  ${props => clickable(!!props.isOnPrimary)}
`;

export default Button;
