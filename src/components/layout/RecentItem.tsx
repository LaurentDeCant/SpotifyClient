import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { capitalize } from "lodash";
import styled from "../../styles/styled";
import { Album, Artist, Playlist } from "../../types";
import { getImageSource, getImageShape } from "../../utils";
import { Text, Image } from "../core";
import ButtonBase from "../core/ButtonBase";

const StyledButton = styled(ButtonBase)`
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: ${props => props.theme.thickness.small}px;
  width 100%;
`;

const StyledImage = styled(Image)`
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
  margin-bottom: ${props => props.theme.thickness.extraSmall}px;
  text-align: left;
`;

const Type = styled(Text)`
  color: ${props => props.theme.foreground.lightFade};
  text-align: left;
`;

interface Props extends RouteComponentProps {
  recent: Album | Artist | Playlist;
}

function RecentItem({ history, recent }: Props) {
  function handleClick() {
    history.push(`${process.env.PUBLIC_URL}/${recent.type}/${recent.id}`);
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        <StyledImage
          source={getImageSource(recent)}
          shape={getImageShape(recent)}
        />
        <Container>
          <Name>{recent.name}</Name>
          <Type>{capitalize(recent.type)}</Type>
        </Container>
      </StyledButton>
    </li>
  );
}

export default withRouter(RecentItem);
