import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Playlist, Track } from "../../types";
import { State } from "../../reducers";
import {
  selectIsFetching,
  selectPlaylistTracks,
  selectPlaylist
} from "../../reducers/playlists";
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
  tracks: Track[];
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

  render() {
    const { playlist, tracks } = this.props;

    return (
      <div>
        {playlist && (
          <Cover
            image={playlist.images[0].url}
            name={playlist.name}
            artist={playlist.owner.display_name}
          />
        )}
        <Tracks tracks={tracks} />
      </div>
    );
  }
}

const mapState = (state: State) => ({
  isLoading: selectIsFetching(state),
  playlist: selectPlaylist(state),
  tracks: selectPlaylistTracks(state)
});

const mapDispatch = {
  getPlaylist: (playlistId: string) => getPlaylist(playlistId)
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(withLoader(PlaylistTracks))
);
