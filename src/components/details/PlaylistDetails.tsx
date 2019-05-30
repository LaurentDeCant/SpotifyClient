import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Playlist, Track, Type } from "../../types";
import { getImageSource } from "../../utils";
import { getPlaylist } from "../../actions/playlists";
import { loadPlayPause } from "../../actions/player";
import { State } from "../../reducers";
import {
  selectPlaylist,
  selectPlaylistTracks,
  selectIsPlayable
} from "../../reducers/playlists";
import { selectIsPlaying } from "../../reducers/player";
import Header from "./Header";
import TrackList from "./TrackList";
import withLoader from "../withLoader";
import Wrapper from "./Wrapper";

interface Params {
  playlistId: string;
}

interface Props extends RouteComponentProps<Params> {
  playlist?: Playlist;
  tracks: Track[];
  isPlayable: boolean;
  isPlaying: boolean;
  getPlaylist: (playlistId: string) => void;
  loadPlayPause: (
    collectionId: string,
    collectionType: Type,
    trackId?: string
  ) => void;
}

function PlaylistDetails({
  match,
  playlist,
  tracks,
  isPlayable,
  isPlaying,
  getPlaylist,
  loadPlayPause
}: Props) {
  const { playlistId } = match.params;

  const effect = () => {
    getPlaylist(playlistId);
  };
  useEffect(effect, []);

  function handleToggle(trackId?: string) {
    loadPlayPause(playlistId, Type.Playlist, trackId);
  }

  return playlist ? (
    <Wrapper>
      <Header
        imageSource={getImageSource(playlist)}
        title={playlist.name}
        subTitle={playlist.owner.display_name}
        canPlay={isPlayable}
        isPlaying={isPlaying}
        onToggle={handleToggle}
      />
      <TrackList tracks={tracks} onToggle={handleToggle} />
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
    tracks: selectPlaylistTracks(state, playlistId),
    isPlayable: selectIsPlayable(state, playlistId),
    isPlaying: selectIsPlaying(state, playlistId)
  };
};

const mapDispatch = {
  getPlaylist,
  loadPlayPause
};

export default withLoader(
  withRouter(
    connect(
      mapState,
      mapDispatch
    )(PlaylistDetails)
  )
);
