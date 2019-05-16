import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Album, Artist, Track } from "../../types";
import { getAlbum } from "../../actions/albums";
import { loadToggle } from "../../actions/player";
import { State } from "../../reducers";
import {
  selectAlbum,
  selectAlbumArtists,
  selectAlbumTracks,
  selectIsPlayable
} from "../../reducers/albums";
import { selectIsPlaying } from "../../reducers/player";
import { getArtistNames, getImageSource } from "../../utils";
import Collection from "./Wrapper";
import Header from "./Header";
import TrackList from "./TrackList";
import withLoader from "../withLoader";

interface Params {
  albumId: string;
}

interface Props extends RouteComponentProps<Params> {
  album?: Album;
  artists: Artist[];
  tracks: Track[];
  isPlayable: boolean;
  isPlaying: boolean;
  getAlbum: (albumId: string) => void;
  loadToggle: (collectionId: string, trackId?: string) => void;
}

function AlbumDetails({
  match,
  album,
  artists,
  tracks,
  isPlayable,
  isPlaying,
  getAlbum,
  loadToggle
}: Props) {
  const { albumId } = match.params;

  const effect = () => {
    getAlbum(albumId);
  };
  useEffect(effect, []);

  function handleToggle(trackId?: string) {
    loadToggle(albumId, trackId);
  }

  return album ? (
    <Collection>
      <Header
        imageSource={getImageSource(album)}
        title={album.name}
        subTitle={getArtistNames(artists)}
        canPlay={isPlayable}
        isPlaying={isPlaying}
        onToggle={handleToggle}
      />
      <TrackList tracks={tracks} onToggle={handleToggle} />
    </Collection>
  ) : (
    <></>
  );
}

const mapState = (state: State, ownProps: Props) => {
  const { match } = ownProps;
  const { albumId } = match.params;
  return {
    album: selectAlbum(state, albumId),
    artists: selectAlbumArtists(state)(albumId),
    tracks: selectAlbumTracks(state, albumId),
    isPlayable: selectIsPlayable(state, albumId),
    isPlaying: selectIsPlaying(state, albumId)
  };
};

const mapDispatch = {
  getAlbum,
  loadToggle
};

export default withLoader(
  withRouter(
    connect(
      mapState,
      mapDispatch
    )(AlbumDetails)
  )
);
