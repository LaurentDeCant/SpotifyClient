import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Playlist } from "../../types";
import { getPlaylist } from "../../actions/playlists";
import { loadToggle } from "../../actions/player";
import { State } from "../../reducers";
import { selectIsFetching, selectPlaylist } from "../../reducers/playlists";
import { selectIsPlaying } from "../../reducers/player";
import { hasPlayableTrack } from "../../utils";
import Summary from "./Summary";
import Tracks from "./Tracks";
import withReloader from "../withReloader";

interface Params {
  playlistId: string;
}

interface Props extends RouteComponentProps<Params> {
  isLoading: boolean;
  playlist?: Playlist;
  isPlaying: (playlistId: string) => boolean;
  getPlaylist: (playlistId: string) => void;
  loadToggle: (collectionId: string, trackId?: string) => void;
}

function PlaylistDetails({
  match,
  playlist,
  isPlaying,
  getPlaylist,
  loadToggle
}: Props) {
  const { playlistId } = match.params;

  useEffect(() => {
    getPlaylist(playlistId);
  }, []);

  function handleToggle(trackId?: string) {
    loadToggle(playlistId, trackId);
  }

  return playlist ? (
    <>
      <Summary
        image={playlist.images[0].url}
        title={playlist.name}
        subTitle={playlist.owner.display_name}
        canPlay={hasPlayableTrack(playlist.tracks)}
        isPlaying={isPlaying(playlist.id)}
        onToggle={handleToggle}
      />
      <Tracks tracks={playlist.tracks} onToggle={handleToggle} />
    </>
  ) : (
    <></>
  );
}

const mapState = (state: State, ownProps: Props) => {
  const { match } = ownProps;
  const { playlistId } = match.params;

  return {
    isLoading: selectIsFetching(state),
    playlist: selectPlaylist(state, playlistId),
    isPlaying: selectIsPlaying(state)
  };
};

const mapDispatch = {
  getPlaylist,
  loadToggle
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(withReloader(PlaylistDetails))
);
