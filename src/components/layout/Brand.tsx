import React from "react";
import { Link } from "react-router-dom";
import styled from "../../styles/styled";
import { Icon, IconType, Text } from "../core";

const StyledLink = styled(Link)`
  align-items: center;
  display: flex;
  height: 100%;
`;

const StyledIcon = styled(Icon)`
  color: ${props => props.theme.onPrimary.primary};
  margin-right: ${props => props.theme.thickness.small}px;
`;

const StyledText = styled(Text)`
  color: ${props => props.theme.onPrimary.primary};
  font-size: ${props => props.theme.fontSize.extraLarge}px;
  font-weight: ${props => props.theme.fontWeight.bold};
`;

const Brand = () => {
  return (
    <StyledLink to={`${process.env.PUBLIC_URL}/browse`}>
      <StyledIcon type={IconType.Wifi} />
      <StyledText>Spotify</StyledText>
    </StyledLink>
  );
};

export default Brand;
