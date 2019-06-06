import React, { ButtonHTMLAttributes } from "react";
import styled from "../../styles/styled";
import RoundButton, { Props as RoundButtonProps } from "./RoundButton";

const StyledRoundButton = styled(RoundButton)<{ isToggled: boolean }>`
  ${props => props.isToggled && `color: ${props.theme.foreground.default};`}

  &:not(:disabled):hover {
    ${props => props.isToggled && `color: ${props.theme.foreground.default};`}
  }
`;

interface Props extends RoundButtonProps {
  isToggled: boolean;
}

function ToggleButton({
  iconType,
  isToggled,
  ...rest
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <StyledRoundButton {...rest} iconType={iconType} isToggled={isToggled} />
  );
}

export default ToggleButton;
