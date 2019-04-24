import React, { Component } from "react";
import styled from "../../styles/styled";
import { TrackState, Times } from "../../reducers/player";
import { IconType } from "../Icon";
import RoundButton from "../RoundButton";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;

const MainButton = styled(RoundButton)`
  transform: scale(1.25);
`;

interface Props {
  state: TrackState;
  times: Times;
  onPlay: () => void;
  onPause: () => void;
}

class Controls extends Component<Props> {
  handleToggleClick = () => {
    const { state, onPlay, onPause } = this.props;

    if (state === TrackState.isPlaying) {
      onPause();
    } else if (state === TrackState.isPaused) {
      onPlay();
    }
  };

  render() {
    const { state } = this.props;

    return (
      <Wrapper>
        <RoundButton disabled={true} iconType={IconType.SkipPrevious} />

        <MainButton
          onClick={this.handleToggleClick}
          disabled={state === TrackState.None}
          iconType={
            state === TrackState.isPlaying ? IconType.Pause : IconType.PlayArrow
          }
        />

        <RoundButton disabled={true} iconType={IconType.SkipNext} />
      </Wrapper>
    );
  }
}

export default Controls;
