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
  onToggle: (trackId: string) => void;
}

function TrackList({ tracks, onToggle }: Props) {
  return (
    <StyledList>
      {tracks.map(track => (
        <TrackItem key={track.id} track={track} onToggle={onToggle} />
      ))}
    </StyledList>
  );
}

TrackList.defaultProps = {
  onToggle: () => {}
};

export default TrackList;
