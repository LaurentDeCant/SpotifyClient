import React from "react";
import { Route } from "react-router";
import styled from "../../styles/styled";
import DefaultRoute from "../DefaultRoute";
import PrivateRoute from "../PrivateRoute";
import LogIn from "./Login";
import Browse from "../browse/Browse";
import CategoryPlaylists from "../browse/CategoryPlaylists";
import Search from "../search/Search";
import Library from "../library/Library";
import PlaylistDetails from "../details/PlaylistDetails";
import AlbumDetails from "../details/AlbumDetails";
import ArtistDetails from "../details/ArtistDetails";
import Queue from "../player/Queue";

const Wrapper = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  height: 100%;
  overflow-y: auto;
  padding: ${props => props.theme.thickness.medium}px;
`;

const publicUrl = process.env.PUBLIC_URL;
const Routes = () => {
  return (
    <Wrapper>
      <DefaultRoute from={`${publicUrl}/`} to={`${publicUrl}/browse`} />
      <Route path={`${publicUrl}/login`} component={LogIn} />
      <PrivateRoute path={`${publicUrl}/browse`} component={Browse} />
      <PrivateRoute path={`${publicUrl}/search/:query?`} component={Search} />
      <PrivateRoute path={`${publicUrl}/library`} component={Library} />
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
      <PrivateRoute path={`${publicUrl}/queue`} component={Queue} />
    </Wrapper>
  );
};

export default Routes;
