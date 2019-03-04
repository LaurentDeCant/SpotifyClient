import React, { Component } from "react";
import styled from "styled-components";
import UserProfile from "../types/UserProfile";
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
  background: ${props => props.theme.backgroundDark};
  height: 50px;
  justify-content: space-between;
  padding: 0 30px;
`;

const LoginButton = styled.button`
  background: ${props => props.theme.backgroundDark};
  border: none;
  color: ${props => props.theme.foreground};
  cursor: pointer;
  font-size: 15px;
  height: 50px;
  padding: 0 20px;

  &:hover {
    color: ${props => props.theme.primary};
  }

  &:focus {
    outline: none;
  }
`;

const UserName = styled.span``;

class Header extends Component<Props> {
  componentDidUpdate() {
    const { isAuthorized, userProfile, getUserProfile } = this.props;
    if (isAuthorized && !userProfile) {
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

export default Header;
