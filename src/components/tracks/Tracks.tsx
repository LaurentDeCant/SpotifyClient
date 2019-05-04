import React from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { Track } from "../../types";
import { State } from "../../reducers";
import { selectIsLoaded, selectIsPlaying } from "../../reducers/player";
import { joinArtistNames } from "../../helpers/utils";
import Button from "../Button";
import Icon, { IconType } from "../Icon";
import Text from "../Text";

const StyledButton = styled(Button)<{ isLoaded: boolean }>`
  align-items: center;
  border-radius: 40px;
  color: ${props =>
    props.isLoaded ? props.theme.primaryLight : props.theme.foreground.default};
  display: flex;
  margin-bottom: 5px;
  padding: 10px 20px;
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
  margin-right: 15px;
  overflow: hidden;
`;

const Title = styled(Text)`
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
  tracks: Track[];
  isLoaded: (trackId: string) => boolean;
  isPlaying: (trackId: string) => boolean;
  onToggle: (trackId: string) => void;
}

function Tracks({ tracks, isLoaded, isPlaying, onToggle }: Props) {
  function isDisabled(track: Track) {
    return !!track.preview_url;
  }

  function renderIcon(track: Track) {
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

  function renderArtist(track: Track) {
    return <SubTitle>{joinArtistNames(track.artists)}</SubTitle>;
  }

  function renderDuration(track: Track) {
    let seconds = track.duration_ms / 1000;
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    return (
      <Duration>{`${minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`}</Duration>
    );
  }

  return (
    <ul>
      {tracks.map(track => (
        <li key={track.id}>
          <StyledButton
            onClick={() => onToggle(track.id)}
            disabled={!isDisabled(track)}
            isLoaded={isLoaded(track.id)}
          >
            {renderIcon(track)}

            <Infos>
              <Title>{track.name}</Title>
              {renderArtist(track)}
            </Infos>

            {renderDuration(track)}
          </StyledButton>
        </li>
      ))}
    </ul>
  );
}

const mapState = (state: State) => ({
  isLoaded: selectIsLoaded(state),
  isPlaying: selectIsPlaying(state)
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch
)(Tracks);
