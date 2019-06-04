import React from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { Artist, Track } from "../../types";
import { getArtistNames } from "../../utils";
import { State } from "../../reducers";
import { selectIsLoaded, selectIsPlaying } from "../../reducers/player";
import { Icon, IconType, RoundButton, Text } from "../core";
import ButtonBase from "../core/ButtonBase";
import { selectTrackArtists } from "../../reducers/tracks";

const StyledButton = styled(ButtonBase)<{ isLoaded: boolean }>`
  align-items: center;
  border-radius: 40px;
  ${props => props.isLoaded && "color: " + props.theme.primaryLight};
  display: flex;
  padding: ${props => props.theme.thickness.small}px
    ${props => props.theme.thickness.medium}px;
  width: 100%;

  &:disabled {
    color: ${props => props.theme.foreground.default};
  }

  &&:hover {
    ${props => props.isLoaded && "color: " + props.theme.primaryLight};
  }
`;

const StyledIcon = styled(Icon)<{ isLoaded?: boolean; isHover?: boolean }>`
  color: ${props =>
    props.isLoaded ? props.theme.primaryLight : props.theme.foreground.dark};
  display: ${props => (props.isHover ? "none" : "block")};
  margin-right: ${props => props.theme.thickness.small}px;

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
  font-weight: ${props => props.theme.fontWeight.light};
  height: 100%;
  margin-right: ${props => props.theme.thickness.small}px;
  overflow: hidden;
`;

const Title = styled(Text)`
  font-weight: ${props => props.theme.fontWeight.normal};
  margin-bottom: ${props => props.theme.thickness.extraSmall}px;
  text-align: left;
`;

const SubTitle = styled(Text)`
  color: ${props => props.theme.foreground.dark};
  text-align: left;
`;

const Duration = styled.span`
  color: ${props => props.theme.foreground.dark};
  flex-shrink: 0;
  margin-right: ${props => props.theme.thickness.small}px;
`;

const FavoriteButton = styled(RoundButton).attrs(() => ({
  iconType: IconType.Favorite
}))``;

interface OwnProps {
  track: Track;
  onToggle: (trackId: string) => void;
}

interface Props extends OwnProps {
  artists: Artist[];
  isDisabled: boolean;
  isLoaded: boolean;
  isPlaying: boolean;
}

function TrackItem({
  track,
  artists,
  isDisabled,
  isLoaded,
  isPlaying,
  onToggle
}: Props) {
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

      <FavoriteButton />
    </StyledButton>
  );
}

function isDisabled(track: Track) {
  return !track.preview_url;
}

const mapState = (state: State, { track }: OwnProps) => ({
  artists: selectTrackArtists(state, track.id),
  isDisabled: isDisabled(track),
  isLoaded: selectIsLoaded(state)(track.id),
  isPlaying: selectIsPlaying(state, track.id)
});

export default connect(
  mapState,
  null
)(TrackItem);
