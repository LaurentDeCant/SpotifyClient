import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { UserProfile } from "../../types";
import { logIn } from "../../actions/authorization";
import { getUserProfile } from "../../actions/userProfile";
import { State } from "../../reducers";
import { selectIsLoggedIn } from "../../reducers/authorization";
import { selectUserProfile } from "../../reducers/userProfile";
import { Button } from "../core";
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

const LoginButton = styled(Button)`
  font-size: 15px;
  height: 100%;
  padding: 0 20px;
`;

interface Props {
  className?: string;
  isLoggedIn: boolean;
  userProfile?: UserProfile;
  logIn: () => void;
  getUserProfile: () => void;
}

function Header({
  className,
  isLoggedIn,
  userProfile,
  logIn,
  getUserProfile
}: Props) {
  useEffect(() => {
    if (isLoggedIn) {
      getUserProfile();
    }
  }, []);

  function handleClick() {
    logIn();
  }

  return (
    <Wrapper className={className}>
      <Title />

      {userProfile ? (
        <User {...userProfile} />
      ) : (
        <>
          {!isLoggedIn && (
            <LoginButton onClick={handleClick}>Log In</LoginButton>
          )}
        </>
      )}
    </Wrapper>
  );
}

const mapState = (state: State) => ({
  isLoggedIn: selectIsLoggedIn(state),
  userProfile: selectUserProfile(state)
});

const mapDispatch = {
  logIn,
  getUserProfile
};

export default connect(
  mapState,
  mapDispatch
)(Header);
