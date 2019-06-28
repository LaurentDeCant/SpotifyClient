import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import Button from "./Button";
import Icon, { IconType } from "./Icon";

const StyledButton = styled(Button).attrs<{
  isOnPrimary: boolean;
}>(({ isOnPrimary }) => ({
  isOnPrimary
}))`
  border-radius: 50%;
  height: ${props => props.theme.thickness.large}px;
  padding: ${props => props.theme.thickness.small}px;
  width: ${props => props.theme.thickness.large}px;
`;

const StyledIcon = styled(Icon)`
  font-size: ${props => props.theme.thickness.medium}px;
`;

export interface Props {
  isOnPrimary?: boolean;
  iconType: IconType;
}

function RoundButton({
  isOnPrimary,
  iconType,
  ...rest
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <StyledButton {...rest} isOnPrimary={!!isOnPrimary}>
      <StyledIcon type={iconType} />
    </StyledButton>
  );
}

export default RoundButton;
