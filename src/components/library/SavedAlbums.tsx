import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Album } from "../../types";
import { getSavedAlbums } from "../../actions/library";
import { State } from "../../reducers";
import { selectSavedAlbums } from "../../reducers/library";
import AlbumCovers from "../covers/AlbumCovers";
import Empty from "../layout/Empty";
import withLoader from "../withLoader";

interface Props {
  albums: Album[];
  getSavedAlbums: () => void;
}

function SavedAlbums({ albums, getSavedAlbums }: Props) {
  useEffect(getSavedAlbums, []);

  return albums.length ? (
    <AlbumCovers albums={albums} />
  ) : (
    <Empty>No saved albums</Empty>
  );
}

const mapState = (state: State) => ({
  albums: selectSavedAlbums(state)
});

const mapDispatch = {
  getSavedAlbums
};

export default withLoader(
  connect(
    mapState,
    mapDispatch
  )(SavedAlbums)
);
