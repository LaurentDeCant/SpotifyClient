import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { Track } from "../../types";
import { State } from "../../reducers";
import { selectIsLoaded, selectIsPlaying } from "../../reducers/player";
import { loadTrack, toggle } from "../../actions/player";
import { joinArtistNames } from "../../helpers/utils";
import Button from "../Button";
import Icon, { IconType } from "../Icon";

const StyledButton = styled(Button)<{ isLoaded: boolean }>`
  align-items: center;
  border-radius: 5px;
  color: ${props =>
    props.isLoaded ? props.theme.primaryLight : props.theme.foreground.default};
  display: flex;
  margin-bottom: 5px;
  padding: 10px;
  width: 100%;
`;

const StyledIcon = styled(Icon)<{
  isHidden?: boolean;
}>`
  display: ${props => (props.isHidden ? "none" : "block")};
  margin-right: 15px;

  ${StyledButton}:not(:disabled):hover & {
    display: ${props => (props.isHidden ? "block" : "none")};
  }
`;

const Infos = styled.div`
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
  margin-bottom: 5px;
`;

const Artist = styled.span`
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
  isLoaded: (trackId: string) => boolean;
  isPlaying: (trackId: string) => boolean;
  loadTrack: (trackId: string) => void;
  toggle: () => void;
}

class Tracks extends Component<Props> {
  handleClick = (trackId: string) => {
    const { isLoaded, loadTrack, toggle } = this.props;

    if (isLoaded(trackId)) {
      toggle();
    } else {
      loadTrack(trackId);
    }
  };

  isDisabled(track: Track) {
    return !!track.preview_url;
  }

  renderIcon(track: Track) {
    const { isPlaying } = this.props;
    const hasPreview = track.preview_url;

    return hasPreview ? (
      <>
        <StyledIcon
          type={isPlaying(track.id) ? IconType.VolumeUp : IconType.MusicNote}
        />
        <StyledIcon
          type={isPlaying(track.id) ? IconType.Pause : IconType.PlayArrow}
          isHidden={true}
        />
      </>
    ) : (
      <StyledIcon type={IconType.MusicOff} />
    );
  }

  renderArtist(track: Track) {
    return <Artist>{joinArtistNames(track.artists)}</Artist>;
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
    const { tracks, isLoaded } = this.props;

    return (
      <ul>
        {tracks.map(track => {
          return (
            <li key={track.id}>
              <StyledButton
                onClick={() => this.handleClick(track.id)}
                disabled={!this.isDisabled(track)}
                isLoaded={isLoaded(track.id)}
              >
                {this.renderIcon(track)}

                <Infos>
                  <Title>{track.name}</Title>
                  {this.renderArtist(track)}
                </Infos>

                {this.renderDuration(track)}
              </StyledButton>
            </li>
          );
        })}
      </ul>
    );
  }
}

const mapState = (state: State) => ({
  isLoaded: selectIsLoaded(state),
  isPlaying: selectIsPlaying(state)
});

const mapDispatch = {
  loadTrack,
  toggle
};

export default connect(
  mapState,
  mapDispatch
)(Tracks);
