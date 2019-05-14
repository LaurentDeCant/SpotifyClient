import React from "react";
import styled from "../../styles/styled";
import { Track } from "../../types";
import TrackItem from "./TrackItem";

const StyledList = styled.ul`
  flex-grow: 1;
  overflow: hidden;
`;

const StyledItem = styled.li`
  margin-bottom: 6.25px;
`;

interface Props {
  tracks: Track[];
  onToggle: (trackId: string) => void;
}

function TrackList({ tracks, onToggle }: Props) {
  console.log("Tracks");

  return (
    <StyledList>
      {tracks.map(track => (
        <StyledItem key={track.id}>
          <TrackItem track={track} onToggle={onToggle} />
        </StyledItem>
      ))}
    </StyledList>
  );
}

export default TrackList;
