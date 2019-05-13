import styled from "../../styles/styled";
import ButtonBase from "./ButtonBase";

const Button = styled(ButtonBase)`
  background: ${props => props.theme.primary};
  border-radius: 25px;
  color: ${props => props.theme.foreground.default};
  padding: 12.5px 25px;
`;

export default Button;
