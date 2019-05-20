import React from "react";
import { Link } from "react-router-dom";
import styled from "../../styles/styled";
import { Artist } from "../../types";

const List = styled.ul`
  color: ${props => props.theme.foreground.dark};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Item = styled.span`
  color: ${props => props.theme.foreground.dark};
  font-weight: ${props => props.theme.fontWeight.light};
  margin-right: ${props => props.theme.thickness.extraSmall}px;

  :not(:last-child)::after {
    content: ",";
  }
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.foreground.dark};

  :hover {
    text-decoration: underline;
  }
`;

function ArtistList({ artists }: { artists: Artist[] }) {
  return (
    <List>
      {artists.map(artist => (
        <Item key={artist.id}>
          <StyledLink to={`/artist/${artist.id}`}>{artist.name}</StyledLink>
        </Item>
      ))}
    </List>
  );
}

export default ArtistList;
