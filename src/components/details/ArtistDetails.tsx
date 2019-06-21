import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import styled from "../../styles/styled";
import { Album, Artist, Track, Type } from "../../types";
import { getImageSource, getImageShape } from "../../utils";
import { getArtist } from "../../actions/artists";
import { loadPlayPause } from "../../actions/player";
import { toggleFollowArtist } from "../../actions/following";
import { State } from "../../reducers";
import {
  selectArtist,
  selectIsPlayable,
  selectArtistAlbums,
  selectArtistTopTracks,
  selectArtistRelatedArtists
} from "../../reducers/artists";
import { selectIsPlaying } from "../../reducers/player";
import TrackList from "./TrackList";
import AlbumCovers from "../covers/AlbumCovers";
import ArtistCovers from "../covers/ArtistCovers";
import { Heading } from "../core";
import Wrapper from "./Wrapper";
import Header from "./Header";
import withLoader from "../withLoader";

const Section = styled.section`
  margin-bottom: 40px;
`;

function TopTracks({
  tracks,
  onTogglePlay
}: {
  tracks: Track[];
  onTogglePlay: (trackId: string) => void;
}) {
  return (
    <>{tracks && <TrackList tracks={tracks} onTogglePlay={onTogglePlay} />}</>
  );
}

function Albums({ albums }: { albums: Album[] }) {
  return (
    <>
      {albums && !!albums.length && (
        <Section>
          <Heading>Albums & Singles</Heading>
          <AlbumCovers albums={albums} />
        </Section>
      )}
    </>
  );
}

function RelatedArtists({ artists }: { artists: Artist[] }) {
  return (
    <>
      {artists && !!artists.length && (
        <Section>
          <Heading>Related Artists</Heading>
          <ArtistCovers artists={artists} />
        </Section>
      )}
    </>
  );
}

interface Params {
  artistId: string;
}

interface Props extends RouteComponentProps<Params> {
  artist?: Artist;
  albums: Album[];
  relatedArtists: Artist[];
  topTracks: Track[];
  isPlayable: boolean;
  isPlaying: boolean;
  getArtist: (artistId: string) => void;
  loadPlayPause: (
    artistId: string,
    collectionType: Type,
    trackId?: string
  ) => void;
  toggleFollowArtist: (artistId: string) => void;
}

function ArtistDetails({
  match,
  artist,
  albums,
  relatedArtists,
  topTracks,
  isPlayable,
  isPlaying,
  getArtist,
  loadPlayPause,
  toggleFollowArtist
}: Props) {
  const { artistId } = match.params;

  useEffect(() => getArtist(artistId), [getArtist, artistId]);

  const handleTogglePlay = useCallback(
    (trackId?: string) => {
      loadPlayPause(artistId, Type.Artist, trackId);
    },
    [loadPlayPause, artistId]
  );

  const handleToggleFavorite = useCallback(() => {
    toggleFollowArtist(artistId);
  }, [toggleFollowArtist, artistId]);

  return artist ? (
    <>
      <Wrapper>
        <Header
          imageSource={getImageSource(artist)}
          imageShape={getImageShape(artist)}
          title={artist.name}
          canPlay={isPlayable}
          isPlaying={isPlaying}
          isFavorite={artist.isFollowed}
          onTogglePlay={handleTogglePlay}
          onToggleFavorite={handleToggleFavorite}
        />
        <TopTracks tracks={topTracks} onTogglePlay={handleTogglePlay} />
      </Wrapper>
      <Albums albums={albums} />
      <RelatedArtists artists={relatedArtists} />
    </>
  ) : (
    <></>
  );
}

const mapState = (state: State, ownProps: Props) => {
  const { match } = ownProps;
  const { artistId } = match.params;
  return {
    artist: selectArtist(state, artistId),
    albums: selectArtistAlbums(state, artistId),
    relatedArtists: selectArtistRelatedArtists(state, artistId),
    topTracks: selectArtistTopTracks(state, artistId),
    isPlayable: selectIsPlayable(state, artistId),
    isPlaying: selectIsPlaying(state, artistId)
  };
};

const mapDispatch = {
  getArtist,
  loadPlayPause,
  toggleFollowArtist
};

export default withLoader(
  withRouter(
    connect(
      mapState,
      mapDispatch
    )(ArtistDetails)
  )
);
