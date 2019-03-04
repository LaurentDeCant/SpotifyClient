import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import UserProfile from "../types/UserProfile";
import { State } from "../reducers";
import Header from "../components/Header";
import Menu from "../components/Menu";
import { isAuthorized } from "../reducers/authorization";
import { selectUserProfile } from "../reducers/userProfile";
import { getAuthorization } from "../actions/authorization";
import { getUserProfile } from "../actions/userProfile";

interface Props {
  isAuthorized: boolean;
  userProfile?: UserProfile;
  getAuthorization: () => void;
  getUserProfile: () => void;
}

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

const Content = styled.div`
  background: ${props => props.theme.backgroundLight};
  flex: 1;
`;

class App extends Component<Props> {
  render() {
    return (
      <Router>
        <Wrapper>
          <Header {...this.props} />
          <Body>
            <Menu />
            <Content />
          </Body>
        </Wrapper>
      </Router>
    );
  }
}

const mapStateToProps = (state: State) => ({
  isAuthorized: isAuthorized(state),
  userProfile: selectUserProfile(state)
});

const mapDispatchToProps = {
  getAuthorization: getAuthorization,
  getUserProfile: getUserProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
