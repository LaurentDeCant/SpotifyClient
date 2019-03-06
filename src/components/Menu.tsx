import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styled from "styled-components";
import Icon, { IconType } from "./Icon";

const Wrapper = styled.ul`
  background: ${props => props.theme.background.dark};
  box-shadow: 2px 0 4px 2px rgba(0, 0, 0, 0.1);
  padding: 25px 0;
  width: 250px;
  z-index: 1;
`;

const StyledNavLink = styled(NavLink)`
  align-items: center;
  color: ${props => props.theme.foreground.dark};
  display: flex;
  font: ${props => props.theme.font.normal};
  height: 50px;
  padding: 0 50px;

  &:hover {
    background: ${props => props.theme.background.hover};
    color: ${props => props.theme.foreground.default};
  }

  &:active {
    background: ${props => props.theme.background.active};
  }

  &.active {
    border-right: 5px solid ${props => props.theme.primary};
    color: ${props => props.theme.foreground.default};
    padding-right: 45px;
  }
`;

const StyledIcon = styled(Icon)`
  margin-right: 15px;
`;

const Menu = (props: any) => {
  return (
    <Wrapper>
      <li>
        <StyledNavLink to="/browse">
          <StyledIcon type={IconType.ViewModule} />
          <span>Browse</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/search">
          <StyledIcon type={IconType.Search} />
          <span>Search</span>
        </StyledNavLink>
      </li>
    </Wrapper>
  );
};

export default withRouter(Menu);
