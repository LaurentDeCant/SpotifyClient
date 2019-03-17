import React from "react";
import { Route } from "react-router-dom";
import styled from "../../styles/styled";
import DefaultRoute from "../DefaultRoute";
import Browse from "../browse/Browse";
import CategoryPlaylists from "../browse/CategoryPlaylists";
import Search from "../search/Search";
import PlaylistTracks from "../tracks/PlaylistTracks";
import AlbumTracks from "../tracks/AlbumTracks";

const Wrapper = styled.div`
  flex: 1;
  height: calc(100% - 50px);
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
        path={`${process.env.PUBLIC_URL}/playlists/:playlistId/tracks`}
        component={PlaylistTracks}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/albums/:albumId/tracks`}
        component={AlbumTracks}
      />
    </Wrapper>
  );
};

export default Routes;
