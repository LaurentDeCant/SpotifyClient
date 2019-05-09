import React from "react";
import styled from "../../styles/styled";
import {
  DenormalizedAlbum as Album,
  DenormalizedArtist as Artist,
  DenormalizedPlaylist as Playlist
} from "../../types";
import { Heading } from "../core";
import { AlbumCovers, ArtistCovers, PlaylistCovers } from "../covers";
import withLoader from "../withLoader";

const Section = styled.section`
  margin-bottom: 50px;
`;

function Artists({ artists }: { artists: Artist[] }) {
  return (
    <>
      {artists.length > 0 && (
        <Section>
          <Heading>Artists</Heading>
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
          <Heading>Albums & Singles</Heading>
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
          <Heading>Playlists</Heading>
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
