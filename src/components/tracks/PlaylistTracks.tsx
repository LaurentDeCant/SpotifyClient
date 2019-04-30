import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Playlist } from "../../types";
import { State } from "../../reducers";
import { selectIsFetching, selectPlaylist } from "../../reducers/playlists";
import { selectIsLoaded, selectIsPlaying } from "../../reducers/player";
import { getPlaylist } from "../../actions/playlists";
import { loadPlaylist, toggle } from "../../actions/player";
import Cover from "./Cover";
import Tracks from "./Tracks";
import withLoader from "../withLoader";

interface Params {
  playlistId: string;
}

interface Props extends RouteComponentProps<Params> {
  isLoading: boolean;
  playlist?: Playlist;
  isLoaded: (playlistId: string) => boolean;
  isPlaying: (playlistId: string) => boolean;
  getPlaylist: (playlistId: string) => void;
  loadPlaylist: (playlistId: string) => void;
  toggle: () => void;
}

class PlaylistTracks extends Component<Props> {
  playlistId = "";

  componentDidMount() {
    const {
      getPlaylist,
      match: {
        params: { playlistId }
      }
    } = this.props;
    this.playlistId = playlistId;
    getPlaylist(playlistId);
  }

  handleToggle = () => {
    const { isLoaded, loadPlaylist, toggle } = this.props;
    if (isLoaded(this.playlistId)) {
      toggle();
    } else {
      loadPlaylist(this.playlistId);
    }
  };

  render() {
    const { playlist, isPlaying } = this.props;

    return playlist ? (
      <>
        <Cover
          image={playlist.images[0].url}
          name={playlist.name}
          artist={playlist.owner.display_name}
          isPlaying={isPlaying(playlist.id)}
          onToggle={this.handleToggle}
        />
        <Tracks tracks={playlist.tracks} />
      </>
    ) : (
      <></>
    );
  }
}

const mapState = (state: State, ownProps: Props) => {
  const { match } = ownProps;
  const { playlistId } = match.params;

  return {
    isLoading: selectIsFetching(state),
    playlist: selectPlaylist(state, playlistId),
    isLoaded: selectIsLoaded(state),
    isPlaying: selectIsPlaying(state)
  };
};

const mapDispatch = {
  getPlaylist,
  loadPlaylist,
  toggle
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(withLoader(PlaylistTracks))
);
