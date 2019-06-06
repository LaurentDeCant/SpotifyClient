import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Playlist } from "../../types";
import { getUserPlaylists } from "../../actions/following";
import { State } from "../../reducers";
import { selectUserPlaylists } from "../../reducers/following";
import PlaylistCovers from "../covers/PlaylistCovers";

interface Props {
  playlists: Playlist[];
  getUserPlaylists: () => void;
}

function Playlists({ playlists, getUserPlaylists }: Props) {
  useEffect(getUserPlaylists, []);

  return <PlaylistCovers playlists={playlists} />;
}

const mapState = (state: State) => ({
  playlists: selectUserPlaylists(state)
});

const mapDispatch = {
  getUserPlaylists
};

export default connect(
  mapState,
  mapDispatch
)(Playlists);
