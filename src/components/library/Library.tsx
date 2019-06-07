import React from "react";
import SubMenu from "../layout/SubMenu";
import SubRoutes from "../layout/SubRoutes";
import FollowedArtists from "./FollowedArtists";
import SavedAlbums from "./SavedAlbums";
import FollowedPlaylists from "./FollowedPlaylists";
import SavedTracks from "./SavedTracks";

const items = [
  {
    path: "artists",
    text: "Artists",
    default: true,
    component: FollowedArtists
  },
  {
    path: "albums",
    text: "Albums",
    component: SavedAlbums
  },
  {
    path: "playlists",
    text: "Playlists",
    component: FollowedPlaylists
  },
  {
    path: "tracks",
    text: "Tracks",
    component: SavedTracks
  }
];

function Library() {
  return (
    <>
      <SubMenu items={items} />
      <SubRoutes items={items} />
    </>
  );
}

export default Library;
