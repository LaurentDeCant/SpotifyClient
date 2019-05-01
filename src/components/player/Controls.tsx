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
  times: Times;
  onToggle: () => void;
}

class Controls extends Component<Props> {
  render() {
    const { isPlaying, canToggle, onToggle } = this.props;

    return (
      <Wrapper>
        <RoundButton disabled={true} iconType={IconType.SkipPrevious} />

        <MainButton
          onClick={onToggle}
          disabled={!canToggle}
          iconType={isPlaying ? IconType.Pause : IconType.PlayArrow}
        />

        <RoundButton disabled={true} iconType={IconType.SkipNext} />
      </Wrapper>
    );
  }
}

export default Controls;
