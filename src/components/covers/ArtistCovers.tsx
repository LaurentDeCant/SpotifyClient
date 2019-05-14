import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { DenormalizedArtist as Artist } from "../../types";
import { getImageUrl } from "../../utils";
import { ImageShape } from "../core/Image";
import Covers, { Cover } from "./Covers";

function getCovers(artists: Artist[]): Cover[] {
  return artists.map(artist => ({
    id: artist.id,
    image: getImageUrl(artist),
    title: artist.name
  }));
}

interface Props extends RouteComponentProps {
  artists: Artist[];
}

function ArtistCovers({ history, artists }: Props) {
  function handleClick(artistId: string) {
    history.push(`${process.env.PUBLIC_URL}/artists/${artistId}`);
  }

  const covers = getCovers(artists);
  return (
    <Covers covers={covers} shape={ImageShape.Round} onClick={handleClick} />
  );
}

export default withRouter(ArtistCovers);
