import React from "react";
import { Route } from "react-router";
import styled from "../../styles/styled";
import DefaultRoute from "../DefaultRoute";
import PrivateRoute from "../PrivateRoute";
import LogIn from "./Login";
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
`;

const Routes = () => {
  const publicUrl = process.env.PUBLIC_URL;
  return (
    <Wrapper>
      <DefaultRoute from={`${publicUrl}/`} to={`${publicUrl}/browse`} />
      <Route path={`${publicUrl}/login`} component={LogIn} />
      <PrivateRoute path={`${publicUrl}/browse`} component={Browse} />
      <PrivateRoute path={`${publicUrl}/search/:query?`} component={Search} />
      <PrivateRoute
        path={`${publicUrl}/category/:categoryId`}
        component={CategoryPlaylists}
      />
      <PrivateRoute
        path={`${publicUrl}/playlist/:playlistId`}
        component={PlaylistDetails}
      />
      <PrivateRoute
        path={`${publicUrl}/album/:albumId`}
        component={AlbumDetails}
      />
      <PrivateRoute
        path={`${publicUrl}/artist/:artistId`}
        component={ArtistDetails}
      />
    </Wrapper>
  );
};

export default Routes;
