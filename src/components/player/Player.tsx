import React from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { DenormalizedTrack as Track } from "../../types";
import { State } from "../../reducers";
import {
  selectLoadedTrack,
  selectIsPlaying,
  selectCanToggle,
  Times,
  selectTimes,
  selectCanSeek,
  selectCanNext,
  selectCanPrevious,
  VolumeLevels,
  selectVolumeLevels
} from "../../reducers/player";
import {
  toggle,
  seek,
  next,
  previous,
  changeVolume
} from "../../actions/player";
import Album from "./Album";
import Audio from "./Audio";
import Controls from "./Controls";
import Playback from "./Playback";
import Volume from "./Volume";

const Wrapper = styled.div`
  align-items: center;
  background: ${props => props.theme.background.light};
  box-sizing: border-box;
  box-shadow: 0 -2px 4px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  height: 100px;
  padding: 15px;
`;

const ThirdWrapper = styled.div`
  height: 100%;
  width: 33%;
`;

const LeftWrapper = styled(ThirdWrapper)``;

const CenterWrapper = styled(ThirdWrapper)`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-evenly;
`;

const RightWrapper = styled(ThirdWrapper)`
  display: flex;
  justify-content: flex-end;
`;

interface Props {
  className?: string;
  loadedTrack?: Track;
  isPlaying: () => boolean;
  times: Times;
  canToggle: boolean;
  canSeek: boolean;
  canNext: boolean;
  canPrevious: boolean;
  volumeLevels: VolumeLevels;
  toggle: () => void;
  seek: (time: number) => void;
  next: () => void;
  previous: () => void;
  changeVolume: (volume: number, isMuted: boolean) => void;
}

function Player({
  className,
  loadedTrack,
  isPlaying,
  times,
  canToggle,
  canSeek,
  canNext,
  canPrevious,
  volumeLevels,
  toggle,
  seek,
  next,
  previous,
  changeVolume
}: Props) {
  function handleToggle() {
    toggle();
  }

  const album = loadedTrack && loadedTrack.album;

  return (
    <Wrapper className={className}>
      <LeftWrapper>
        {album && (
          <Album
            image={album.images[0].url}
            name={album.name}
            artist={album.artists[0].name}
          />
        )}
      </LeftWrapper>

      <CenterWrapper>
        <Controls
          isPlaying={isPlaying()}
          canToggle={canToggle}
          onToggle={handleToggle}
          canNext={canNext}
          onNext={next}
          canPrevious={canPrevious}
          onPrevious={previous}
        />
        <Playback
          duration={times.duration}
          currentTime={times.currentTime}
          canSeek={canSeek}
          onSeek={seek}
        />
      </CenterWrapper>

      <RightWrapper>
        <Volume
          volume={volumeLevels.volume}
          isMuted={volumeLevels.isMuted}
          onChange={changeVolume}
        />
      </RightWrapper>

      <Audio />
    </Wrapper>
  );
}

const mapState = (state: State) => ({
  loadedTrack: selectLoadedTrack(state),
  isPlaying: selectIsPlaying(state),
  times: selectTimes(state),
  canToggle: selectCanToggle(state),
  canSeek: selectCanSeek(state),
  canNext: selectCanNext(state),
  canPrevious: selectCanPrevious(state),
  volumeLevels: selectVolumeLevels(state)
});

const mapDispatch = {
  toggle,
  seek,
  next,
  previous,
  changeVolume
};

export default connect(
  mapState,
  mapDispatch
)(Player);
