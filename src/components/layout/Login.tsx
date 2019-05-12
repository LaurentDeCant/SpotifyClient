import React from "react";
import styled from "../../styles/styled";
import { Button, Heading } from "../core";
import { logInRedirect } from "../../utils/authorization";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  width: 150px;
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
