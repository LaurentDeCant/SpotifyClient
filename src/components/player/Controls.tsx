import React, { Component } from "react";
import styled from "../../styles/styled";
import { Times } from "../../reducers/player";
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
  isPlaying: boolean;
  canToggle: boolean;
  canNext: boolean;
  canPrevious: boolean;
  onToggle: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

class Controls extends Component<Props> {
  render() {
    const {
      canPrevious,
      onPrevious,
      isPlaying,
      canToggle,
      onToggle,
      canNext,
      onNext
    } = this.props;

    return (
      <Wrapper>
        <RoundButton
          disabled={!canPrevious}
          onClick={onPrevious}
          iconType={IconType.SkipPrevious}
        />

        <MainButton
          disabled={!canToggle}
          onClick={onToggle}
          iconType={isPlaying ? IconType.Pause : IconType.PlayArrow}
        />

        <RoundButton
          disabled={!canNext}
          onClick={onNext}
          iconType={IconType.SkipNext}
        />
      </Wrapper>
    );
  }
}

export default Controls;
