import React, { Component } from "react";
import styled from "../../styles/styled";

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

const ProgressBar = styled.div<{ progress: number }>`
  background: ${props => props.theme.foreground.dark};
  border-radius: 5px;
  flex-grow: 1;
  height: 2.5px;
  margin: 0 10px;
  position: relative;

  &::before {
    background: ${props => props.theme.primaryLight};
    border-radius: 5px;
    content: "";
    height: 100%;
    position: absolute;
    width: ${props => props.progress * 100}%;

    transition: width 0.2s;
  }
`;

interface Props {
  duration: number;
  elapsed: number;
  remaining: number;
}

class Progress extends Component<Props> {
  renderTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.round(seconds);

    return (
      <ProgressTime>
        {`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`}
      </ProgressTime>
    );
  }

  render() {
    const { duration, elapsed, remaining } = this.props;
    const progress = elapsed / duration;

    return (
      <Wrapper>
        {this.renderTime(elapsed)}
        <ProgressBar progress={progress} />
        {this.renderTime(remaining)}
      </Wrapper>
    );
  }
}

export default Progress;
