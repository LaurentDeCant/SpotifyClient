import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { DenormalizedPlaylist as Playlist } from "../../types";
import Covers, { Cover } from "./Covers";

function getCovers(playlists: Playlist[]): Cover[] {
  return playlists.map(playlist => ({
    id: playlist.id,
    image:
      playlist.images && playlist.images ? playlist.images[0].url : undefined,
    title: playlist.name,
    subTitle: playlist.owner.display_name
  }));
}

interface Props extends RouteComponentProps {
  playlists: Playlist[];
}

function PlayistCovers({ history, playlists }: Props) {
  function handleClick(playlistId: string) {
    history.push(`${process.env.PUBLIC_URL}/playlists/${playlistId}`);
  }

  const covers = getCovers(playlists);
  return <Covers covers={covers} onClick={handleClick} />;
}

export default withRouter(PlayistCovers);
