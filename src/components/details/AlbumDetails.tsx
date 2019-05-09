import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { DenormalizedAlbum as Album } from "../../types";
import { getAlbum } from "../../actions/albums";
import { loadToggle } from "../../actions/player";
import { State } from "../../reducers";
import { selectAlbum } from "../../reducers/albums";
import { selectIsPlaying } from "../../reducers/player";
import { joinArtistNames, hasPlayableTrack } from "../../utils";
import Header from "./Header";
import Tracks from "./Tracks";
import withReloader from "../withReloader";

interface Params {
  albumId: string;
}

interface Props extends RouteComponentProps<Params> {
  album?: Album;
  isPlaying: (albumId: string) => boolean;
  getAlbum: (albumId: string) => void;
  loadToggle: (collectionId: string, trackId?: string) => void;
}

function AlbumDetails({
  match,
  album,
  isPlaying,
  getAlbum,
  loadToggle
}: Props) {
  const { albumId } = match.params;

  useEffect(() => {
    getAlbum(albumId);
  }, []);

  function handleToggle(trackId?: string) {
    loadToggle(albumId, trackId);
  }

  return album ? (
    <>
      <Header
        imageSource={album.images[0].url}
        title={album.name}
        subTitle={joinArtistNames(album.artists)}
        canPlay={hasPlayableTrack(album.tracks)}
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
    album: selectAlbum(state, albumId),
    isPlaying: selectIsPlaying(state)
  };
};

const mapDispatch = {
  getAlbum,
  loadToggle
};

export default withReloader(
  withRouter(
    connect(
      mapState,
      mapDispatch
    )(AlbumDetails)
  )
);
