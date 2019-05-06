import React from "react";
import { Route } from "react-router-dom";
import styled from "../../styles/styled";
import DefaultRoute from "../DefaultRoute";
import Browse from "../browse/Browse";
import CategoryPlaylists from "../browse/CategoryPlaylists";
import Search from "../search/Search";
import PlaylistDetails from "../details/PlaylistDetails";
import AlbumDetails from "../details/AlbumDetails";
import ArtistDetails from "../details/ArtistDetails";

const Wrapper = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  height: 100%;
  overflow-y: auto;
  padding: 25px;
  position: relative;
`;

const Routes = () => {
  return (
    <Wrapper>
      <DefaultRoute
        from={`${process.env.PUBLIC_URL}/`}
        to={`${process.env.PUBLIC_URL}/browse`}
      />
      <Route path={`${process.env.PUBLIC_URL}/browse`} component={Browse} />
      <Route path={`${process.env.PUBLIC_URL}/search`} component={Search} />
      <Route
        path={`${process.env.PUBLIC_URL}/categories/:categoryId/playlists`}
        component={CategoryPlaylists}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/playlists/:playlistId`}
        component={PlaylistDetails}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/albums/:albumId`}
        component={AlbumDetails}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/artists/:artistId`}
        component={ArtistDetails}
      />
    </Wrapper>
  );
};

export default Routes;
