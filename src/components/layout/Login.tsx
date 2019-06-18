import React from "react";
import styled from "../../styles/styled";
import { Heading, PrimaryButton } from "../core";
import { logInRedirect } from "../../utils/authorization";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const StyledButton = styled(PrimaryButton)`
  width: ${props => props.theme.thickness.extraLarge}px;
`;

function LogIn() {
  function handleCLick() {
    logInRedirect();
  }

  return (
    <Wrapper>
      <Heading>You are not logged in.</Heading>
      <StyledButton onClick={handleCLick}>Log In</StyledButton>
    </Wrapper>
  );
}

export default LogIn;
