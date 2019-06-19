import React, { useEffect, HTMLAttributes, ReactNode } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { UserProfile } from "../../types";
import { getUserProfile } from "../../actions/userProfile";
import { State } from "../../reducers";
import { selectIsLoggedIn } from "../../reducers/authorization";
import { selectUserProfile } from "../../reducers/userProfile";
import Brand from "./Brand";
import User from "./User";

const Wrapper = styled.header`
  align-items: center;
  display: flex;
  background: ${props => props.theme.color.primary};
  box-shadow: ${props => props.theme.shadow.middle};
  flex-shrink: 0;
  justify-content: space-between;
  z-index: 2;
`;

const Left = styled.div`
  height: 100%;
`;

const Right = styled.div`
  display: flex;
  height: 100%;
`;

interface Props {
  children: ReactNode;
  isLoggedIn: boolean;
  userProfile?: UserProfile;
  getUserProfile: () => void;
}

function Header({
  children,
  className,
  isLoggedIn,
  userProfile,
  getUserProfile
}: Props & HTMLAttributes<HTMLElement>) {
  useEffect(() => {
    if (isLoggedIn) {
      getUserProfile();
    }
  }, [isLoggedIn, getUserProfile]);

  return (
    <Wrapper className={className}>
      <Left>
        <Brand />
      </Left>

      {userProfile && (
        <Right>
          {children}
          <User {...userProfile} />
        </Right>
      )}
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
