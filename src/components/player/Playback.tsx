import React, { Component } from "react";
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
  color: ${props => props.theme.foreground.dark};
  font-size: ${props => props.theme.font.size.small};
  font-weight: ${props => props.theme.font.weight.light};
`;

const StyledSlider = styled(Slider)`
  margin: 0 15px;
`;

interface Props {
  duration: number;
  currentTime: number;
  canSeek: boolean;
  onSeek: (time: number) => void;
}

class Playback extends Component<Props> {
  renderTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.round(seconds);

    return (
      <ProgressTime>
        {`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`}
      </ProgressTime>
    );
  }

  handleChange = (value: number) => {
    const { duration, onSeek } = this.props;
    onSeek(duration * value);
  };

  render() {
    const { duration, currentTime, canSeek } = this.props;
    const progress = duration ? currentTime / duration : 0;

    return (
      <Wrapper>
        {this.renderTime(currentTime)}
        <StyledSlider
          value={progress}
          onChange={this.handleChange}
          canChange={canSeek}
        />
        {this.renderTime(duration)}
      </Wrapper>
    );
  }
}

export default Playback;
