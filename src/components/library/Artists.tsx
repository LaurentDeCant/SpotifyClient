import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Artist } from "../../types";
import { getFollowedArtists } from "../../actions/following";
import { State } from "../../reducers";
import { selectFollowedArtists } from "../../reducers/following";
import ArtistCovers from "../covers/ArtistCovers";
import withLoader from "../withLoader";

interface Props {
  artists: Artist[];
  getFollowedArtists: () => void;
}

function Artists({ artists, getFollowedArtists }: Props) {
  useEffect(getFollowedArtists, []);

  return <ArtistCovers artists={artists} />;
}

const mapState = (state: State) => ({
  artists: selectFollowedArtists(state)
});

const mapDispatch = {
  getFollowedArtists
};

export default withLoader(
  connect(
    mapState,
    mapDispatch
  )(Artists)
);
