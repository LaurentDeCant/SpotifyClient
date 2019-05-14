import React from "react";
import styled from "../../styles/styled";
import { IconType, RoundButton } from "../core";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;

const MainButton = styled(RoundButton)`
  transform: scale(1.5);
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

function Controls({
  canPrevious,
  onPrevious,
  isPlaying,
  canToggle,
  onToggle,
  canNext,
  onNext
}: Props) {
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

export default Controls;
