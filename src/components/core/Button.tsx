import styled from "../../styles/styled";
import ButtonBase from "./ButtonBase";

const Button = styled(ButtonBase)`
  background: ${props => props.theme.color.primary};
  border-radius: ${props => props.theme.thickness.medium}px;
  color: ${props => props.theme.foreground.primary};
  height: ${props => props.theme.thickness.large}px;
  padding: ${props => props.theme.thickness.small}px
    ${props => props.theme.thickness.medium}px;
`;

export default Button;
