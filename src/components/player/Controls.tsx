import React from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { State } from "../../reducers";
import { IconType, RoundButton, ToggleButton } from "../core";
import {
  selectCanNext,
  selectCanPrevious,
  selectCanPlayPause,
  selectIsLooped,
  selectIsPlaying,
  selectIsShuffled
} from "../../reducers/player";
import {
  next,
  previous,
  toggleLoop,
  playPause,
  toggleShuffle
} from "../../actions/player";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;

const ShuffleButton = styled(ToggleButton).attrs(() => ({
  iconType: IconType.Shuffle
}))``;

const PreviousButton = styled(RoundButton).attrs(() => ({
  iconType: IconType.SkipPrevious
}))``;

interface PlayButtonProps {
  isPlaying: boolean;
}

const PlayButton = styled(RoundButton).attrs<
  PlayButtonProps,
  { iconType: IconType }
>(({ isPlaying }) => ({
  iconType: isPlaying ? IconType.Pause : IconType.PlayArrow
}))<PlayButtonProps>`
  transform: scale(1.25);
`;

const NextButton = styled(RoundButton).attrs(() => ({
  iconType: IconType.SkipNext
}))``;

const LoopButton = styled(ToggleButton).attrs(() => ({
  iconType: IconType.Loop
}))``;

interface Props {
  isPlaying: boolean;
  isShuffled: boolean;
  canPrevious: boolean;
  canPlayPause: boolean;
  canNext: boolean;
  isLooped: boolean;
  toggleShuffle: () => void;
  previous: () => void;
  playPause: () => void;
  next: () => void;
  toggleLoop: () => void;
}

function Controls({
  isPlaying,
  isShuffled,
  canPrevious,
  canPlayPause,
  canNext,
  isLooped,
  toggleShuffle,
  previous,
  playPause,
  next,
  toggleLoop
}: Props) {
  return (
    <Wrapper>
      <ShuffleButton onClick={toggleShuffle} isToggled={isShuffled} />
      <PreviousButton disabled={!canPrevious} onClick={previous} />

      <PlayButton
        disabled={!canPlayPause}
        onClick={playPause}
        isPlaying={isPlaying}
      />

      <NextButton disabled={!canNext} onClick={next} />
      <LoopButton onClick={toggleLoop} isToggled={isLooped} />
    </Wrapper>
  );
}

const mapState = (state: State) => ({
  isPlaying: selectIsPlaying(state),
  isShuffled: selectIsShuffled(state),
  canPrevious: selectCanPrevious(state),
  canPlayPause: selectCanPlayPause(state),
  canNext: selectCanNext(state),
  isLooped: selectIsLooped(state)
});

const mapDispatch = {
  toggleShuffle,
  previous,
  playPause,
  next,
  toggleLoop
};

export default connect(
  mapState,
  mapDispatch
)(Controls);
