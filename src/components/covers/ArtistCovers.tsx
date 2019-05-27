import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Artist } from "../../types";
import { getImageSource } from "../../utils";
import { ImageShape } from "../core/Image";
import Covers, { Cover } from "./Covers";

function getCovers(artists: Artist[]): Cover[] {
  return artists.map(artist => ({
    id: artist.id,
    image: getImageSource(artist),
    title: artist.name
  }));
}

interface Props extends RouteComponentProps {
  artists: Artist[];
  onSelect?: (artistId: string) => void;
}

function ArtistCovers({ history, artists, onSelect }: Props) {
  function handleClick(artistId: string) {
    history.push(`${process.env.PUBLIC_URL}/artist/${artistId}`);
    onSelect && onSelect(artistId);
  }

  const covers = getCovers(artists);
  return (
    <Covers covers={covers} shape={ImageShape.Round} onClick={handleClick} />
  );
}

export default withRouter(ArtistCovers);
