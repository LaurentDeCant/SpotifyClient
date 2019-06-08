import React from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { Album, Artist, Playlist } from "../../types";
import {
  selectAlbum,
  selectArtist,
  selectPlaylist
} from "../../actions/search";
import { State } from "../../reducers";
import {
  selectAlbums,
  selectArtists,
  selectPlaylists
} from "../../reducers/search";
import { Heading } from "../core";
import AlbumCovers from "../covers/AlbumCovers";
import ArtistCovers from "../covers/ArtistCovers";
import PlaylistCovers from "../covers/PlaylistCovers";
import Empty from "../layout/Empty";
import withLoader from "../withLoader";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  margin-bottom: ${props => props.theme.thickness.large}px;

  &:last-child {
    margin-bottom: 0;
  }
`;

interface ArtistsProps {
  artists: Artist[];
  selectArtist: (artistId: string) => void;
}

function Artists({ artists, selectArtist }: ArtistsProps) {
  return (
    <>
      {artists.length > 0 && (
        <Section>
          <Heading>Artists</Heading>
          <ArtistCovers artists={artists} onSelect={selectArtist} />
        </Section>
      )}
    </>
  );
}

interface AlbumsProps {
  albums: Album[];
  selectAlbum: (albumId: string) => void;
}

function Albums({ albums, selectAlbum }: AlbumsProps) {
  return (
    <>
      {albums.length > 0 && (
        <Section>
          <Heading>Albums & Singles</Heading>
          <AlbumCovers albums={albums} onSelect={selectAlbum} />
        </Section>
      )}
    </>
  );
}

interface PlaylistsProps {
  playlists: Playlist[];
  selectPlaylist: (playlistId: string) => void;
}

function Playlists({ playlists, selectPlaylist }: PlaylistsProps) {
  return (
    <>
      {playlists.length > 0 && (
        <Section>
          <Heading>Playlists</Heading>
          <PlaylistCovers playlists={playlists} onSelect={selectPlaylist} />
        </Section>
      )}
    </>
  );
}

interface Props {
  albums: Album[];
  artists: Artist[];
  playlists: Playlist[];
  selectAlbum: (albumId: string) => void;
  selectArtist: (artistId: string) => void;
  selectPlaylist: (playlistId: string) => void;
}

function Results({
  albums,
  artists,
  playlists,
  selectAlbum,
  selectArtist,
  selectPlaylist
}: Props) {
  return artists.length || albums.length || playlists.length ? (
    <Wrapper>
      <Artists artists={artists} selectArtist={selectArtist} />
      <Albums albums={albums} selectAlbum={selectAlbum} />
      <Playlists playlists={playlists} selectPlaylist={selectPlaylist} />
    </Wrapper>
  ) : (
    <Empty>No Results found</Empty>
  );
}

const mapState = (state: State) => ({
  albums: selectAlbums(state),
  artists: selectArtists(state),
  playlists: selectPlaylists(state)
});

const mapDispatch = {
  selectAlbum,
  selectArtist,
  selectPlaylist
};

export default withLoader(
  connect(
    mapState,
    mapDispatch
  )(Results)
);
