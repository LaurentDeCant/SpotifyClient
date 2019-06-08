import React from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { Artist, Track } from "../../types";
import { toggleSavedTrack } from "../../actions/library";
import { State } from "../../reducers";
import { selectIsLoaded, selectIsPlaying } from "../../reducers/player";
import { selectTrackArtists } from "../../reducers/tracks";
import { getArtistNames } from "../../utils";
import { Icon, IconType, RoundButton, Text, ToggleButton } from "../core";

const Wrapper = styled.li<{ isLoaded: boolean }>`
  align-items: center;
  border-radius: 40px;
  box-sizing: border-box;
  ${props => props.isLoaded && "color: " + props.theme.color.primary};
  display: flex;
  margin-bottom: ${props => props.theme.thickness.extraSmall}px;
  padding: ${props => props.theme.thickness.small}px 0;
  width: 100%;

  &:last-child {
    margin-bottom: 0;
  }
`;

interface PlayButtonProps {
  isLoaded: boolean;
  isPlaying: Boolean;
}

const PlayButton = styled(RoundButton).attrs<
  PlayButtonProps,
  { iconType: IconType }
>(({ isPlaying }) => ({
  iconType: isPlaying ? IconType.Pause : IconType.PlayArrow
}))<PlayButtonProps>`
  ${props => props.isLoaded && `color: ${props.theme.color.primary}`}
  flex-shrink: 0;
  margin-right: ${props => props.theme.thickness.small}px;

  &&:hover {
    ${props => props.isLoaded && `color: ${props.theme.color.primary}`}
  }
`;

const NoMusicIcon = styled(Icon).attrs(() => ({
  type: IconType.MusicOff
}))`
  color: ${props => props.theme.color.error};
  flex-shrink: 0;
  margin-right: ${props => props.theme.thickness.small}px;
  text-align: center;
  width: ${props => props.theme.thickness.large}px;
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

const FavoriteButton = styled(ToggleButton).attrs(() => ({
  iconType: IconType.Favorite
}))`
  flex-shrink: 0;
`;

interface OwnProps {
  track: Track;
  onTogglePlay: (trackId: string) => void;
}

interface Props extends OwnProps {
  artists: Artist[];
  isDisabled: boolean;
  isLoaded: boolean;
  isPlaying: boolean;
  toggleSavedTrack: (trackId: string) => void;
}

function TrackItem({
  track,
  artists,
  isDisabled,
  isLoaded,
  isPlaying,
  onTogglePlay,
  toggleSavedTrack
}: Props) {
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
    onTogglePlay(track.id);
  }

  function handleToggleFavorite() {
    toggleSavedTrack(track.id);
  }

  return (
    <Wrapper isLoaded={isLoaded}>
      {isDisabled ? (
        <NoMusicIcon />
      ) : (
        <PlayButton
          isLoaded={isLoaded}
          isPlaying={isPlaying}
          onClick={handleClick}
        />
      )}

      <Infos>
        <Title>{track.name}</Title>
        {renderArtist()}
      </Infos>

      {renderDuration()}

      <FavoriteButton
        isToggled={track.isSaved}
        onClick={handleToggleFavorite}
      />
    </Wrapper>
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

const mapDispatch = {
  toggleSavedTrack
};

export default connect(
  mapState,
  mapDispatch
)(TrackItem);
