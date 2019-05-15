import React, { useState } from "react";
import styled from "../../styles/styled";
import RoundButton, { Props as RoundButtonProps } from "./RoundButton";

const StyledRoundButton = styled(RoundButton)<{ toggled: boolean }>`
  ${props => props.toggled && `color: ${props.theme.primary};`}

  &:not(:disabled):hover {
    ${props => props.toggled && `color: ${props.theme.primary};`}
  }
`;

interface Props extends RoundButtonProps {}

function ToggleButton({ iconType }: Props) {
  const [toggled, setToggled] = useState(false);

  function handleClick() {
    setToggled(!toggled);
  }

  return (
    <StyledRoundButton
      iconType={iconType}
      onClick={handleClick}
      toggled={toggled}
    />
  );
}

export default ToggleButton;
