import React from "react";
import { Link } from "react-router-dom";
import styled from "../../styles/styled";
import { Album } from "../../types";

const StyledLink = styled(Link)`
  color: ${props => props.theme.foreground.lightFade};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  :hover {
    text-decoration: underline;
  }
`;

interface Props {
  album: Album;
}

function AlbumName({ album }: Props) {
  return (
    <StyledLink to={`${process.env.PUBLIC_URL}/album/${album.id}`}>
      {album.name}
    </StyledLink>
  );
}

export default AlbumName;
