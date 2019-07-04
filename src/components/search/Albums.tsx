import React from "react";
import { connect } from "react-redux";
import { Album } from "../../types";
import { selectAlbum } from "../../actions/search";
import { State } from "../../reducers";
import { selectAlbums } from "../../selectors/search";
import { Heading } from "../core";
import AlbumCovers from "../covers/AlbumCovers";
import Wrapper from "./Wrapper";

interface AlbumsProps {
  albums: Album[];
  selectAlbum: (albumId: string) => void;
}

function Albums({ albums, selectAlbum }: AlbumsProps) {
  return (
    <>
      {albums.length > 0 && (
        <Wrapper>
          <Heading>Albums & Singles</Heading>
          <AlbumCovers albums={albums} onSelect={selectAlbum} />
        </Wrapper>
      )}
    </>
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
