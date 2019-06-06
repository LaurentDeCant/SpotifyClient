import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Album } from "../../types";
import { getSavedAlbums } from "../../actions/library";
import { State } from "../../reducers";
import { selectSavedAlbums } from "../../reducers/library";
import AlbumCovers from "../covers/AlbumCovers";
import withLoader from "../withLoader";

interface Props {
  albums: Album[];
  getSavedAlbums: () => void;
}

function Albums({ albums, getSavedAlbums }: Props) {
  useEffect(getSavedAlbums, []);

  return <AlbumCovers albums={albums} />;
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
  )(Albums)
);
