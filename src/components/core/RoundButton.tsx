import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import ButtonBase from "./ButtonBase";
import Icon, { IconType } from "./Icon";

const StyedButton = styled(ButtonBase)`
  border-radius: 50%;
  color: ${props => props.theme.foreground.secondary};
  height: ${props => props.theme.thickness.large}px;
  padding: ${props => props.theme.thickness.small}px;
  width: ${props => props.theme.thickness.large}px;

  &:disabled {
    color: ${props => props.theme.foreground.tertiary};
  }
`;

const StyledIcon = styled(Icon)`
  font-size: ${props => props.theme.thickness.medium}px;
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
