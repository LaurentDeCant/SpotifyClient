import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getSavedTracks } from "../../actions/library";
import { loadPlayPause } from "../../actions/player";
import { State } from "../../reducers";
import { selectSavedTracks } from "../../selectors/library";
import { Track, Type } from "../../types";
import TrackList from "../details/TrackList";
import Empty from "../layout/Empty";
import withLoader from "../withLoader";

const CollectionId = "";

interface Props {
  tracks: Track[];
  getSavedTracks: () => void;
  loadPlayPause: (
    collectionId: string,
    collectionType: Type,
    trackId: string
  ) => void;
}

function SavedTracks({ tracks, getSavedTracks, loadPlayPause }: Props) {
  useEffect(getSavedTracks, []);

  function handleTogglePlay(trackId: string) {
    loadPlayPause(CollectionId, Type.Library, trackId);
  }

  return tracks.length ? (
    <TrackList tracks={tracks} onTogglePlay={handleTogglePlay} />
  ) : (
    <Empty>No saved tracks</Empty>
  );
}

const mapState = (state: State) => ({
  tracks: selectSavedTracks(state)
});

const mapDispatch = {
  getSavedTracks,
  loadPlayPause
};

export default withLoader(
  connect(
    mapState,
    mapDispatch
  )(SavedTracks)
);
