import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import ButtonBase from "./ButtonBase";
import Icon, { IconType } from "./Icon";

const StyedButton = styled(ButtonBase)`
  border-radius: 50%;
  color: ${props => props.theme.foreground.dark};
  display: flex;
  margin: 6.25px 12.5px;
  padding: 6.25px;

  &:disabled {
    color: ${props => props.theme.foreground.darker};
  }
`;

const StyledIcon = styled(Icon)`
  font-size: 25px;
`;

export interface Props {
  iconType: IconType;
}

function RoundButton({
  iconType,
  ...rest
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <StyedButton {...rest}>
      <StyledIcon type={iconType} />
    </StyedButton>
  );
}

export default RoundButton;
