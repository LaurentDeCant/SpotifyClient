import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Menu from "./Menu";
import Browse from "./Browse";
import Search from "./Search";

const Wrapper = styled.div`
  display: flex;
  font-family: "Roboto", sans-serif;
  flex-direction: column;
  height: 100%;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
`;

const Routes = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: auto;
`;

class App extends Component {
  render() {
    return (
      <Router>
        <Wrapper>
          <Header />
          <Body>
            <Menu />
            <Routes>
              <Redirect from="/" to="/browse" />
              <Route path="/browse" component={Browse} />
              <Route path="/search" component={Search} />
            </Routes>
          </Body>
        </Wrapper>
      </Router>
    );
  }
}

export default App;
