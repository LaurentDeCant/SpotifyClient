import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Album } from "../../types";
import { getUserAlbums } from "../../actions/library";
import { State } from "../../reducers";
import { selectUserAlbums } from "../../reducers/library";
import AlbumCovers from "../covers/AlbumCovers";

interface Props {
  albums: Album[];
  getUserAlbums: () => void;
}

function Albums({ albums, getUserAlbums }: Props) {
  useEffect(getUserAlbums, []);

  return <AlbumCovers albums={albums} />;
}

const mapState = (state: State) => ({
  albums: selectUserAlbums(state)
});

const mapDispatch = {
  getUserAlbums
};

export default connect(
  mapState,
  mapDispatch
)(Albums);
