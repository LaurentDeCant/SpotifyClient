import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Album } from "../../types";
import { getAlbum } from "../../actions/albums";
import { toggle } from "../../actions/player";
import { State } from "../../reducers";
import { selectIsFetching, selectAlbum } from "../../reducers/albums";
import { selectIsPlaying } from "../../reducers/player";
import { joinArtistNames } from "../../utils/artist";
import Summary from "./Summary";
import Tracks from "./Tracks";
import withReloader from "../withReloader";

interface Params {
  albumId: string;
}

interface Props extends RouteComponentProps<Params> {
  isLoading: boolean;
  album?: Album;
  isPlaying: (albumId: string) => boolean;
  getAlbum: (albumId: string) => void;
  toggle: (collectionId: string, trackId?: string) => void;
}

function AlbumDetails({
  match: {
    params: { albumId }
  },
  album,
  isPlaying,
  getAlbum,
  toggle
}: Props) {
  useEffect(() => {
    getAlbum(albumId);
  }, []);

  function handleToggle(trackId?: string) {
    toggle(albumId, trackId);
  }

  return album ? (
    <>
      <Summary
        image={album.images[0].url}
        title={album.name}
        subTitle={joinArtistNames(album.artists)}
        isPlaying={isPlaying(album.id)}
        onToggle={handleToggle}
      />
      <Tracks tracks={album.tracks} onToggle={handleToggle} />
    </>
  ) : (
    <></>
  );
}

const mapState = (state: State, ownProps: Props) => {
  const { match } = ownProps;
  const { albumId } = match.params;

  return {
    isLoading: selectIsFetching(state),
    album: selectAlbum(state, albumId),
    isPlaying: selectIsPlaying(state)
  };
};

const mapDispatch = {
  getAlbum,
  toggle
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(withReloader(AlbumDetails))
);
