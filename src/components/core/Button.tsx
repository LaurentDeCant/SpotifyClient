import styled from "../../styles/styled";
import { clickable } from "../../styles/effects";

interface Props {
  onPrimary?: boolean;
}

const Button = styled.button<Props>`
  ${props => clickable(!!props.onPrimary)}
`;

export default Button;
