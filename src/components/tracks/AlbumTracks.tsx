import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Album, Track } from "../../types";
import { State } from "../../reducers";
import {
  selectIsFetching,
  selectAlbum,
  selectAlbumTracks
} from "../../reducers/albums";
import { getAlbum, getAlbumTracks } from "../../actions/albums";
import { joinArtistNames } from "../../helpers/utils";
import Cover from "./Cover";
import Tracks from "./Tracks";
import withLoader from "../withLoader";

interface Params {
  albumId: string;
}

interface Props extends RouteComponentProps<Params> {
  isLoading: boolean;
  album?: Album;
  tracks: Track[];
  getAlbum: (albumId: string) => void;
  getTracks: (albumId: string) => void;
}

class AlbumTracks extends Component<Props> {
  componentDidMount() {
    const { getAlbum, getTracks, match } = this.props;
    const { albumId } = match.params;
    getAlbum(albumId);
    getTracks(albumId);
  }

  render() {
    const { album, tracks } = this.props;

    return (
      <div>
        {album && (
          <Cover
            image={album.images[0].url}
            name={album.name}
            artist={joinArtistNames(album.artists)}
          />
        )}
        <Tracks tracks={tracks} />
      </div>
    );
  }
}

const mapState = (state: State) => ({
  isLoading: selectIsFetching(state),
  album: selectAlbum(state),
  tracks: selectAlbumTracks(state)
});

const mapDispatch = {
  getAlbum: (albumId: string) => getAlbum(albumId),
  getTracks: (albumId: string) => getAlbumTracks(albumId)
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(withLoader(AlbumTracks))
);
