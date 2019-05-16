import React from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { State } from "../../reducers";
import { IconType, RoundButton, ToggleButton } from "../core";
import {
  selectCanNext,
  selectCanPrevious,
  selectCanTogglePlay,
  selectIsLooped,
  selectIsPlaying,
  selectIsShuffled
} from "../../reducers/player";
import {
  next,
  previous,
  toggleLoop,
  togglePlay,
  toggleShuffle
} from "../../actions/player";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;

const MainButton = styled(RoundButton)`
  transform: scale(1.25);
`;

interface Props {
  isPlaying: boolean;
  isShuffled: boolean;
  canPrevious: boolean;
  canTogglePlay: boolean;
  canNext: boolean;
  isLooped: boolean;
  toggleShuffle: () => void;
  previous: () => void;
  togglePlay: () => void;
  next: () => void;
  toggleLoop: () => void;
}

function Controls({
  isPlaying,
  isShuffled,
  canPrevious,
  canTogglePlay,
  canNext,
  isLooped,
  toggleShuffle,
  previous,
  togglePlay,
  next,
  toggleLoop
}: Props) {
  return (
    <Wrapper>
      <ToggleButton
        iconType={IconType.Shuffle}
        onClick={toggleShuffle}
        isToggled={isShuffled}
      />

      <RoundButton
        disabled={!canPrevious}
        onClick={previous}
        iconType={IconType.SkipPrevious}
      />

      <MainButton
        disabled={!canTogglePlay}
        onClick={togglePlay}
        iconType={isPlaying ? IconType.Pause : IconType.PlayArrow}
      />

      <RoundButton
        disabled={!canNext}
        onClick={next}
        iconType={IconType.SkipNext}
      />

      <ToggleButton
        iconType={IconType.Loop}
        onClick={toggleLoop}
        isToggled={isLooped}
      />
    </Wrapper>
  );
}

const mapState = (state: State) => ({
  isPlaying: selectIsPlaying(state),
  isShuffled: selectIsShuffled(state),
  canPrevious: selectCanPrevious(state),
  canTogglePlay: selectCanTogglePlay(state),
  canNext: selectCanNext(state),
  isLooped: selectIsLooped(state)
});

const mapDispatch = {
  toggleShuffle,
  previous,
  togglePlay,
  next,
  toggleLoop
};

export default connect(
  mapState,
  mapDispatch
)(Controls);
