import React from "react";
import styled from "../../styles/styled";
import Slider from "./Slider";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-cotent: center;
  width: 100%;
`;

const ProgressTime = styled.div`
  color: ${props => props.theme.onBackground.secondary};
  font-size: ${props => props.theme.fontSize.small}px;
  font-weight: ${props => props.theme.fontWeight.light};
`;

interface Props {
  duration: number;
  currentTime: number;
  canSeek: boolean;
  onSeek: (time: number) => void;
}

function Playback({ duration, currentTime, canSeek, onSeek }: Props) {
  function renderTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.round(seconds);

    return (
      <ProgressTime>
        {`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`}
      </ProgressTime>
    );
  }

  function handleChange(value: number) {
    onSeek(duration * value);
  }

  const progress = duration ? currentTime / duration : 0;

  return (
    <Wrapper>
      {renderTime(currentTime)}
      <Slider value={progress} onChange={handleChange} canChange={canSeek} />
      {renderTime(duration)}
    </Wrapper>
  );
}

export default Playback;
