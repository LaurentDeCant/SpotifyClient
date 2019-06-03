import React, { HTMLAttributes } from "react";
import { connect } from "react-redux";
import { capitalize } from "lodash";
import { State } from "../../reducers";
import { selectRecents } from "../../reducers/player";
import { Album, Artist, Playlist } from "../../types";
import styled from "../../styles/styled";

const Wrapper = styled.div``;

const Title = styled.h3`
  font-size: ${props => props.theme.fontSize.medium};
  text-align: center;
  margin-bottom: ${props => props.theme.thickness.medium}px;
`;

const List = styled.ul``;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.theme.thickness.medium}px;
  padding: 0 ${props => props.theme.thickness.medium}px;
`;

const Name = styled.span`
  margin-bottom: ${props => props.theme.thickness.extraSmall}px;
`;

const Type = styled.span`
  color: ${props => props.theme.foreground.dark};
`;

interface Props {
  recents: (Album | Artist | Playlist)[];
}

function Recents({ className, recents }: Props & HTMLAttributes<HTMLElement>) {
  return (
    <Wrapper className={className}>
      {!!recents.length && <Title>Recently Played</Title>}
      <List>
        {recents.map(recent => (
          <Item>
            <Name>{recent.name}</Name>
            <Type>{capitalize(recent.type)}</Type>
          </Item>
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
)(Recents);
