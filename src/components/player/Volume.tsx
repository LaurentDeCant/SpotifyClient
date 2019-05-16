import React from "react";
import styled from "../../styles/styled";
import { IconType, RoundButton } from "../core";
import Slider from "./Slider";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
`;

const StyledButton = styled(RoundButton)`
  margin: 0;
`;

const StyledSlider = styled(Slider)`
  width: 100px;
`;

interface Props {
  volume: number;
  isMuted: boolean;
  onChange: (volume: number, isMuted: boolean) => void;
}

function Volume({ volume, isMuted, onChange }: Props) {
  function handleClick() {
    onChange(volume, !isMuted);
  }

  function handleChange(value: number) {
    onChange(value, false);
  }

  return (
    <Wrapper>
      <StyledButton
        onClick={handleClick}
        iconType={isMuted ? IconType.VolumeOff : IconType.VolumeUp}
      />
      <StyledSlider value={isMuted ? 0 : volume} onChange={handleChange} />
    </Wrapper>
  );
}

export default Volume;
