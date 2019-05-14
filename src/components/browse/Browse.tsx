import React from "react";
import {
  RouteComponentProps,
  NavLink,
  Route,
  withRouter
} from "react-router-dom";
import styled from "../../styles/styled";
import DefaultRoute from "../DefaultRoute";
import Categories from "./Categories";
import NewReleases from "./NewReleases";
import FeaturedPlaylists from "./FeaturedPlaylists";

const Wrapper = styled.div`
  height: 100%;
`;

const StyledList = styled.ul`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: ${props => props.theme.fontSize.medium};
  justify-content: center;
  margin-bottom: 5px;
  position: relative;
  top: -20px;

  @media (min-width: ${({ theme }) => theme.breackpoints.extraSmall}px) {
    margin-bottom: 25px;
    top: 0;
  }
`;

const StyledNavLink = styled(NavLink)`
  align-items: center;
  color: ${props => props.theme.foreground.dark};
  display: flex;
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

  &.active::after {
    background: ${props => props.theme.primaryLight};
    bottom: 0;
    content: "";
    height: 2.5px;
    left: 50%;
    position: absolute;
    transform: translate(-50%, 0);
    width: 50px;
  }
`;

const links = [
  {
    url: "categories",
    label: "Categories"
  },
  {
    url: "new-releases",
    label: "New Releases"
  },
  {
    url: "featured-playist",
    label: "Featured Playlists"
  }
];

function Browse({ match }: RouteComponentProps) {
  return (
    <Wrapper>
      <StyledList>
        {links.map(link => (
          <li key={link.url}>
            <StyledNavLink to={`${match.url}/${link.url}`}>
              {link.label}
            </StyledNavLink>
          </li>
        ))}
      </StyledList>

      <DefaultRoute from={`${match.path}`} to={`${match.path}/categories`} />
      <Route exact path={`${match.path}/categories`} component={Categories} />
      <Route path={`${match.path}/new-releases`} component={NewReleases} />
      <Route
        path={`${match.path}/featured-playist`}
        component={FeaturedPlaylists}
      />
    </Wrapper>
  );
}

export default withRouter(Browse);
