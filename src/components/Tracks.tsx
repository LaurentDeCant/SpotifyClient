import React, { Component } from "react";
import styled from "styled-components";
import { Track } from "../types";
import Icon, { IconType } from "./Icon";

interface Props {
  tracks: Track[];
}

const List = styled.ul``;

const Item = styled.li`
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  height: 50px;
  padding: 10px;

  &:hover {
    background: ${props => props.theme.background.hover};
  }

  &:active {
    background: ${props => props.theme.background.active};
  }
`;

const Preview = styled(Icon)`
  color: ${props => props.theme.foreground.dark};
  margin-right: 15px;

  ${Item}:hover & {
    display: none;
  }
`;

const NoPreview = styled(Icon)`
  color: ${props => props.theme.foreground.dark};
  margin-right: 15px;
`;

const Play = styled(Icon)`
  display: none;
  margin-right: 15px;

  ${Item}:hover & {
    display: block;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-weight: ${props => props.theme.font.weight.light};
  height: 100%;
`;

const Title = styled.span`
  align-items: center;
  display: flex;
  flex-grow: 1;
`;

const Artists = styled.span`
  align-items: center;
  color: ${props => props.theme.foreground.dark};
  display: flex;
  flex-grow: 1;
`;

const Duration = styled.span`
  color: ${props => props.theme.foreground.dark};
`;

class Tracks extends Component<Props> {
  renderIcon(track: Track) {
    return track.preview_url ? (
      <>
        <Preview type={IconType.MusicNote} />
        <Play type={IconType.PlayArrow} />
      </>
    ) : (
      <NoPreview type={IconType.MusicOff} />
    );
  }

  renderArtists(track: Track) {
    const names = track.artists.map(artist => artist.name).join(", ");

    return <Artists>{names}</Artists>;
  }

  renderDuration(track: Track) {
    let seconds = track.duration_ms / 1000;
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    return <Duration>{`${minutes}:${seconds}`}</Duration>;
  }

  render() {
    const { tracks } = this.props;
    return (
      <List>
        {tracks.map(track => (
          <Item key={track.id}>
            {this.renderIcon(track)}
            <Div>
              <Title>{track.name}</Title>
              {this.renderArtists(track)}
            </Div>
            {this.renderDuration(track)}
          </Item>
        ))}
      </List>
    );
  }
}

export default Tracks;
