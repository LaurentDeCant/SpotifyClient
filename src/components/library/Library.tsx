import React from "react";
import styled from "../../styles/styled";
import SubMenu from "../layout/SubMenu";
import SubRoutes from "../layout/SubRoutes";
import Artists from "./Artists";
import Albums from "./Albums";
import Playlists from "./Playlists";

const Wrapper = styled.div`
  height: 100%;
`;

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
    <Wrapper>
      <SubMenu items={items} />
      <SubRoutes items={items} />
    </Wrapper>
  );
}

export default Library;
