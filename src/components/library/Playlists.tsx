import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Playlist } from "../../types";
import { getFollowedPlaylists } from "../../actions/following";
import { State } from "../../reducers";
import { selectFollowedPlaylists } from "../../reducers/following";
import PlaylistCovers from "../covers/PlaylistCovers";
import withLoader from "../withLoader";

interface Props {
  playlists: Playlist[];
  getFollowedPlaylists: () => void;
}

function Playlists({ playlists, getFollowedPlaylists }: Props) {
  useEffect(getFollowedPlaylists, []);

  return <PlaylistCovers playlists={playlists} />;
}

const mapState = (state: State) => ({
  playlists: selectFollowedPlaylists(state)
});

const mapDispatch = {
  getFollowedPlaylists
};

export default withLoader(
  connect(
    mapState,
    mapDispatch
  )(Playlists)
);
