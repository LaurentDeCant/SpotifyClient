import React from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { clearRecents } from "../../actions/search";
import { State } from "../../reducers";
import { selectRecents, Recent, RecentType } from "../../reducers/search";
import { Button, Heading } from "../core";
import { ImageShape } from "../core/Image";
import CoverList from "../covers/CoverList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCoverList = styled(CoverList)`
  margin-bottom: ${props => props.theme.thickness.medium}px;
`;

const ClearButton = styled(Button).attrs(() => ({
  children: "Clear"
}))`
  align-self: center;
`;

interface Props {
  recents: Recent[];
  clearRecents: () => void;
}

function Recents({ recents, clearRecents }: Props) {
  const covers = getCovers(recents);
  return (
    <Wrapper>
      {!!recents.length && <Heading>Recent searches</Heading>}
      <StyledCoverList covers={covers} onClick={() => {}} />
      {!!recents.length && <ClearButton onClick={clearRecents} />}
    </Wrapper>
  );
}

function getCovers(recents: Recent[]) {
  return recents.map(recent => ({
    id: recent.id,
    imageSource: recent.imageSource,
    imageShape:
      recent.type === RecentType.Artist ? ImageShape.Round : ImageShape.Square,
    title: recent.name,
    subTitle: recent.type
  }));
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
