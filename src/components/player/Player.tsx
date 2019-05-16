import React, { HTMLAttributes } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { Album } from "../../types";
import { State } from "../../reducers";
import {
  selectTrackAlbum,
  Times,
  selectTimes,
  selectCanSeek,
  VolumeLevels,
  selectVolumeLevels
} from "../../reducers/player";
import { seek, changeVolume } from "../../actions/player";
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
`;

const LeftWrapper = styled(ThirdWrapper)`
  display: none;

  @media (min-width: ${({ theme }) => theme.breackpoints.extraSmall}px) {
    display: block;
    width: 25%;
  }
`;

const CenterWrapper = styled(ThirdWrapper)`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: space-evenly;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breackpoints.extraSmall}px) {
    padding: 0 12.5px;
    width: 50%;
  }
`;

const RightWrapper = styled(ThirdWrapper)`
  display: none;
  justify-content: flex-end;

  @media (min-width: ${({ theme }) => theme.breackpoints.extraSmall}px) {
    display: flex;
    width: 25%;
  }
`;

interface Props {
  album?: Album;
  times: Times;
  canSeek: boolean;
  volumeLevels: VolumeLevels;
  seek: (time: number) => void;
  changeVolume: (volume: number, isMuted: boolean) => void;
}

function Player({
  className,
  album,
  times,
  canSeek,
  volumeLevels,
  seek,
  changeVolume
}: Props & HTMLAttributes<HTMLElement>) {
  return (
    <Wrapper className={className}>
      <LeftWrapper>{album && <AlbumInfos album={album} />}</LeftWrapper>

      <CenterWrapper>
        <Controls />

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
  times: selectTimes(state),
  canSeek: selectCanSeek(state),
  volumeLevels: selectVolumeLevels(state)
});

const mapDispatch = {
  seek,
  changeVolume
};

export default connect(
  mapState,
  mapDispatch
)(Player);
