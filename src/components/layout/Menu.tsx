import React from "react";
import { NavLink } from "react-router-dom";
import styled from "../../styles/styled";
import { click } from "../../styles/effects";
import { Icon, IconType } from "../core";

const Wrapper = styled.ul`
  background: ${props => props.theme.background.dark};
  box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: center;
  padding: 0 ${props => props.theme.thickness.medium}px;
  width: 100%;
  z-index: 1;

  @media (min-width: ${({ theme }) => theme.breackpoints.extraSmall}px) {
    box-shadow: 2px 0 4px 2px rgba(0, 0, 0, 0.2);
    flex-direction: column;
    justify-content: flex-start;
    padding: ${props => props.theme.thickness.medium}px 0;
    width: ${props => props.theme.thickness.extraExtraLarge}px;
  }
`;

const StyledNavLink = styled(NavLink)`
  ${click}
  align-items: center;
  color: ${props => props.theme.foreground.dark};
  display: flex;
  height: ${props => props.theme.thickness.large}px;
  padding: 0 ${props => props.theme.thickness.medium}px;

  &:hover {
    color: ${props => props.theme.foreground.default};
  }

  &.active {
    border-bottom: ${props => props.theme.thickness.extraExtraSmall}px solid
      ${props => props.theme.primaryLight};
    color: ${props => props.theme.foreground.default};
  }

  @media (min-width: ${({ theme }) => theme.breackpoints.extraSmall}px) {
    padding: 0 ${props => props.theme.thickness.large}px;

    &.active {
      border: none;
      border-right: ${props => props.theme.thickness.extraExtraSmall}px solid
        ${props => props.theme.primaryLight};
    }
  }
`;

const StyledIcon = styled(Icon)`
  margin-right: ${props => props.theme.thickness.small}px;
`;

const Text = styled.span``;

const Menu = () => {
  return (
    <Wrapper>
      <li>
        <StyledNavLink to={`${process.env.PUBLIC_URL}/browse`}>
          <StyledIcon type={IconType.ViewModule} />
          <Text>Browse</Text>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to={`${process.env.PUBLIC_URL}/search`}>
          <StyledIcon type={IconType.Search} />
          <Text>Search</Text>
        </StyledNavLink>
      </li>
    </Wrapper>
  );
};

export default Menu;
