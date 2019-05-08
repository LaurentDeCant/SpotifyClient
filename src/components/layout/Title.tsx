import React from "react";
import { Link } from "react-router-dom";
import styled from "../../styles/styled";
import { Icon, IconType } from "../core";

const StyledHeader = styled.h1`
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
    <Link to={`${process.env.PUBLIC_URL}/browse`}>
      <StyledHeader>
        <StyledIcon type={IconType.Wifi} />
        Spotify
      </StyledHeader>
    </Link>
  );
};

export default Title;
