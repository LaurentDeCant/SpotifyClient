import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Album } from "../../types";
import { State } from "../../reducers";
import { selectIsFetching, selectAlbum } from "../../reducers/albums";
import { selectIsLoaded, selectIsPlaying } from "../../reducers/player";
import { getAlbum } from "../../actions/albums";
import { loadAlbum, toggle } from "../../actions/player";
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
  isLoaded: (albumId: string) => boolean;
  isPlaying: (albumId: string) => boolean;
  getAlbum: (albumId: string) => void;
  loadAlbum: (albumId: string) => void;
  toggle: () => void;
}

class AlbumTracks extends Component<Props> {
  albumId = "";

  componentDidMount() {
    const {
      getAlbum,
      match: {
        params: { albumId }
      }
    } = this.props;
    this.albumId = albumId;
    getAlbum(albumId);
  }

  handleToggle = () => {
    const { isLoaded, loadAlbum, toggle } = this.props;
    if (isLoaded(this.albumId)) {
      toggle();
    } else {
      loadAlbum(this.albumId);
    }
  };

  render() {
    const { album, isPlaying } = this.props;

    return album ? (
      <>
        <Cover
          image={album.images[0].url}
          name={album.name}
          artist={joinArtistNames(album.artists)}
          isPlaying={isPlaying(album.id)}
          onToggle={this.handleToggle}
        />
        <Tracks tracks={album.tracks} />
      </>
    ) : (
      <></>
    );
  }
}

const mapState = (state: State, ownProps: Props) => {
  const { match } = ownProps;
  const { albumId } = match.params;

  return {
    isLoading: selectIsFetching(state),
    album: selectAlbum(state, albumId),
    isLoaded: selectIsLoaded(state),
    isPlaying: selectIsPlaying(state)
  };
};

const mapDispatch = {
  getAlbum,
  loadAlbum,
  toggle
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(withLoader(AlbumTracks))
);
