import React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import { capitalize } from "lodash";
import styled from "../../styles/styled";
import { Album, Artist, Playlist } from "../../types";
import { clearRecents } from "../../actions/search";
import { State } from "../../reducers";
import { selectRecents } from "../../reducers/search";
import { getImageSource, getImageShape } from "../../utils";
import { Heading, PrimaryButton } from "../core";
import CoverList from "../covers/CoverList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
`;

const StyledCoverList = styled(CoverList)`
  margin-bottom: ${props => props.theme.thickness.medium}px;
`;

const ClearButton = styled(PrimaryButton).attrs(() => ({
  children: "Clear"
}))`
  align-self: center;
`;

interface Props extends RouteComponentProps {
  recents: (Album | Artist | Playlist)[];
  clearRecents: () => void;
}

function Recents({ history, recents, clearRecents }: Props) {
  function handleClick(id: string) {
    const recent = recents.find(recent => recent.id === id);
    if (recent) {
      history.push(`${process.env.PUBLIC_URL}/${recent.type}/${recent.id}`);
    }
  }

  const covers = getCovers(recents);
  return (
    <Wrapper>
      {!!recents.length && (
        <>
          <Heading>Recent searches</Heading>
          <StyledCoverList covers={covers} onClick={handleClick} />
          <ClearButton onClick={clearRecents} />
        </>
      )}
    </Wrapper>
  );
}

function getCovers(recents: (Album | Artist | Playlist)[]) {
  return recents.map(recent => ({
    id: recent.id,
    imageSource: getImageSource(recent),
    imageShape: getImageShape(recent),
    title: recent.name,
    subTitle: capitalize(recent.type)
  }));
}

const mapState = (state: State) => ({
  recents: selectRecents(state)
});

const mapDispatch = {
  clearRecents
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Recents)
);
