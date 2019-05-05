import React from "react";
import { Artist } from "../../types";
import Covers, { Cover, CoverType } from "./Covers";

function getCovers(artists: Artist[]): Cover[] {
  return artists.map(artist => ({
    id: artist.id,
    image:
      artist.images && artist.images.length ? artist.images[0].url : undefined,
    title: artist.name
  }));
}

interface Props {
  artists: Artist[];
}

function ArtistCovers({ artists }: Props) {
  function handleClick(artistId: string) {}

  const covers = getCovers(artists);
  return (
    <Covers covers={covers} type={CoverType.Round} onClick={handleClick} />
  );
}

export default ArtistCovers;
