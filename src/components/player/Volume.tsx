import React from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { changeVolume } from "../../actions/player";
import { State } from "../../reducers";
import { selectVolume, selectIsMuted } from "../../reducers/player";
import { IconType, RoundButton } from "../core";
import Slider from "./Slider";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
`;

const QueueButton = styled(RoundButton).attrs(() => ({
  iconType: IconType.PlaylistPlay
}))`
  margin: 6.25px;
`;

interface VolumeButtonProps {
  isMuted: boolean;
}

const VolumeButton = styled(RoundButton).attrs<
  VolumeButtonProps,
  { iconType: IconType }
>(({ isMuted }) => ({
  iconType: isMuted ? IconType.VolumeOff : IconType.VolumeUp
}))<VolumeButtonProps>`
  margin: 0;
`;

const StyledSlider = styled(Slider)`
  width: 100px;
`;

interface Props {
  volume: number;
  isMuted: boolean;
  changeVolume: (volume: number, isMuted: boolean) => void;
}

function Volume({ volume, isMuted, changeVolume }: Props) {
  function handleClick() {
    changeVolume(volume, !isMuted);
  }

  function handleChange(value: number) {
    changeVolume(value, false);
  }

  return (
    <Wrapper>
      <QueueButton />
      <VolumeButton isMuted={isMuted || !volume} onClick={handleClick} />
      <StyledSlider value={isMuted ? 0 : volume} onChange={handleChange} />
    </Wrapper>
  );
}

const mapState = (state: State) => ({
  volume: selectVolume(state),
  isMuted: selectIsMuted(state)
});

const mapDispatch = {
  changeVolume
};

export default connect(
  mapState,
  mapDispatch
)(Volume);
