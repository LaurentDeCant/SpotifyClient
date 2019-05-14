import React from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import {
  DenormalizedArtist as Artist,
  DenormalizedTrack as TrackObject
} from "../../types";
import { getArtistNames } from "../../utils";
import { State } from "../../reducers";
import { selectIsLoaded, selectIsPlaying } from "../../reducers/player";
import { Icon, IconType, Text } from "../core";
import ButtonBase from "../core/ButtonBase";
import { selectTrackArtists } from "../../reducers/tracks";

const StyledButton = styled(ButtonBase)<{ isLoaded: boolean }>`
  align-items: center;
  border-radius: 40px;
  ${props => props.isLoaded && "color: " + props.theme.primaryLight};
  display: flex;
  padding: 12.5px 25px;
  width: 100%;

  &:disabled {
    color: ${props => props.theme.foreground.default};
  }

  &&:hover {
    ${props => props.isLoaded && "color: " + props.theme.primaryLight};
  }
`;

const StyledIcon = styled(Icon)<{
  isLoaded?: boolean;
  isHover?: boolean;
}>`
  color: ${props =>
    props.isLoaded ? props.theme.primaryLight : props.theme.foreground.dark};
  display: ${props => (props.isHover ? "none" : "block")};
  margin-right: 12.5px;

  ${StyledButton}:not(:disabled):hover & {
    color: ${props =>
      props.isLoaded
        ? props.theme.primaryLight
        : props.theme.foreground.default};
    display: ${props => (props.isHover ? "block" : "none")};
  }
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-weight: ${props => props.theme.font.weight.light};
  height: 100%;
  margin-right: 12.5px;
  overflow: hidden;
`;

const Title = styled(Text)`
  font-weight: ${props => props.theme.font.weight.normal}
  margin-bottom: 6.25px;
  text-align: left;
`;

const SubTitle = styled(Text)`
  color: ${props => props.theme.foreground.dark};
  text-align: left;
`;

const Duration = styled.span`
  color: ${props => props.theme.foreground.dark};
  flex-shrink: 0;
`;

interface OwnProps {
  track: TrackObject;
  onToggle: (trackId: string) => void;
}

interface Props extends OwnProps {
  artists: Artist[];
  isDisabled: boolean;
  isLoaded: boolean;
  isPlaying: boolean;
}

function Track({
  track,
  artists,
  isDisabled,
  isLoaded,
  isPlaying,
  onToggle
}: Props) {
  console.log("Track");

  function renderIcon() {
    return isDisabled ? (
      <StyledIcon type={IconType.MusicOff} />
    ) : (
      <>
        <StyledIcon
          type={isPlaying ? IconType.VolumeUp : IconType.MusicNote}
          isLoaded={isLoaded}
          isHover={false}
        />
        <StyledIcon
          type={isPlaying ? IconType.Pause : IconType.PlayArrow}
          isLoaded={isLoaded}
          isHover={true}
        />
      </>
    );
  }

  function renderArtist() {
    return <SubTitle>{getArtistNames(artists)}</SubTitle>;
  }

  function renderDuration() {
    let seconds = track.duration_ms / 1000;
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    return (
      <Duration>{`${minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`}</Duration>
    );
  }

  function handleClick() {
    onToggle(track.id);
  }

  return (
    <StyledButton
      onClick={handleClick}
      disabled={isDisabled}
      isLoaded={isLoaded}
    >
      {renderIcon()}

      <Infos>
        <Title>{track.name}</Title>
        {renderArtist()}
      </Infos>

      {renderDuration()}
    </StyledButton>
  );
}

function isDisabled(track: TrackObject) {
  return !track.preview_url;
}

const mapState = (state: State, { track }: OwnProps) => ({
  artists: selectTrackArtists(state, track.id),
  isDisabled: isDisabled(track),
  isLoaded: selectIsLoaded(state)(track.id),
  isPlaying: selectIsPlaying(state)(track.id)
});

export default connect(
  mapState,
  null
)(Track);
