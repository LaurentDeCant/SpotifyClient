import React from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { seek } from "../../actions/player";
import { State } from "../../reducers";
import { Times, selectTimes, selectCanSeek } from "../../selectors/player";
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
  times: Times;
  canSeek: boolean;
  seek: (time: number) => void;
}

function Playback({ times, canSeek, seek }: Props) {
  const { duration, currentTime } = times;
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
    seek(duration * value);
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

const mapState = (state: State) => ({
  times: selectTimes(state),
  canSeek: selectCanSeek(state)
});

const mapDispatch = {
  seek
};

export default connect(
  mapState,
  mapDispatch
)(Playback);
