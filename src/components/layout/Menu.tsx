import React, { HTMLAttributes } from "react";
import { NavLink } from "react-router-dom";
import styled from "../../styles/styled";
import { click } from "../../styles/effects";
import { Icon, IconType } from "../core";
import RecentList from "./RecentList";

const Wrapper = styled.div`
  background: ${props => props.theme.background.primary};
  box-shadow: ${props => props.theme.shadow.middle};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 ${props => props.theme.thickness.medium}px;
  z-index: 1;

  @media (min-width: ${({ theme }) => theme.breakpoint.extraSmall}px) {
    padding: ${props => props.theme.thickness.medium}px 0;
    width: ${props => props.theme.thickness.extraExtraLarge}px;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoint.extraSmall}px) {
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: ${props => props.theme.thickness.medium}px;
  }
`;

const StyledNavLink = styled(NavLink)`
  ${click}
  align-items: center;
  color: ${props => props.theme.foreground.secondary};
  display: flex;
  height: ${props => props.theme.thickness.large}px;
  padding: 0 ${props => props.theme.thickness.medium}px;

  &:hover {
    color: ${props => props.theme.foreground.primary};
  }

  &.active {
    border-bottom: ${props => props.theme.thickness.extraExtraSmall}px solid
      ${props => props.theme.color.primary};
    color: ${props => props.theme.foreground.primary};
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.extraSmall}px) {
    padding: 0 ${props => props.theme.thickness.large}px;

    &.active {
      border: none;
      border-right: ${props => props.theme.thickness.extraExtraSmall}px solid
        ${props => props.theme.color.primary};
    }
  }
`;

const StyledIcon = styled(Icon)`
  margin-right: ${props => props.theme.thickness.small}px;
`;

const StyledRecents = styled(RecentList)`
  overflow: hidden;
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoint.extraSmall}px) {
    display: block;
  }
`;

const items = [
  {
    url: `${process.env.PUBLIC_URL}/browse`,
    icon: IconType.Home,
    text: "Browse"
  },
  {
    url: `${process.env.PUBLIC_URL}/search`,
    icon: IconType.Search,
    text: "Search"
  },
  {
    url: `${process.env.PUBLIC_URL}/library`,
    icon: IconType.LibraryBooks,
    text: "Library"
  }
];

const Menu = ({ className }: HTMLAttributes<HTMLElement>) => {
  return (
    <Wrapper className={className}>
      <List>
        {items.map(item => (
          <li key={item.url}>
            <StyledNavLink to={item.url}>
              <StyledIcon type={item.icon} />
              {item.text}
            </StyledNavLink>
          </li>
        ))}
      </List>

      <StyledRecents />
    </Wrapper>
  );
};

export default Menu;
