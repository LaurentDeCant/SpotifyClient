import React from "react";
import styled from "../../styles/styled";
import { DenormalizedTrack as TrackObject } from "../../types";
import { joinArtistNames } from "../../utils";
import { Button, Icon, IconType, Text } from "../core";

const StyledButton = styled(Button)<{ isLoaded: boolean }>`
  align-items: center;
  border-radius: 40px;
  ${props => props.isLoaded && "color: " + props.theme.primaryLight};
  display: flex;
  margin-bottom: 5px;
  padding: 10px 20px;
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
  margin-right: 15px;

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
  margin-right: 15px;
  overflow: hidden;
`;

const Title = styled(Text)`
  font-weight: ${props => props.theme.font.weight.normal}
  margin-bottom: 5px;
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

interface Props {
  track: TrackObject;
  isDisabled: boolean;
  isLoaded: boolean;
  isPlaying: boolean;
  onToggle: (trackId: string) => void;
}

function Track({ track, isDisabled, isLoaded, isPlaying, onToggle }: Props) {
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

  function renderArtist(track: TrackObject) {
    return <SubTitle>{joinArtistNames(track.artists)}</SubTitle>;
  }

  function renderDuration(track: TrackObject) {
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
        {renderArtist(track)}
      </Infos>

      {renderDuration(track)}
    </StyledButton>
  );
}

export default Track;
