import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Album, Artist } from "../../types";
import { State } from "../../reducers";
import { selectAlbumArtists } from "../../selectors/albums";
import { getArtistNames, getImageSource } from "../../utils";
import { Cover } from "./types";
import CoverList from "./CoverList";

interface Props extends RouteComponentProps {
  albums: Album[];
  selectAbumArtists: (albumId: string) => Artist[];
  onSelect?: (albumId: string) => void;
}

function AlbumCovers({ history, albums, selectAbumArtists, onSelect }: Props) {
  function handleClick(albumId: string) {
    history.push(`${process.env.PUBLIC_URL}/album/${albumId}`);
    onSelect && onSelect(albumId);
  }

  const covers = getCovers(albums, selectAbumArtists);
  return <CoverList covers={covers} onClick={handleClick} />;
}

function getCovers(
  albums: Album[],
  selectAlbumArtists: (albumId: string) => Artist[]
): Cover[] {
  return albums.map(album => {
    const artists = selectAlbumArtists(album.id);
    return {
      id: album.id,
      imageSource: getImageSource(album),
      title: album.name,
      subTitle: getArtistNames(artists)
    };
  });
}

const mapDispatch = (state: State) => ({
  selectAbumArtists: selectAlbumArtists(state)
});

export default withRouter(
  connect(
    mapDispatch,
    null
  )(AlbumCovers)
);
