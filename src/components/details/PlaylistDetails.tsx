import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Playlist, Track, Type } from "../../types";
import { getImageSource } from "../../utils";
import { getPlaylist } from "../../actions/playlists";
import { loadPlayPause } from "../../actions/player";
import { toggleFollowPlaylist } from "../../actions/following";
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
  toggleFollowPlaylist: (playlistId: string) => void;
}

function PlaylistDetails({
  match,
  playlist,
  tracks,
  isPlayable,
  isPlaying,
  getPlaylist,
  loadPlayPause,
  toggleFollowPlaylist
}: Props) {
  const { playlistId } = match.params;

  useEffect(() => getPlaylist(playlistId), [getPlaylist, playlistId]);

  const handleTogglePlay = useCallback(
    (trackId?: string) => {
      loadPlayPause(playlistId, Type.Playlist, trackId);
    },
    [loadPlayPause, playlistId]
  );

  const handleToggleFavorite = useCallback(() => {
    toggleFollowPlaylist(playlistId);
  }, [toggleFollowPlaylist, playlistId]);

  return playlist ? (
    <Wrapper>
      <Header
        imageSource={getImageSource(playlist)}
        title={playlist.name}
        subTitle={playlist.owner.display_name}
        canPlay={isPlayable}
        isPlaying={isPlaying}
        isFavorite={playlist.isFollowed}
        onTogglePlay={handleTogglePlay}
        onToggleFavorite={handleToggleFavorite}
      />
      <TrackList tracks={tracks} onTogglePlay={handleTogglePlay} />
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
  loadPlayPause,
  toggleFollowPlaylist
};

export default withLoader(
  withRouter(
    connect(
      mapState,
      mapDispatch
    )(PlaylistDetails)
  )
);
