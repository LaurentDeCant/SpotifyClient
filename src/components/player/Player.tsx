import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { Track } from "../../types";
import { State } from "../../reducers";
import {
  selectLoadedTrack,
  PlayerState,
  selectPlayerState,
  Times,
  selectTimes,
  VolumeLevels,
  selectVolumeLevels
} from "../../reducers/player";
import { toggle, seek, changeVolume } from "../../actions/player";
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
  loadedTrack?: Track;
  playerState: PlayerState;
  times: Times;
  volumeLevels: VolumeLevels;
  toggle: () => void;
  seek: (time: number) => void;
  changeVolume: (volume: number, isMuted: boolean) => void;
}

class Player extends Component<Props> {
  canSeek() {
    const { playerState } = this.props;
    return playerState !== PlayerState.None;
  }

  render() {
    const {
      loadedTrack,
      playerState,
      times,
      volumeLevels,
      toggle,
      seek,
      changeVolume
    } = this.props;
    const album = loadedTrack && loadedTrack.album;
    const canSeek = this.canSeek();

    return (
      <>
        <Wrapper>
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
              playerState={playerState}
              times={times}
              onToggle={toggle}
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
        </Wrapper>

        <Audio />
      </>
    );
  }
}

const mapState = (state: State) => ({
  loadedTrack: selectLoadedTrack(state),
  playerState: selectPlayerState(state),
  times: selectTimes(state),
  volumeLevels: selectVolumeLevels(state)
});

const mapDispatch = {
  toggle,
  seek,
  changeVolume
};

export default connect(
  mapState,
  mapDispatch
)(Player);
