import React from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { Album, Artist, Track } from "../../types";
import { toggleSavedTrack } from "../../actions/library";
import { State } from "../../reducers";
import { selectIsLoaded, selectIsPlaying } from "../../reducers/player";
import { selectTrackArtists, selectTrackAlbum } from "../../reducers/tracks";
import { Icon, IconType, RoundButton, Text, ToggleButton } from "../core";
import ArtistNames from "./ArtistNames";
import AlbumName from "./AlbumName";

const Wrapper = styled.li<{ isLoaded: boolean }>`
  align-items: center;
  border-radius: 40px;
  box-sizing: border-box;
  ${props => props.isLoaded && "color: " + props.theme.color.primary};
  display: flex;
  margin-bottom: ${props => props.theme.thickness.medium}px;
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

const MusicIcon = styled(Icon).attrs(() => ({
  type: IconType.MusicNote
}))`
  flex-shrink: 0;
  margin-right: ${props => props.theme.thickness.small}px;
  text-align: center;
  width: ${props => props.theme.thickness.large}px;
`;

const NoMusicIcon = styled(MusicIcon).attrs(() => ({
  type: IconType.MusicOff
}))`
  color: ${props => props.theme.color.error};
`;

const Names = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-weight: ${props => props.theme.fontWeight.light};
  height: 100%;
  margin-right: ${props => props.theme.thickness.small}px;
  overflow: hidden;
`;

const Name = styled(Text)`
  font-weight: ${props => props.theme.fontWeight.normal};
  margin-bottom: ${props => props.theme.thickness.extraSmall}px;
  text-align: left;
`;

const Others = styled.div`
  display: flex;
  flex-direction: row;
`;

const Separator = styled.span.attrs(() => ({
  children: "-"
}))`
  color: ${props => props.theme.foreground.dark};
  margin: 0 ${props => props.theme.thickness.extraSmall}px;
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
  onTogglePlay?: (trackId: string) => void;
}

interface Props extends OwnProps {
  album?: Album;
  artists: Artist[];
  isDisabled: boolean;
  isLoaded: boolean;
  isPlaying: boolean;
  toggleSavedTrack: (trackId: string) => void;
}

function TrackItem({
  album,
  track,
  artists,
  isDisabled,
  isLoaded,
  isPlaying,
  onTogglePlay,
  toggleSavedTrack
}: Props) {
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
    if (onTogglePlay) {
      onTogglePlay(track.id);
    }
  }

  function handleToggleFavorite() {
    toggleSavedTrack(track.id);
  }

  return (
    <Wrapper isLoaded={isLoaded}>
      {onTogglePlay ? (
        isDisabled ? (
          <NoMusicIcon />
        ) : (
          <PlayButton
            isLoaded={isLoaded}
            isPlaying={isPlaying}
            onClick={handleClick}
          />
        )
      ) : (
        <MusicIcon />
      )}

      <Names>
        <Name>{track.name}</Name>
        <Others>
          <ArtistNames artists={artists} />
          <Separator />
          {album && <AlbumName album={album} />}
        </Others>
      </Names>

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
  album: selectTrackAlbum(state, track.id),
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
