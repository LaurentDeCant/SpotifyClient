import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Artist } from "../../types";
import { getUserArtists } from "../../actions/following";
import { State } from "../../reducers";
import { selectUserArtists } from "../../reducers/following";
import ArtistCovers from "../covers/ArtistCovers";

interface Props {
  artists: Artist[];
  getUserArtists: () => void;
}

function Artists({ artists, getUserArtists }: Props) {
  useEffect(getUserArtists, []);

  return <ArtistCovers artists={artists} />;
}

const mapState = (state: State) => ({
  artists: selectUserArtists(state)
});

const mapDispatch = {
  getUserArtists
};

export default connect(
  mapState,
  mapDispatch
)(Artists);
