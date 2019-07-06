import React from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { State } from "../../reducers";
import { selectHasResults } from "../../selectors/search";
import Empty from "../layout/Empty";
import SubMenu from "../layout/SubMenu";
import SubRoutes from "../layout/SubRoutes";
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

const items = [
  {
    path: "artists",
    text: "Artists",
    default: true,
    component: Artists
  },
  {
    path: "albums",
    text: "Albums",
    component: Albums
  },
  {
    path: "playlists",
    text: "Playlists",
    component: Playlists
  },
  {
    path: "tracks",
    text: "Tracks",
    component: Tracks
  }
];

function Results({ hasResults }: Props) {
  return hasResults ? (
    <Wrapper>
      <SubMenu items={items} />
      <SubRoutes items={items} />
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
