import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import styled from "../../styles/styled";
import {
  DenormalizedAlbum as Album,
  DenormalizedArtist as Artist,
  DenormalizedTrack as Track
} from "../../types";
import { getImageUrl } from "../../utils";
import { getFullArtist } from "../../actions/artists";
import { loadToggle } from "../../actions/player";
import { State } from "../../reducers";
import { selectArtist, selectIsPlayable } from "../../reducers/artists";
import { selectIsPlaying } from "../../reducers/player";
import Tracks from "./Tracks";
import AlbumCovers from "../covers/AlbumCovers";
import ArtistCovers from "../covers/ArtistCovers";
import { Heading } from "../core";
import { ImageShape } from "../core/Image";
import Header from "./Header";
import Wrapper from "./Wrapper";
import withReloader from "../withReloader";

const Section = styled.section`
  margin-bottom: 40px;
`;

function TopTracks({
  tracks,
  onToggle
}: {
  tracks: Track[];
  onToggle: (trackId: string) => void;
}) {
  return <>{tracks && <Tracks tracks={tracks} onToggle={onToggle} />}</>;
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
  isPlayable: boolean;
  isPlaying: (artistId: string) => boolean;
  getFullArtist: (artistId: string) => void;
  loadToggle: (artistId: string, trackId?: string) => void;
}

function ArtistDetails({
  match,
  artist,
  isPlayable,
  isPlaying,
  getFullArtist,
  loadToggle
}: Props) {
  const { artistId } = match.params;
  const [prevArtistId, setPrevArtistId] = useState();

  useEffect(() => {
    if (artistId !== prevArtistId) {
      getFullArtist(artistId);
      setPrevArtistId(artistId);
    }
  });

  function handleToggle(trackId?: string) {
    loadToggle(artistId, trackId);
  }

  return artist ? (
    <>
      <Wrapper>
        <Header
          imageSource={getImageUrl(artist)}
          imageShape={ImageShape.Round}
          title={artist.name}
          canPlay={isPlayable}
          isPlaying={isPlaying(artist.id)}
          onToggle={handleToggle}
        />
        <TopTracks tracks={artist.topTracks} onToggle={handleToggle} />
      </Wrapper>
      <Albums albums={artist.albums} />
      <RelatedArtists artists={artist.relatedArtists} />
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
    isPlayable: selectIsPlayable(state, artistId),
    isPlaying: selectIsPlaying(state)
  };
};

const mapDispatch = {
  getFullArtist,
  loadToggle
};

export default withReloader(
  withRouter(
    connect(
      mapState,
      mapDispatch
    )(ArtistDetails)
  )
);
