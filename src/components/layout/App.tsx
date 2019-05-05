import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "../../styles/styled";
import Header from "./Header";
import Menu from "./Menu";
import Player from "../player/Player";
import Routes from "./Routes";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledHeader = styled(Header)`
  flex-shrink: 0;
`;

const Body = styled.div`
  display: flex;
  flex-grow: 1;
  height: calc(100% - 50px - 100px);
`;

const StyledPlayer = styled(Player)`
  flex-shrink: 0;
`;

function App() {
  return (
    <Router>
      <Wrapper>
        <StyledHeader />

        <Body>
          <Menu />
          <Routes />
        </Body>

        <StyledPlayer />
      </Wrapper>
    </Router>
  );
}

export default App;
