import React from "react";
import { connect } from "react-redux";
import { Album } from "../../types";
import { selectAlbum } from "../../actions/search";
import { State } from "../../reducers";
import { selectAlbums } from "../../selectors/search";
import AlbumCovers from "../covers/AlbumCovers";
import Wrapper from "./Wrapper";

interface AlbumsProps {
  albums: Album[];
  selectAlbum: (albumId: string) => void;
}

function Albums({ albums, selectAlbum }: AlbumsProps) {
  return (
    <Wrapper>
      {albums.length > 0 && (
        <AlbumCovers albums={albums} onSelect={selectAlbum} />
      )}
    </Wrapper>
  );
}

const mapState = (state: State) => ({
  albums: selectAlbums(state)
});

const mapDispatch = {
  selectAlbum: selectAlbum
};

export default connect(
  mapState,
  mapDispatch
)(Albums);
