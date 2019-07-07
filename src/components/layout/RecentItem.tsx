import React from "react";
import { Link } from "react-router-dom";
import { capitalize } from "lodash";
import styled from "../../styles/styled";
import { clickable } from "../../styles/effects";
import { Album, Artist, Playlist } from "../../types";
import { getImageSource, getImageShape } from "../../utils";
import { Image, Text } from "../core";

const StyledLink = styled(Link)`
  ${clickable(false)}

  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  padding: ${props => props.theme.thickness.small}px;
  width 100%;
`;

const StyledImage = styled(Image)`
  flex-shrink: 0;
  height: ${props => props.theme.thickness.large}px;
  margin-right: ${props => props.theme.thickness.small}px;
  width: ${props => props.theme.thickness.large}px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Name = styled(Text)`
  color: ${props => props.theme.onBackground.primary};
  margin-bottom: ${props => props.theme.thickness.extraSmall}px;
  text-align: left;
`;

const Type = styled(Text)`
  color: ${props => props.theme.onBackground.secondary};
  text-align: left;
`;

interface Props {
  recent: Album | Artist | Playlist;
}

function RecentItem({ recent }: Props) {
  return (
    <li>
      <StyledLink to={`${process.env.PUBLIC_URL}/${recent.type}/${recent.id}`}>
        <StyledImage
          source={getImageSource(recent)}
          shape={getImageShape(recent)}
        />
        <Container>
          <Name>{recent.name}</Name>
          <Type>{capitalize(recent.type)}</Type>
        </Container>
      </StyledLink>
    </li>
  );
}

export default RecentItem;
