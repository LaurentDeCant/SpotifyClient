import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Playlist } from "../../types";
import { getFeaturedPlaylists } from "../../actions/browse";
import { State } from "../../reducers";
import { selectFeaturedPlaylists } from "../../reducers/browse";
import PlaylistCovers from "../covers/PlaylistCovers";
import withReloader from "../withReloader";

interface Props {
  playlists: Playlist[];
  getPlaylists: () => void;
}

function FeaturedPlaylists({ playlists, getPlaylists }: Props) {
  useEffect(getPlaylists, []);

  return <PlaylistCovers playlists={playlists} />;
}

const mapState = (state: State) => ({
  playlists: selectFeaturedPlaylists(state)
});

const mapDispatch = {
  getPlaylists: getFeaturedPlaylists
};

export default connect(
  mapState,
  mapDispatch
)(withReloader(FeaturedPlaylists));
