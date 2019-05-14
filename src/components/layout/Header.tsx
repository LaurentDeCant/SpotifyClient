import React, { useEffect, HTMLAttributes } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { UserProfile } from "../../types";
import { getUserProfile } from "../../actions/userProfile";
import { State } from "../../reducers";
import { selectIsLoggedIn } from "../../reducers/authorization";
import { selectUserProfile } from "../../reducers/userProfile";
import Title from "./Title";
import User from "./User";

const padding = 50;
const Wrapper = styled.header`
  align-items: center;
  display: flex;
  background: ${props => props.theme.primary};
  box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
  height: 50px;
  justify-content: space-between;
  padding: 0 ${padding / 2}px;
  z-index: 2;

  @media (min-width: ${({ theme }) => theme.breackpoints.extraSmall}px) {
    padding: 0 ${padding}px;
  }
`;

interface Props extends HTMLAttributes<HTMLDivElement> {
  isLoggedIn: boolean;
  userProfile?: UserProfile;
  getUserProfile: () => void;
}

function Header({ className, isLoggedIn, userProfile, getUserProfile }: Props) {
  useEffect(() => {
    if (isLoggedIn) {
      getUserProfile();
    }
  }, []);

  return (
    <Wrapper className={className}>
      <Title />
      {userProfile && <User {...userProfile} />}
    </Wrapper>
  );
}

const mapState = (state: State) => ({
  isLoggedIn: selectIsLoggedIn(state),
  userProfile: selectUserProfile(state)
});

const mapDispatch = {
  getUserProfile
};

export default connect(
  mapState,
  mapDispatch
)(Header);
