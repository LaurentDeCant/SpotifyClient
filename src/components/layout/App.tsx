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

const Body = styled.div`
  display: flex;
  flex: 1;
`;

function App() {
  return (
    <Router>
      <Wrapper>
        <Header />
        <Body>
          <Menu />
          <Routes />
        </Body>

        <Player />
      </Wrapper>
    </Router>
  );
}

export default App;
