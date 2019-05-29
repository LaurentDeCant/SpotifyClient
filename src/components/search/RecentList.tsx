import React from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { clearRecents } from "../../actions/search";
import { State } from "../../reducers";
import { selectRecents, Recent } from "../../reducers/search";
import { Button, Heading } from "../core";
import RecentItem from "./RecentItem";

const List = styled.ul`
  margin-bottom: ${props => props.theme.thickness.medium}px;
`;

const StyledRecentItem = styled(RecentItem)`
  margin-bottom: ${props => props.theme.thickness.small}px;
`;

const ClearButton = styled(Button).attrs(() => ({
  children: "Clear"
}))``;

interface Props {
  recents: Recent[];
  clearRecents: () => void;
}

function Recents({ recents, clearRecents }: Props) {
  return (
    <>
      {!!recents.length && <Heading>Recent searches</Heading>}
      <List>
        {recents.map(recent => (
          <StyledRecentItem key={recent.id} recent={recent} />
        ))}
      </List>
      {!!recents.length && <ClearButton onClick={clearRecents} />}
    </>
  );
}

const mapState = (state: State) => ({
  recents: selectRecents(state)
});

const mapDispatch = {
  clearRecents
};

export default connect(
  mapState,
  mapDispatch
)(Recents);
