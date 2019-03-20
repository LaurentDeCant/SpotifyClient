import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Album, Track } from "../../types";
import { State } from "../../reducers";
import { selectIsFetching, selectAlbum } from "../../reducers/albums";
import { getAlbum } from "../../actions/albums";
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
  getAlbum: (albumId: string) => void;
}

class AlbumTracks extends Component<Props> {
  componentDidMount() {
    const {
      getAlbum,
      match: {
        params: { albumId }
      }
    } = this.props;
    getAlbum(albumId);
  }

  render() {
    const { album } = this.props;

    return album ? (
      <>
        <Cover
          image={album.images[0].url}
          name={album.name}
          artist={joinArtistNames(album.artists)}
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
    album: selectAlbum(state, albumId)
  };
};

const mapDispatch = {
  getAlbum: (albumId: string) => getAlbum(albumId)
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(withLoader(AlbumTracks))
);
