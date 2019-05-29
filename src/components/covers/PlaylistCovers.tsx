import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Playlist } from "../../types";
import { getImageSource } from "../../utils";
import { Cover } from "./types";
import CoverList from "./CoverList";

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
  return <CoverList covers={covers} onClick={handleClick} />;
}

function getCovers(playlists: Playlist[]): Cover[] {
  return playlists.map(playlist => ({
    id: playlist.id,
    imageSource: getImageSource(playlist),
    title: playlist.name,
    subTitle: playlist.owner.display_name
  }));
}

export default withRouter(PlayistCovers);
