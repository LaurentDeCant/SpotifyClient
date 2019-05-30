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

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
`;

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
  function handleToggle(trackId: string) {
    collection && loadPlayPause(collection.id, collection.type, trackId);
  }

  return (
    <>
      {tracks && tracks.length ? (
        <>
          <Heading>Queue</Heading>
          <TrackList tracks={tracks} onToggle={handleToggle} />
        </>
      ) : (
        <Wrapper>
          <Heading>No tracks in the queue.</Heading>
        </Wrapper>
      )}
    </>
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
