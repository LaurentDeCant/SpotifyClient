import React from "react";
import styled from "../../styles/styled";
import { Album, Artist, Playlist } from "../../types";
import { AlbumCovers, ArtistCovers, PlaylistCovers } from "../covers";
import withLoader from "../withLoader";

const Section = styled.section`
  margin-bottom: 50px;
`;

const Header = styled.h2`
  font-size: ${props => props.theme.font.size.extraExtraLarge}
  text-align: center;
  margin-bottom: 25px;
  width: 100%;
`;

function Artists({ artists }: { artists: Artist[] }) {
  return (
    <>
      {artists.length > 0 && (
        <Section>
          <Header>Artists</Header>
          <ArtistCovers artists={artists} />
        </Section>
      )}
    </>
  );
}

function Albums({ albums }: { albums: Album[] }) {
  return (
    <>
      {albums.length > 0 && (
        <Section>
          <Header>Albums & Singles</Header>
          <AlbumCovers albums={albums} />
        </Section>
      )}
    </>
  );
}

function Playlists({ playlists }: { playlists: Playlist[] }) {
  return (
    <>
      {playlists.length > 0 && (
        <Section>
          <Header>Playlists</Header>
          <PlaylistCovers playlists={playlists} />
        </Section>
      )}
    </>
  );
}

interface Props {
  isLoading: boolean;
  artists: Artist[];
  albums: Album[];
  playlists: Playlist[];
}

function Results({ artists, albums, playlists }: Props) {
  return (
    <>
      <Artists artists={artists} />
      <Albums albums={albums} />
      <Playlists playlists={playlists} />
    </>
  );
}

export default withLoader(Results);
