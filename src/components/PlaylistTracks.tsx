import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Track } from "../types";
import { State } from "../reducers";
import { selectPlaylistTracks, selectIsFetching } from "../reducers/playlists";
import { getPlaylistTracks } from "../actions/playlists";
import Tracks from "./Tracks";
import withLoader from "./withLoader";

interface Params {
  playlistId: string;
}

interface Props extends RouteComponentProps<Params> {
  isLoading: boolean;
  tracks: Track[];
  getTracks: (playlistId: string) => void;
}

class PlaylistTracks extends Component<Props> {
  componentDidMount() {
    const { match } = this.props;
    this.props.getTracks(match.params.playlistId);
  }

  render() {
    const { tracks } = this.props;

    return <Tracks tracks={tracks} />;
  }
}

const mapState = (state: State) => ({
  isLoading: selectIsFetching(state),
  tracks: selectPlaylistTracks(state)
});

const mapDispatch = {
  getTracks: (playlistId: string) => getPlaylistTracks(playlistId)
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(withLoader(PlaylistTracks))
);
