import React from "react";
import { Link } from "react-router-dom";
import styled from "../../styles/styled";
import { Icon, IconType } from "../core";

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: ${props => props.theme.font.size.large};
  font-weight: ${props => props.theme.font.weight.bold};
`;

const StyledIcon = styled(Icon)`
  margin-right: 15px;
`;

const Title = () => {
  return (
    <StyledLink to="/browse">
      <StyledIcon type={IconType.Wifi} />
      Spotify
    </StyledLink>
  );
};

export default Title;
