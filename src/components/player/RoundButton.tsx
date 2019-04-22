import React from "react";
import styled from "styled-components";
import Icon, { IconType } from "../Icon";

const StyedButton = styled.button`
  border-radius: 50%;
  color: ${props => props.theme.foreground.dark};
  display: flex;
  margin: 0 10px;
  padding: 5px;
  position: relative;

  &:not(:disabled):hover {
    background: ${props => props.theme.background.hover};
    color: ${props => props.theme.foreground.default};
  }

  &:not(:disabled):active {
    background: ${props => props.theme.background.active};
  }
`;

const StyledIcon = styled(Icon)`
  font-size: 25px;
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconType: IconType;
}

function RoundButton({ iconType: iconType, ...rest }: Props) {
  return (
    <StyedButton {...rest}>
      <StyledIcon type={iconType} />
    </StyedButton>
  );
}

export default RoundButton;
