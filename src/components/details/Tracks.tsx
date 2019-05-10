import React from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { DenormalizedTrack as TrackObject } from "../../types";
import { State } from "../../reducers";
import { selectIsLoaded, selectIsPlaying } from "../../reducers/player";
import Track from "./Track";

const StyledList = styled.ul`
  flex-grow: 1;
  overflow: hidden;
`;

interface Props {
  tracks: TrackObject[];
  isLoaded: (trackId: string) => boolean;
  isPlaying: (trackId: string) => boolean;
  onToggle?: (trackId: string) => void;
}

function Tracks({ tracks, isLoaded, isPlaying, onToggle }: Props) {
  function isDisabled(track: TrackObject) {
    return !track.preview_url;
  }

  return (
    <StyledList>
      {tracks.map(track => (
        <li key={track.id}>
          <Track
            track={track}
            isDisabled={isDisabled(track)}
            isLoaded={isLoaded(track.id)}
            isPlaying={isPlaying(track.id)}
            onToggle={onToggle}
          />
        </li>
      ))}
    </StyledList>
  );
}

const mapState = (state: State) => ({
  isLoaded: selectIsLoaded(state),
  isPlaying: selectIsPlaying(state)
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch
)(Tracks);
