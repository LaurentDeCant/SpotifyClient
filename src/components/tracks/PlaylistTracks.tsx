import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Playlist, Track } from "../../types";
import { State } from "../../reducers";
import { selectIsFetching, selectPlaylist } from "../../reducers/playlists";
import { getPlaylist } from "../../actions/playlists";
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
}

class PlaylistTracks extends Component<Props> {
  componentDidMount() {
    const {
      getPlaylist,
      match: {
        params: { playlistId }
      }
    } = this.props;
    getPlaylist(playlistId);
  }

  handleToggle = () => {};

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
  getPlaylist: (playlistId: string) => getPlaylist(playlistId)
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(withLoader(PlaylistTracks))
);
