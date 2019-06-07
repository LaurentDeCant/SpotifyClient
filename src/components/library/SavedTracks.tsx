import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { getSavedTracks } from "../../actions/library";
import { State } from "../../reducers";
import { selectSavedTracks } from "../../reducers/library";
import { Track } from "../../types";
import { Heading } from "../core";
import TrackList from "../details/TrackList";
import withLoader from "../withLoader";

const StyledHeading = styled(Heading)`
  align-self: center;
  font-size: ${props => props.theme.fontSize.extraExtraLarge};
`;

interface Props {
  tracks: Track[];
  getSavedTracks: () => void;
}

function SavedTracks({ tracks, getSavedTracks }: Props) {
  useEffect(getSavedTracks, []);

  return tracks.length ? (
    <TrackList tracks={tracks} />
  ) : (
    <StyledHeading>No saved tracks.</StyledHeading>
  );
}

const mapState = (state: State) => ({
  tracks: selectSavedTracks(state)
});

const mapDispatch = {
  getSavedTracks
};

export default withLoader(
  connect(
    mapState,
    mapDispatch
  )(SavedTracks)
);
