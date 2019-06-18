import styled from "../../styles/styled";
import Button from "./Button";

const PrimaryButton = styled(Button).attrs(() => ({
  onPrimary: true
}))`
  background: ${props => props.theme.color.primary};
  border-radius: ${props => props.theme.thickness.medium}px;
  height: ${props => props.theme.thickness.large}px;
  padding: ${props => props.theme.thickness.small}px
    ${props => props.theme.thickness.medium}px;
`;

export default PrimaryButton;
