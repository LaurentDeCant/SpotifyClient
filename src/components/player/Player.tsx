import React, { HTMLAttributes } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { Album } from "../../types";
import { State } from "../../reducers";
import {
  selectTrackAlbum,
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
import AlbumInfos from "./AlbumInfos";
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
  padding: 25px;
  z-index: 2;
`;

const ThirdWrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breackpoints.extraSmall}px) {
    width: 33.33%;
  }
`;

const LeftWrapper = styled(ThirdWrapper)`
  display: none;

  @media (min-width: ${({ theme }) => theme.breackpoints.extraSmall}px) {
    display: block;
  }

  @media (min-width: ${({ theme }) => theme.breackpoints.small}px) {
    width: 25%;
  }
`;

const CenterWrapper = styled(ThirdWrapper)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breackpoints.small}px) {
    width: 50%;
  }
`;

const RightWrapper = styled(ThirdWrapper)`
  display: none;
  justify-content: flex-end;

  @media (min-width: ${({ theme }) => theme.breackpoints.extraSmall}px) {
    display: flex;
  }

  @media (min-width: ${({ theme }) => theme.breackpoints.small}px) {
    width: 25%;
  }
`;

interface Props {
  album?: Album;
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
  album,
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
}: Props & HTMLAttributes<HTMLElement>) {
  function handleToggle() {
    toggle();
  }

  return (
    <Wrapper className={className}>
      <LeftWrapper>{album && <AlbumInfos album={album} />}</LeftWrapper>

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
  album: selectTrackAlbum(state),
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
