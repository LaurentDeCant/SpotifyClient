import React from "react";
import { Link } from "react-router-dom";
import styled from "../../styles/styled";
import { Icon, IconType, Text } from "../core";

const StyledLink = styled(Link)`
  align-items: center;
  display: flex;
  height: 100%;
`;

const StyledText = styled(Text)`
  font-size: ${props => props.theme.fontSize.large};
  font-weight: ${props => props.theme.fontWeight.bold};
`;

const StyledIcon = styled(Icon)`
  margin-right: ${props => props.theme.thickness.small}px;
`;

const Title = () => {
  return (
    <StyledLink to={`${process.env.PUBLIC_URL}/browse`}>
      <StyledIcon type={IconType.Wifi} />
      <StyledText>Spotify</StyledText>
    </StyledLink>
  );
};

export default Title;
