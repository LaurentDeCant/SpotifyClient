import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getSavedTracks } from "../../actions/library";
import { State } from "../../reducers";
import { selectSavedTracks } from "../../reducers/library";
import { Track } from "../../types";
import TrackList from "../details/TrackList";
import withLoader from "../withLoader";

interface Props {
  tracks: Track[];
  getSavedTracks: () => void;
}

function Tracks({ tracks, getSavedTracks }: Props) {
  useEffect(getSavedTracks, []);

  return <TrackList tracks={tracks} />;
}

const mapState = (state: State) => ({
  tracks: selectSavedTracks(state)
});

const mapDispatch = {
  getSavedTracks
};

export default withLoader(
  connect(
    mapState,
    mapDispatch
  )(Tracks)
);
