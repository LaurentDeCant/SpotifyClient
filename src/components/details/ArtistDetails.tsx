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

interface Params {
  artistId: string;
}

interface Props extends RouteComponentProps<Params> {
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

  return <div />;
}

const mapState = (state: State) => ({});

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
