import React, { HTMLAttributes } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { Album, Artist, Playlist } from "../../types";
import { State } from "../../reducers";
import { selectRecents } from "../../reducers/player";
import RecentItem from "./RecentItem";

const Wrapper = styled.div``;

const Title = styled.h3`
  font-size: ${props => props.theme.fontSize.medium};
  text-align: center;
  margin-bottom: ${props => props.theme.thickness.small}px;
`;

const List = styled.ul``;

interface Props {
  recents: (Album | Artist | Playlist)[];
}

function RecentList({
  className,
  recents
}: Props & HTMLAttributes<HTMLElement>) {
  return (
    <Wrapper className={className}>
      {!!recents.length && <Title>Recently Played</Title>}
      <List>
        {recents.map(recent => (
          <RecentItem recent={recent} />
        ))}
      </List>
    </Wrapper>
  );
}

const mapState = (state: State) => ({
  recents: selectRecents(state)
});

export default connect(
  mapState,
  null
)(RecentList);
