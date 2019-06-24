import React from "react";
import { RouteComponentProps, NavLink, withRouter } from "react-router-dom";
import styled from "../../styles/styled";

const List = styled.ul`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  font-size: ${props => props.theme.fontSize.medium}px;
  justify-content: center;
  margin-bottom: ${props => props.theme.thickness.medium}px;
`;

const StyledNavLink = styled(NavLink)`
  align-items: center;
  color: ${props => props.theme.onBackground.secondary};
  display: flex;
  height: ${props => props.theme.thickness.large}px;
  justify-content: center;
  overflow: hidden;
  padding: 0 ${props => props.theme.thickness.small}px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: ${props => props.theme.onBackground.primary};
  }

  &.active {
    color: ${props => props.theme.onBackground.primary};
  }

  &.active::after {
    background: ${props => props.theme.color.primary};
    bottom: 0;
    content: "";
    height: ${props => props.theme.thickness.extraExtraSmall}px;
    left: 50%;
    position: absolute;
    transform: translate(-50%, 0);
    width: ${props => props.theme.thickness.large}px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.extraSmall}px) {
    padding: 0 ${props => props.theme.thickness.medium}px;
  }
`;

interface Props extends RouteComponentProps {
  items: { path: string; text: string }[];
}

function SubMenu({ match, items }: Props) {
  return (
    <List>
      {items.map(item => (
        <li key={item.path}>
          <StyledNavLink to={`${match.url}/${item.path}`}>
            {item.text}
          </StyledNavLink>
        </li>
      ))}
    </List>
  );
}

export default withRouter(SubMenu);
