import React from "react";
import { Link } from "react-router-dom";
import styled from "../../styles/styled";
import { Icon, IconType } from "../core";

const StyledHeader = styled.h1`
  display: flex;
  align-items: center;
  font-size: ${props => props.theme.fontSize.large};
  font-weight: ${props => props.theme.fontWeight.bold};
`;

const StyledIcon = styled(Icon)`
  margin-right: 12.5px;
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
