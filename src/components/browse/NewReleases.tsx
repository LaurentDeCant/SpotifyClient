import React, { useEffect } from "react";
import { connect } from "react-redux";
import { DenormalizedAlbum as Album } from "../../types";
import { State } from "../../reducers";
import { selectIsFetching, selectNewReleases } from "../../reducers/browse";
import { getNewReleases } from "../../actions/browse";
import { AlbumCovers } from "../covers";
import withReloader from "../withReloader";

interface Props {
  isLoading: boolean;
  albums: Album[];
  getAlbums: () => void;
}

function NewReleases({ albums, getAlbums }: Props) {
  useEffect(getAlbums, []);

  return <AlbumCovers albums={albums} />;
}

const mapState = (state: State) => ({
  isLoading: selectIsFetching(state),
  albums: selectNewReleases(state)
});

const mapDispatch = {
  getAlbums: getNewReleases
};

export default connect(
  mapState,
  mapDispatch
)(withReloader(NewReleases));
