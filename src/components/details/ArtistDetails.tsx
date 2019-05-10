import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import styled from "../../styles/styled";
import {
  DenormalizedAlbum as Album,
  DenormalizedArtist as Artist,
  DenormalizedTrack as Track
} from "../../types";
import {
  getArtist,
  getArtistAlbums,
  getArtistRelatedArtists,
  getArtistTopTracks
} from "../../actions/artists";
import { State } from "../../reducers";
import { selectArtist } from "../../reducers/artists";
import Tracks from "./Tracks";
import AlbumCovers from "../covers/AlbumCovers";
import ArtistCovers from "../covers/ArtistCovers";
import { Heading } from "../core";
import { ImageShape } from "../core/Image";
import Header from "./Header";
import Wrapper from "./Wrapper";
import withReloader from "../withReloader";

interface Params {
  artistId: string;
}

const Section = styled.section`
  margin-bottom: 40px;
`;

function TopTracks({ tracks }: { tracks: Track[] }) {
  return <>{tracks && <Tracks tracks={tracks} />}</>;
}

function Albums({ albums }: { albums: Album[] }) {
  return (
    <>
      {albums && (
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
      {artists && (
        <Section>
          <Heading>Related Artists</Heading>
          <ArtistCovers artists={artists} />
        </Section>
      )}
    </>
  );
}

interface Props extends RouteComponentProps<Params> {
  artist?: Artist;
  getArtist: (artistId: string) => void;
  getArtistAlbums: (artistId: string) => void;
  getArtistRelatedArtists: (artistId: string) => void;
  getArtistTopTracks: (artistId: string) => void;
}

function ArtistDetails({
  match,
  artist,
  getArtist,
  getArtistAlbums,
  getArtistRelatedArtists,
  getArtistTopTracks
}: Props) {
  const [prevArtistId, setPrevArtistId] = useState();

  useEffect(() => {
    const { artistId } = match.params;
    if (artistId !== prevArtistId) {
      getArtist(artistId);
      getArtistAlbums(artistId);
      getArtistRelatedArtists(artistId);
      getArtistTopTracks(artistId);
      setPrevArtistId(artistId);
    }
  });

  return artist ? (
    <>
      <Wrapper>
        <Header
          imageSource={artist.images[0].url}
          imageShape={ImageShape.Round}
          title={artist.name}
          canPlay={true}
          isPlaying={false}
          onToggle={() => null}
        />
        <TopTracks tracks={artist.topTracks} />
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
    artist: selectArtist(state, artistId)
  };
};

const mapDispatch = {
  getArtist,
  getArtistAlbums,
  getArtistRelatedArtists,
  getArtistTopTracks
};

export default withReloader(
  withRouter(
    connect(
      mapState,
      mapDispatch
    )(ArtistDetails)
  )
);
