import React from "react";
import SubMenu from "../layout/SubMenu";
import SubRoutes from "../layout/SubRoutes";
import Categories from "./Categories";
import NewReleases from "./NewReleases";
import FeaturedPlaylists from "./FeaturedPlaylists";

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
    <>
      <SubMenu items={items} />
      <SubRoutes items={items} />
    </>
  );
}

export default Browse;
