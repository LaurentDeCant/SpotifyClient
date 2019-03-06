import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import UserProfile from "../types/userProfile";
import { State } from "../reducers";
import { isAuthorized } from "../reducers/authorization";
import { selectUserProfile } from "../reducers/userProfile";
import { getAuthorization } from "../actions/authorization";
import { getUserProfile } from "../actions/userProfile";
import Title from "./Title";
import User from "./User";

interface Props {
  isAuthorized: boolean;
  userProfile?: UserProfile;
  getAuthorization: () => void;
  getUserProfile: () => void;
}

const Wrapper = styled.header`
  align-items: center;
  display: flex;
  background: ${props => props.theme.primary};
  box-shadow: 0 2px 4px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  height: 50px;
  justify-content: space-between;
  padding: 0 50px;
  z-index: 2;
`;

const LoginButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.foreground.default};
  cursor: pointer;
  font-size: 15px;
  height: 100%;
  padding: 0 20px;

  &:hover {
    background: ${props => props.theme.background.hover};
  }

  &:active {
    background: ${props => props.theme.background.active};
  }
`;

class Header extends Component<Props> {
  componentDidMount() {
    const { isAuthorized, getUserProfile } = this.props;
    if (isAuthorized) {
      getUserProfile();
    }
  }

  handleClick = async () => {
    await this.props.getAuthorization();
  };

  render() {
    const { userProfile } = this.props;

    return (
      <Wrapper>
        <Title />

        {userProfile ? (
          <User {...userProfile} />
        ) : (
          <LoginButton onClick={this.handleClick}>Log In</LoginButton>
        )}
      </Wrapper>
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
)(Header);
