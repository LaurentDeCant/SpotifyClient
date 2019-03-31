import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { Track } from "../../types";
import { State } from "../../reducers";
import {
  selectCurrent,
  TrackState,
  selectState,
  Times,
  selectTimes
} from "../../reducers/player";
import { play, pause, seek } from "../../actions/player";
import Album from "./Album";
import Controls from "./Controls";
import Progress from "./Progress";
import Audio from "./Audio";

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

const CenterWrapper = styled(ThirdWrapper)`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-evenly;
`;

interface Props {
  current?: Track;
  state: TrackState;
  times: Times;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
}

class Player extends Component<Props> {
  render() {
    const { current, state, times, play, pause, seek } = this.props;
    const album = current && current.album;

    return (
      <>
        <Wrapper>
          <ThirdWrapper>
            {album && (
              <Album
                image={album.images[0].url}
                name={album.name}
                artist={album.artists[0].name}
              />
            )}
          </ThirdWrapper>

          <CenterWrapper>
            <Controls
              state={state}
              times={times}
              onPlay={play}
              onPause={pause}
            />
            <Progress
              duration={times.duration}
              currentTime={times.currentTime}
              onSeek={seek}
            />
          </CenterWrapper>

          <ThirdWrapper />
        </Wrapper>

        <Audio />
      </>
    );
  }
}

const mapState = (state: State) => ({
  current: selectCurrent(state),
  state: selectState(state),
  times: selectTimes(state)
});

const mapDispatch = {
  play: play,
  pause: pause,
  seek: seek
};

export default connect(
  mapState,
  mapDispatch
)(Player);
