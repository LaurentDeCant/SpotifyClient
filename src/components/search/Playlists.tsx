import React from "react";
import { connect } from "react-redux";
import { Playlist } from "../../types";
import { selectPlaylist } from "../../actions/search";
import { State } from "../../reducers";
import { selectPlaylists } from "../../selectors/search";
import { Heading } from "../core";
import PlaylistCovers from "../covers/PlaylistCovers";
import Wrapper from "./Wrapper";

interface PlaylistsProps {
  playlists: Playlist[];
  selectPlaylist: (playlistId: string) => void;
}

function Playlists({ playlists, selectPlaylist }: PlaylistsProps) {
  return (
    <>
      {playlists.length > 0 && (
        <Wrapper>
          <Heading>Playlists</Heading>
          <PlaylistCovers playlists={playlists} onSelect={selectPlaylist} />
        </Wrapper>
      )}
    </>
  );
}

const mapState = (state: State) => ({
  playlists: selectPlaylists(state)
});

const mapDispatch = {
  selectPlaylist
};

export default connect(
  mapState,
  mapDispatch
)(Playlists);
