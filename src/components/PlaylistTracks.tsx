import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Track } from "../types";
import { State } from "../reducers";
import { selectPlaylistTracks } from "../reducers/playlists";
import { getPlaylistTracks } from "../actions/playlists";
import Tracks from "./Tracks";

interface Params {
  playlistId: string;
}

interface Props extends RouteComponentProps<Params> {
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
    console.log(tracks);

    return <Tracks tracks={tracks} />;
  }
}

const mapState = (state: State) => ({
  tracks: selectPlaylistTracks(state)
});

const mapDispatch = {
  getTracks: (playlistId: string) => getPlaylistTracks(playlistId)
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(PlaylistTracks)
);
