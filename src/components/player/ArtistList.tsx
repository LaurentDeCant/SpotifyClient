import React from "react";
import { Link } from "react-router-dom";
import styled from "../../styles/styled";
import { Artist } from "../../types";

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  color: ${props => props.theme.foreground.dark};
  font-weight: ${props => props.theme.fontWeight.light};
  margin-right: 6.25px;

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
        <Item>
          <StyledLink to={`/artist/${artist.id}`}>{artist.name}</StyledLink>
        </Item>
      ))}
    </List>
  );
}

export default ArtistList;
