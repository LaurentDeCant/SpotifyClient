import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Playlist } from "../../types";
import { getImageSource } from "../../utils";
import Covers, { Cover } from "./Covers";

function getCovers(playlists: Playlist[]): Cover[] {
  return playlists.map(playlist => ({
    id: playlist.id,
    image: getImageSource(playlist),
    title: playlist.name,
    subTitle: playlist.owner.display_name
  }));
}

interface Props extends RouteComponentProps {
  playlists: Playlist[];
  onSelect?: (playlistId: string) => void;
}

function PlayistCovers({ history, playlists, onSelect }: Props) {
  function handleClick(playlistId: string) {
    history.push(`${process.env.PUBLIC_URL}/playlist/${playlistId}`);
    onSelect && onSelect(playlistId);
  }

  const covers = getCovers(playlists);
  return <Covers covers={covers} onClick={handleClick} />;
}

export default withRouter(PlayistCovers);
