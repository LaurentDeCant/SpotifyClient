import React, { Component } from "react";
import { Track } from "../types";

interface Props {
  tracks: Track[];
}

class Tracks extends Component<Props> {
  render() {
    const { tracks } = this.props;
    return (
      <ul>
        {tracks.map(track => (
          <li key={track.id}>{track.name}</li>
        ))}
      </ul>
    );
  }
}

export default Tracks;
