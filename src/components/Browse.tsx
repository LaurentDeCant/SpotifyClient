import React, { Component } from "react";
import {
  RouteComponentProps,
  NavLink,
  Redirect,
  Route,
  withRouter
} from "react-router-dom";
import styled from "styled-components";
import Categories from "./Categories";

const Wrapper = styled.div`
  height: calc(100% - 50px);
  padding: 25px;
`;

const StyledList = styled.ul`
  align-items: center;
  display: flex;
  flex-flow: row;
  justify-content: center;
  margin-bottom: 50px;
`;

const StyledNavLink = styled(NavLink)`
  align-items: center;
  color: ${props => props.theme.foreground.dark};
  display: flex;
  font-weight: ${props => props.theme.font.light};
  height: 50px;
  justify-content: center;
  padding: 0 25px;
  position: relative;

  &:hover {
    color: ${props => props.theme.foreground.default};
  }

  &.active {
    color: ${props => props.theme.foreground.default};
  }

  &.active&::after {
    background: ${props => props.theme.primary};
    bottom: 0;
    content: "";
    height: 2.5px;
    left: 50%;
    position: absolute;
    transform: translate(-50%, 0);
    width: 50px;
  }
`;

class Browse extends Component<RouteComponentProps> {
  render() {
    const { match } = this.props;

    return (
      <Wrapper>
        <StyledList>
          <li>
            <StyledNavLink to={`${match.url}/categories`}>
              Categories
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to={`${match.url}/featured-playist`}>
              Featured Playlists
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to={`${match.url}/new-releases`}>
              New Releases
            </StyledNavLink>
          </li>
        </StyledList>

        <Redirect from={`${match.path}`} to={`${match.path}/categories`} />
        <Route path={`${match.path}/categories`} component={Categories} />
      </Wrapper>
    );
  }
}

export default withRouter(Browse);
