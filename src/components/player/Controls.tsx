import React, { Component } from "react";
import styled from "../../styles/styled";
import { TrackState, Times } from "../../reducers/player";
import Icon, { IconType } from "../Icon";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;

const RoundButton = styled.button`
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

const MainButton = styled(RoundButton)`
  transform: scale(1.25);
`;

const StyledIcon = styled(Icon)`
  font-size: 25px;
`;

interface Props {
  state: TrackState;
  times: Times;
  playCurrent: () => void;
  pauseCurrent: () => void;
}

class Controls extends Component<Props> {
  handleToggleClick = () => {
    const { state, playCurrent, pauseCurrent } = this.props;

    if (state === TrackState.isPlaying) {
      pauseCurrent();
    } else if (state === TrackState.isPaused) {
      playCurrent();
    }
  };

  render() {
    const { state, times } = this.props;

    return (
      <Wrapper>
        <RoundButton disabled={true}>
          <StyledIcon type={IconType.SkipPrevious} />
        </RoundButton>

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

        <RoundButton disabled={true}>
          <StyledIcon type={IconType.SkipNext} />
        </RoundButton>
      </Wrapper>
    );
  }
}

export default Controls;
