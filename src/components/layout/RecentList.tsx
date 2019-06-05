import React, { HTMLAttributes } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { Album, Artist, Playlist } from "../../types";
import { State } from "../../reducers";
import { selectRecents } from "../../reducers/player";
import RecentItem from "./RecentItem";

const Title = styled.h3`
  font-size: ${props => props.theme.fontSize.medium};
  font-weight: ${props => props.theme.fontWeight.normal};
  text-align: center;
  margin-bottom: ${props => props.theme.thickness.small}px;
`;

interface Props {
  recents: (Album | Artist | Playlist)[];
}

function RecentList({
  className,
  recents
}: Props & HTMLAttributes<HTMLElement>) {
  return (
    <div className={className}>
      {!!recents.length && <Title>Recently Played</Title>}
      <ul>
        {recents.map(recent => (
          <RecentItem key={recent.id} recent={recent} />
        ))}
      </ul>
    </div>
  );
}

const mapState = (state: State) => ({
  recents: selectRecents(state)
});

export default connect(
  mapState,
  null
)(RecentList);
