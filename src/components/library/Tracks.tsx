import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserTracks } from "../../actions/library";
import { State } from "../../reducers";
import { selectUserTracks } from "../../reducers/library";
import { Track } from "../../types";
import TrackList from "../details/TrackList";

interface Props {
  tracks: Track[];
  getUserTracks: () => void;
}

function Tracks({ tracks, getUserTracks }: Props) {
  useEffect(getUserTracks, []);

  return <TrackList tracks={tracks} />;
}

const mapState = (state: State) => ({
  tracks: selectUserTracks(state)
});

const mapDispatch = {
  getUserTracks
};

export default connect(
  mapState,
  mapDispatch
)(Tracks);
