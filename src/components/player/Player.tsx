import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { State } from "../../reducers";
import {
  TrackState,
  selectState,
  Times,
  selectTimes
} from "../../reducers/player";
import { playCurrent, pauseCurrent } from "../../actions/player";
import Icon, { IconType } from "../Icon";
import Audio from "./Audio";

const Wrapper = styled.div`
  align-items: center;
  background: ${props => props.theme.background.light};
  box-sizing: border-box;
  box-shadow: 0 -2px 4px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: space-between;
  padding: 20px;
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
`;

const StyledButton = styled.button`
  border-radius: 50%;
  color: ${props => props.theme.foreground.dark};
  display: flex;
  margin: 0 10px;
  padding: 5px;
  position: relative;

  &:not(:disabled):hover {
    background: ${props => props.theme.background.hover};
    color: ${props => props.theme.foreground.default};
  }

  &:not(:disabled):active {
    background: ${props => props.theme.background.active};
  }
`;

const MainButton = styled(StyledButton)`
  transform: scale(1.25);
`;

const StyledIcon = styled(Icon)`
  font-size: 25px;
`;

const Progress = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-cotent: center;
  width: 50%;
`;

const ProgressTime = styled.div`
  color: ${props => props.theme.foreground.dark};
  font-size: ${props => props.theme.font.size.small};
  font-weight: ${props => props.theme.font.weight.light};
`;

const ProgressBar = styled.div`
  background: ${props => props.theme.foreground.dark};
  border-radius: 5px;
  flex-grow: 1;
  height: 2.5px;
  margin: 0 10px;
  position: relative;

  &::before {
    background: ${props => props.theme.foreground.default};
    border-radius: 5px;
    content: "";
    height: 100%;
    position: absolute;
    width: ${(props: { progress: number }) => props.progress * 100}%;

    transition: width 0.2s;
  }
`;

interface Props {
  state: TrackState;
  times: Times;
  playCurrent: () => void;
  pauseCurrent: () => void;
}

class Player extends Component<Props> {
  handleToggleClick = () => {
    const { state, playCurrent, pauseCurrent } = this.props;

    if (state === TrackState.isPlaying) {
      pauseCurrent();
    } else if (state === TrackState.isPaused) {
      playCurrent();
    }
  };

  renderTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.round(seconds);

    return (
      <ProgressTime>
        {`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`}
      </ProgressTime>
    );
  }

  render() {
    const {
      state,
      times: { duration, elapsed, remaining }
    } = this.props;
    const progress = elapsed / duration;

    return (
      <Wrapper>
        <Controls>
          <StyledButton disabled={true}>
            <StyledIcon type={IconType.SkipPrevious} />
          </StyledButton>

          <MainButton
            onClick={this.handleToggleClick}
            disabled={state === TrackState.None}
          >
            <StyledIcon
              type={
                state === TrackState.isPlaying
                  ? IconType.Pause
                  : IconType.PlayArrow
              }
            />
          </MainButton>

          <StyledButton disabled={true}>
            <StyledIcon type={IconType.SkipNext} />
          </StyledButton>
        </Controls>

        <Progress>
          {this.renderTime(elapsed)}
          <ProgressBar progress={progress} />
          {this.renderTime(remaining)}
        </Progress>

        <Audio />
      </Wrapper>
    );
  }
}

const mapState = (state: State) => ({
  state: selectState(state),
  times: selectTimes(state)
});

const mapDispatch = {
  playCurrent: playCurrent,
  pauseCurrent: pauseCurrent
};

export default connect(
  mapState,
  mapDispatch
)(Player);
