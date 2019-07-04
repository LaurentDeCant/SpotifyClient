import React from "react";
import { connect } from "react-redux";
import { Track, Type } from "../../types";
import { loadPlayPause } from "../../actions/player";
import { State } from "../../reducers";
import { selectTracks } from "../../selectors/search";
import { Heading } from "../core";
import TrackList from "../details/TrackList";
import Wrapper from "./Wrapper";

const CollectionId = "";

interface TracksProps {
  tracks: Track[];
  loadPlayPause: (
    collectionId: string,
    collectionType: Type,
    trackId: string
  ) => void;
}

function Tracks({ tracks, loadPlayPause }: TracksProps) {
  function handleTogglePlay(trackId: string) {
    loadPlayPause(CollectionId, Type.Search, trackId);
  }

  return (
    <>
      {!!tracks.length && (
        <Wrapper>
          <Heading>Tracks</Heading>
          <TrackList tracks={tracks} onTogglePlay={handleTogglePlay} />
        </Wrapper>
      )}
    </>
  );
}

const mapState = (state: State) => ({
  tracks: selectTracks(state)
});

const mapDispatch = {
  loadPlayPause
};

export default connect(
  mapState,
  mapDispatch
)(Tracks);
