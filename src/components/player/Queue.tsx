import React from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { Track, Type } from "../../types";
import { loadPlayPause } from "../../actions/player";
import { State } from "../../reducers";
import { Collection } from "../../reducers/types";
import { selectCollection, selectLoadedTracks } from "../../reducers/player";
import { Heading } from "../core";
import TrackList from "../details/TrackList";
import Empty from "../layout/Empty";

const Wrapper = styled.div``;

interface Props {
  collection?: Collection;
  tracks: Track[];
  loadPlayPause: (
    collectionId: string,
    collectionType: Type,
    trackId: string
  ) => void;
}

function Queue({ collection, tracks, loadPlayPause }: Props) {
  function handleTogglePlay(trackId: string) {
    collection && loadPlayPause(collection.id, collection.type, trackId);
  }

  return (
    <Wrapper>
      <Heading>Queue</Heading>
      {tracks && tracks.length ? (
        <TrackList tracks={tracks} onTogglePlay={handleTogglePlay} />
      ) : (
        <Empty>No tracks</Empty>
      )}
    </Wrapper>
  );
}

const mapState = (state: State) => ({
  collection: selectCollection(state),
  tracks: selectLoadedTracks(state)
});

const mapDispatch = {
  loadPlayPause
};

export default connect(
  mapState,
  mapDispatch
)(Queue);
