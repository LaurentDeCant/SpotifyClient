import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Playlist } from "../../types";
import { State } from "../../reducers";
import { selectIsFetching, selectPlaylist } from "../../reducers/playlists";
import { getPlaylist } from "../../actions/playlists";
import { loadPlaylist } from "../../actions/player";
import Cover from "./Cover";
import Tracks from "./Tracks";
import withLoader from "../withLoader";

interface Params {
  playlistId: string;
}

interface Props extends RouteComponentProps<Params> {
  isLoading: boolean;
  playlist?: Playlist;
  getPlaylist: (playlistId: string) => void;
  loadPlaylist: (playlistId: string) => void;
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
    const { loadPlaylist } = this.props;
    loadPlaylist(this.playlistId);
  };

  render() {
    const { playlist } = this.props;

    return playlist ? (
      <>
        <Cover
          image={playlist.images[0].url}
          name={playlist.name}
          artist={playlist.owner.display_name}
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
    playlist: selectPlaylist(state, playlistId)
  };
};

const mapDispatch = {
  getPlaylist,
  loadPlaylist
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(withLoader(PlaylistTracks))
);
