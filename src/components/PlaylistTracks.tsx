import React, { Component } from "react";
import Tracks from "./Tracks";

class PlaylistTracks extends Component {
  render() {
    return (
      <div>
        <h1>Playlist</h1>
        <Tracks />
      </div>
    );
  }
}

export default PlaylistTracks;
