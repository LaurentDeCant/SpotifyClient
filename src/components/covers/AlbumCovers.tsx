import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { DenormalizedAlbum as Album } from "../../types";
import { getArtistNames, getImageUrl } from "../../utils";
import Covers, { Cover } from "./Covers";

function getCovers(albums: Album[]): Cover[] {
  return albums.map(album => ({
    id: album.id,
    image: getImageUrl(album),
    title: album.name,
    subTitle: getArtistNames(album.artists)
  }));
}

interface Props extends RouteComponentProps {
  albums: Album[];
}

function AlbumCovers({ history, albums }: Props) {
  function handleClick(albumId: string) {
    history.push(`${process.env.PUBLIC_URL}/albums/${albumId}`);
  }

  const covers = getCovers(albums);
  return <Covers covers={covers} onClick={handleClick} />;
}

export default withRouter(AlbumCovers);
