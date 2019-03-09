import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Track } from "../types";
import { State } from "../reducers";
import { selectAlbumTracks, selectIsFetching } from "../reducers/albums";
import { getAlbumTracks } from "../actions/albums";
import Tracks from "./Tracks";
import withLoader from "./withLoader";

interface Params {
  albumId: string;
}

interface Props extends RouteComponentProps<Params> {
  isLoading: boolean;
  tracks: Track[];
  getTracks: (albumId: string) => void;
}

class AlbumTracks extends Component<Props> {
  componentDidMount() {
    const { getTracks, match } = this.props;
    getTracks(match.params.albumId);
  }

  render() {
    const { tracks } = this.props;

    return <Tracks tracks={tracks} />;
  }
}

const mapState = (state: State) => ({
  isLoading: selectIsFetching(state),
  tracks: selectAlbumTracks(state)
});

const mapDispatch = {
  getTracks: (albumId: string) => getAlbumTracks(albumId)
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(withLoader(AlbumTracks))
);
