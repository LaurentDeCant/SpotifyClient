import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Album, Artist } from "../../types";
import { getArtistNames, getImageSource } from "../../utils";
import Covers, { Cover } from "./Covers";
import { State } from "../../reducers";
import { selectAlbumArtists } from "../../reducers/albums";

function getCovers(
  albums: Album[],
  selectAlbumArtists: (albumId: string) => Artist[]
): Cover[] {
  return albums.map(album => {
    const artists = selectAlbumArtists(album.id);
    return {
      id: album.id,
      image: getImageSource(album),
      title: album.name,
      subTitle: getArtistNames(artists)
    };
  });
}

interface Props extends RouteComponentProps {
  albums: Album[];
  selectAbumArtists: (albumId: string) => Artist[];
}

function AlbumCovers({ history, albums, selectAbumArtists }: Props) {
  function handleClick(albumId: string) {
    history.push(`${process.env.PUBLIC_URL}/album/${albumId}`);
  }

  const covers = getCovers(albums, selectAbumArtists);
  return <Covers covers={covers} onClick={handleClick} />;
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
