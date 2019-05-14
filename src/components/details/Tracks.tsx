import React from "react";
import styled from "../../styles/styled";
import { DenormalizedTrack as TrackObject } from "../../types";
import Track from "./Track";

const StyledList = styled.ul`
  flex-grow: 1;
  overflow: hidden;
`;

const StyledItem = styled.li`
  margin-bottom: 6.25px;
`;

interface Props {
  tracks: TrackObject[];
  onToggle: (trackId: string) => void;
}

function Tracks({ tracks, onToggle }: Props) {
  console.log("Tracks");

  return (
    <StyledList>
      {tracks.map(track => (
        <StyledItem key={track.id}>
          <Track track={track} onToggle={onToggle} />
        </StyledItem>
      ))}
    </StyledList>
  );
}

export default Tracks;
