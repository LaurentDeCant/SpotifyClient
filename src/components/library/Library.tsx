import React from "react";
import SubMenu from "../layout/SubMenu";
import SubRoutes from "../layout/SubRoutes";
import Artists from "./Artists";
import Albums from "./Albums";
import Playlists from "./Playlists";

const items = [
  {
    path: "artists",
    text: "Artists",
    default: true,
    component: Artists
  },
  {
    path: "albums",
    text: "Albums",
    component: Albums
  },
  {
    path: "playlists",
    text: "Playlists",
    component: Playlists
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
