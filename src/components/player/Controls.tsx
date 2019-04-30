import React, { Component } from "react";
import styled from "../../styles/styled";
import { PlayerState, Times } from "../../reducers/player";
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
  playerState: PlayerState;
  times: Times;
  onToggle: () => void;
}

class Controls extends Component<Props> {
  handleToggleClick = () => {
    this.props.onToggle();
  };

  render() {
    const { playerState } = this.props;

    return (
      <Wrapper>
        <RoundButton disabled={true} iconType={IconType.SkipPrevious} />

        <MainButton
          onClick={this.handleToggleClick}
          disabled={playerState === PlayerState.None}
          iconType={
            playerState === PlayerState.isPlaying
              ? IconType.Pause
              : IconType.PlayArrow
          }
        />

        <RoundButton disabled={true} iconType={IconType.SkipNext} />
      </Wrapper>
    );
  }
}

export default Controls;
