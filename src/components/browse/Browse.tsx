import React from "react";
import styled from "../../styles/styled";
import SubMenu from "../layout/SubMenu";
import SubRoutes from "../layout/SubRoutes";
import Categories from "./Categories";
import NewReleases from "./NewReleases";
import FeaturedPlaylists from "./FeaturedPlaylists";

const Wrapper = styled.div`
  height: 100%;
`;

const items = [
  {
    path: "categories",
    text: "Categories",
    default: true,
    component: Categories
  },
  {
    path: "new-releases",
    text: "New Releases",
    component: NewReleases
  },
  {
    path: "featured-playists",
    text: "Featured Playlists",
    component: FeaturedPlaylists
  }
];

function Browse() {
  return (
    <Wrapper>
      <SubMenu items={items} />
      <SubRoutes items={items} />
    </Wrapper>
  );
}

export default Browse;
