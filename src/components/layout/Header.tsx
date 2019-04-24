import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { ripple } from "../../styles/effects";
import { UserProfile } from "../../types";
import { State } from "../../reducers";
import { isAuthorized } from "../../reducers/authorization";
import { selectUserProfile } from "../../reducers/userProfile";
import { getAuthorization } from "../../actions/authorization";
import { getUserProfile } from "../../actions/userProfile";
import Title from "./Title";
import User from "./User";

const Wrapper = styled.header`
  align-items: center;
  display: flex;
  background: ${props => props.theme.primary};
  box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
  height: 50px;
  justify-content: space-between;
  padding: 0 50px;
  z-index: 2;
`;

const LoginButton = styled.button`
  ${ripple}
  font-size: 15px;
  height: 100%;
  padding: 0 20px;
`;

interface Props {
  isAuthorized: boolean;
  userProfile?: UserProfile;
  getAuthorization: () => void;
  getUserProfile: () => void;
}

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

const mapState = (state: State) => ({
  isAuthorized: isAuthorized(state),
  userProfile: selectUserProfile(state)
});

const mapDispatch = {
  getAuthorization: getAuthorization,
  getUserProfile: getUserProfile
};

export default connect(
  mapState,
  mapDispatch
)(Header);
