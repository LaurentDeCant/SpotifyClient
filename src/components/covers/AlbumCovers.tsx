import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Album } from "../../types";
import { joinArtistNames } from "../../utils/artist";
import Covers, { Cover } from "./Covers";

function getCovers(albums: Album[]): Cover[] {
  return albums.map(album => ({
    id: album.id,
    image:
      album.images && album.images.length ? album.images[0].url : undefined,
    title: album.name,
    subTitle: joinArtistNames(album.artists)
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
