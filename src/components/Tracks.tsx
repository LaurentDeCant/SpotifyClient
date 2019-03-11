import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Track } from "../types";
import { playTrack } from "../actions/player";
import { joinArtistNames } from "../helpers/utils";
import Icon, { IconType } from "./Icon";

const Button = styled.button`
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  padding: 10px;
  width: 100%;

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

  ${Button}:hover & {
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

  ${Button}:hover & {
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

interface Props {
  tracks: Track[];
  playTrack: (trackId: string) => void;
}

class Tracks extends Component<Props> {
  handleClick = (trackId: string) => {
    this.props.playTrack(trackId);
  };

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

    return (
      <Duration>{`${minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`}</Duration>
    );
  }

  render() {
    const { tracks } = this.props;

    return (
      <ul>
        {tracks.map(track => (
          <li key={track.id}>
            <Button onClick={() => this.handleClick(track.id)}>
              {this.renderIcon(track)}
              <Div>
                <Title>{track.name}</Title>
                <Artists>{joinArtistNames(track.artists)}</Artists>
              </Div>
              {this.renderDuration(track)}
            </Button>
          </li>
        ))}
      </ul>
    );
  }
}

const mapState = () => ({});

const mapDispatch = {
  playTrack: playTrack
};

export default connect(
  mapState,
  mapDispatch
)(Tracks);
