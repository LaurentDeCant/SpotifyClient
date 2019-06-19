import styled from "../../styles/styled";
import RoundButton from "./RoundButton";

const ToggleButton = styled(RoundButton).attrs(({ iconType }) => ({
  iconType
}))<{ isToggled?: boolean }>`
  ${props => props.isToggled && `color: ${props.theme.color.primary};`}

  &:not(:disabled):hover {
    ${props => props.isToggled && `color: ${props.theme.color.primary};`}
  }
`;

export default ToggleButton;
