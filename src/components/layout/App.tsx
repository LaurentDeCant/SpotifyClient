import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Menu from "./Menu";
import DefaultRoute from "../DefaultRoute";
import Browse from "../browse/Browse";
import Search from "../search/Search";
import CategoryPlaylists from "../browse/CategoryPlaylists";
import PlaylistTracks from "../tracks/PlaylistTracks";
import AlbumTracks from "../tracks/AlbumTracks";
import Player from "../player/Player";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
`;

const Routes = styled.div`
  flex: 1;
  height: calc(100% - 50px);
  overflow-y: auto;
  padding: 25px;
  position: relative;
`;

class App extends Component {
  render() {
    return (
      <Router>
        <Wrapper>
          <Header />
          <Body>
            <Menu />
            <Routes>
              <DefaultRoute from="/" to="/browse" />
              <Route path="/browse" component={Browse} />
              <Route path="/search" component={Search} />
              <Route
                path={`/categories/:categoryId/playlists`}
                component={CategoryPlaylists}
              />
              <Route
                path={"/playlists/:playlistId/tracks"}
                component={PlaylistTracks}
              />
              <Route path={"/albums/:albumId/tracks"} component={AlbumTracks} />
            </Routes>
          </Body>

          <Player />
        </Wrapper>
      </Router>
    );
  }
}

export default App;
