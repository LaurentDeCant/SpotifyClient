import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Album } from "../../types";
import { getNewReleases } from "../../actions/browse";
import { State } from "../../reducers";
import { selectNewReleases } from "../../selectors/browse";
import AlbumCovers from "../covers/AlbumCovers";
import withLoader from "../withLoader";

interface Props {
  albums: Album[];
  getAlbums: () => void;
}

function NewReleases({ albums, getAlbums }: Props) {
  useEffect(getAlbums, []);

  return <AlbumCovers albums={albums} />;
}

const mapState = (state: State) => ({
  albums: selectNewReleases(state)
});

const mapDispatch = {
  getAlbums: getNewReleases
};

export default withLoader(
  connect(
    mapState,
    mapDispatch
  )(NewReleases)
);
