import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Artist } from "../../types";
import { getFollowedArtists } from "../../actions/following";
import { State } from "../../reducers";
import { selectFollowedArtists } from "../../reducers/following";
import ArtistCovers from "../covers/ArtistCovers";
import Empty from "../layout/Empty";
import withLoader from "../withLoader";

interface Props {
  artists: Artist[];
  getFollowedArtists: () => void;
}

function FollowedArtists({ artists, getFollowedArtists }: Props) {
  useEffect(getFollowedArtists, []);

  return artists.length ? (
    <ArtistCovers artists={artists} />
  ) : (
    <Empty>No followed artists</Empty>
  );
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
  )(FollowedArtists)
);
