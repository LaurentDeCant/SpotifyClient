import React from "react";
import { Artist } from "../../types";
import Covers, { Cover, CoverType } from "./Covers";
import { RouteComponentProps, withRouter } from "react-router";

function getCovers(artists: Artist[]): Cover[] {
  return artists.map(artist => ({
    id: artist.id,
    image:
      artist.images && artist.images.length ? artist.images[0].url : undefined,
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
    <Covers covers={covers} type={CoverType.Round} onClick={handleClick} />
  );
}

export default withRouter(ArtistCovers);
