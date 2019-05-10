import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { DenormalizedPlaylist as Playlist } from "../../types";
import { getPlaylist } from "../../actions/playlists";
import { loadToggle } from "../../actions/player";
import { State } from "../../reducers";
import { selectPlaylist } from "../../reducers/playlists";
import { selectIsPlaying } from "../../reducers/player";
import { hasPlayableTrack } from "../../utils";
import Header from "./Header";
import Tracks from "./Tracks";
import withReloader from "../withReloader";
import Wrapper from "./Wrapper";

interface Params {
  playlistId: string;
}

interface Props extends RouteComponentProps<Params> {
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
    <Wrapper>
      <Header
        imageSource={playlist.images[0].url}
        title={playlist.name}
        subTitle={playlist.owner.display_name}
        canPlay={hasPlayableTrack(playlist.tracks)}
        isPlaying={isPlaying(playlist.id)}
        onToggle={handleToggle}
      />
      <Tracks tracks={playlist.tracks} onToggle={handleToggle} />
    </Wrapper>
  ) : (
    <></>
  );
}

const mapState = (state: State, ownProps: Props) => {
  const { match } = ownProps;
  const { playlistId } = match.params;
  return {
    playlist: selectPlaylist(state, playlistId),
    isPlaying: selectIsPlaying(state)
  };
};

const mapDispatch = {
  getPlaylist,
  loadToggle
};

export default withReloader(
  withRouter(
    connect(
      mapState,
      mapDispatch
    )(PlaylistDetails)
  )
);
