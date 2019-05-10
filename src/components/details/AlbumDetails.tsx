import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { DenormalizedAlbum as Album } from "../../types";
import { getAlbum } from "../../actions/albums";
import { loadToggle } from "../../actions/player";
import { State } from "../../reducers";
import { selectAlbum, selectIsPlayable } from "../../reducers/albums";
import { selectIsPlaying } from "../../reducers/player";
import { joinArtistNames } from "../../utils";
import Header from "./Header";
import Tracks from "./Tracks";
import Wrapper from "./Wrapper";
import withReloader from "../withReloader";

interface Params {
  albumId: string;
}

interface Props extends RouteComponentProps<Params> {
  album?: Album;
  isPlayable: boolean;
  isPlaying: (albumId: string) => boolean;
  getAlbum: (albumId: string) => void;
  loadToggle: (collectionId: string, trackId?: string) => void;
}

function AlbumDetails({
  match,
  album,
  isPlayable,
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
    <Wrapper>
      <Header
        imageSource={album.images[0].url}
        title={album.name}
        subTitle={joinArtistNames(album.artists)}
        canPlay={isPlayable}
        isPlaying={isPlaying(album.id)}
        onToggle={handleToggle}
      />
      <Tracks tracks={album.tracks} onToggle={handleToggle} />
    </Wrapper>
  ) : (
    <></>
  );
}

const mapState = (state: State, ownProps: Props) => {
  const { match } = ownProps;
  const { albumId } = match.params;
  return {
    album: selectAlbum(state, albumId),
    isPlayable: selectIsPlayable(state, albumId),
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
