import React from "react";
import styled from "styled-components";
import MenuItem from "./MenuItem";

const Wrapper = styled.nav`
  background: ${props => props.theme.background};
  padding: 15px 0;
  width: 250px;
`;

const Menu = () => {
  return (
    <Wrapper>
      <ul>
        <MenuItem exact={true} icon="home" label="Home" to="/" />
        <MenuItem icon="search" label="Search" to="/search" />
      </ul>
    </Wrapper>
  );
};

export default Menu;
