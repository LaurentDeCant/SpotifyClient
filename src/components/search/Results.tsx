import React from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { State } from "../../reducers";
import { selectHasResults } from "../../selectors/search";
import Empty from "../layout/Empty";
import withLoader from "../withLoader";
import Artists from "./Artists";
import Albums from "./Albums";
import Playlists from "./Playlists";
import Tracks from "./Tracks";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  hasResults: boolean;
}

function Results({ hasResults }: Props) {
  return hasResults ? (
    <Wrapper>
      <Artists />
      <Albums />
      <Playlists />
      <Tracks />
    </Wrapper>
  ) : (
    <Empty>No Results</Empty>
  );
}

const mapState = (state: State) => ({
  hasResults: selectHasResults(state)
});

export default withLoader(
  connect(
    mapState,
    null
  )(Results)
);
