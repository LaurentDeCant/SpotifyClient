import React from "react";
import { Link } from "react-router-dom";
import styled from "../../styles/styled";
import { Artist } from "../../types";

const List = styled.ul`
  color: ${props => props.theme.foreground.lightFade};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Item = styled.span`
  color: ${props => props.theme.foreground.lightFade};
  font-weight: ${props => props.theme.fontWeight.light};

  :not(:last-child)::after {
    content: ",";
    margin-right: ${props => props.theme.thickness.extraSmall}px;
  }
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.foreground.lightFade};

  :hover {
    text-decoration: underline;
  }
`;

function ArtistNames({ artists }: { artists: Artist[] }) {
  return (
    <List>
      {artists.map(artist => (
        <Item key={artist.id}>
          <StyledLink to={`${process.env.PUBLIC_URL}/artist/${artist.id}`}>
            {artist.name}
          </StyledLink>
        </Item>
      ))}
    </List>
  );
}

export default ArtistNames;
