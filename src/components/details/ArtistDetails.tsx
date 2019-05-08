import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import {
  getArtist,
  getArtistAlbums,
  getArtistRelatedArtists,
  getArtistTopTracks
} from "../../actions/artists";
import { State } from "../../reducers";
import { Heading } from "../core";
import { Artist } from "../../types";
import { selectArtist } from "../../reducers/artists";

interface Params {
  artistId: string;
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
  getArtist,
  getArtistAlbums,
  getArtistRelatedArtists,
  getArtistTopTracks
}: Props) {
  useEffect(() => {
    const { artistId } = match.params;
    getArtist(artistId);
    getArtistAlbums(artistId);
    getArtistRelatedArtists(artistId);
    getArtistTopTracks(artistId);
  }, []);

  return (
    <>
      <Heading>Top Tracks</Heading>
      <Heading>Albums & Singles</Heading>
      <Heading>Related Artists</Heading>
    </>
  );
}

const mapState = (state: State, ownProps: Props) => {
  const { match } = ownProps;
  const { artistId } = match.params;

  return { artist: selectArtist(state, artistId) };
};

const mapDispatch = {
  getArtist,
  getArtistAlbums,
  getArtistRelatedArtists,
  getArtistTopTracks
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(ArtistDetails)
);
