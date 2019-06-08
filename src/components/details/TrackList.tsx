import React from "react";
import styled from "../../styles/styled";
import { Track } from "../../types";
import TrackItem from "./TrackItem";

const StyledList = styled.ul`
  flex-grow: 1;
  overflow: hidden;
`;

interface Props {
  tracks: Track[];
  onTogglePlay: (trackId: string) => void;
}

function TrackList({ tracks, onTogglePlay }: Props) {
  return (
    <StyledList>
      {tracks.map(track => (
        <TrackItem key={track.id} track={track} onTogglePlay={onTogglePlay} />
      ))}
    </StyledList>
  );
}

TrackList.defaultProps = {
  onTogglePlay: () => {}
};

export default TrackList;
