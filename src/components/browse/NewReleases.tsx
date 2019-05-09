import React, { useEffect } from "react";
import { connect } from "react-redux";
import { DenormalizedAlbum as Album } from "../../types";
import { getNewReleases } from "../../actions/browse";
import { State } from "../../reducers";
import { selectNewReleases } from "../../reducers/browse";
import AlbumCovers from "../covers/AlbumCovers";
import withReloader from "../withReloader";

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

export default connect(
  mapState,
  mapDispatch
)(withReloader(NewReleases));
