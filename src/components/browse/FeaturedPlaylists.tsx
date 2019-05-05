import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Playlist } from "../../types";
import { State } from "../../reducers";
import {
  selectIsFetching,
  selectFeaturedPlaylists
} from "../../reducers/browse";
import { getFeaturedPlaylists } from "../../actions/browse";
import { PlaylistCovers } from "../covers";
import withReloader from "../withReloader";

interface Props {
  isLoading: boolean;
  playlists: Playlist[];
  getPlaylists: () => void;
}

function FeaturedPlaylists({ playlists, getPlaylists }: Props) {
  useEffect(getPlaylists, []);

  return <PlaylistCovers playlists={playlists} />;
}

const mapState = (state: State) => ({
  isLoading: selectIsFetching(state),
  playlists: selectFeaturedPlaylists(state)
});

const mapDispatch = {
  getPlaylists: getFeaturedPlaylists
};

export default connect(
  mapState,
  mapDispatch
)(withReloader(FeaturedPlaylists));
