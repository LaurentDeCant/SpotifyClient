import React from "react";
import styled from "styled-components";
import { Button, Icon, IconType } from ".";

const StyedButton = styled(Button)`
  border-radius: 50%;
  color: ${props => props.theme.foreground.dark};
  display: flex;
  margin: 10px;
  padding: 5px;

  &:disabled {
    color: ${props => props.theme.foreground.darker};
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
