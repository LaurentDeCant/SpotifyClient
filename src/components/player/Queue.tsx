import React from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { Track } from "../../types";
import { State } from "../../reducers";
import { selectLoadedTracks } from "../../reducers/player";
import { Heading } from "../core";
import TrackList from "../details/TrackList";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
`;

interface Props {
  tracks: Track[];
}

function Queue({ tracks }: Props) {
  function handleToggle() {}

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
  tracks: selectLoadedTracks(state)
});

export default connect(
  mapState,
  null
)(Queue);
