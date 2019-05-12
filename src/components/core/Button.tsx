import styled from "../../styles/styled";
import ButtonBase from "./ButtonBase";

const Button = styled(ButtonBase)`
  background: ${props => props.theme.primary};
  border-radius: 20px;
  color: ${props => props.theme.foreground.default};
  padding: 10px 20px;
`;

export default Button;
