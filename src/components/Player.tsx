import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { State } from "../reducers";
import { isPlaying } from "../reducers/player";
import { play, pause } from "../actions/player";
import Icon, { IconType } from "./Icon";

const Wrapper = styled.div`
  align-items: center;
  background: ${props => props.theme.background.light};
  box-sizing: border-box;
  box-shadow: 0 -2px 4px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: space-between;
  padding: 20px;
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
`;

const StyledButton = styled.button`
  background: transparent;
  border-radius: 50%;
  color: ${props => props.theme.foreground.dark};
  cursor: pointer;
  display: flex;
  margin: 0 10px;
  padding: 5px;
  position: relative;

  &:hover {
    background: ${props => props.theme.background.hover};
    color: ${props => props.theme.foreground.default};
  }

  &:active {
    background: ${props => props.theme.background.active};
  }
`;

const MainButton = styled(StyledButton)`
  transform: scale(1.5);
`;

const StyledIcon = styled(Icon)`
  font-size: 25px;
`;

const ProgressBar = styled.div`
  background: ${props => props.theme.foreground.dark};
  border-radius: 5px;
  height: 2.5px;
  position: relative;
  width: 50%;

  &::before {
    background: ${props => props.theme.foreground.default};
    border-radius: 5px;
    content: "";
    height: 100%;
    position: absolute;
    width: 50%;
  }
`;

const Cursor = styled.button`
  background: transparent;
  border-radius: 10px;
  cursor: pointer;
  height: 25px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  z-index: 1;

  &::before {
    background: ${props => props.theme.foreground.default};
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    content: "";
    height: 50%;
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

interface Props {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
}

class Player extends Component<Props> {
  handlePlayClick = () => {
    this.props.play();
  };

  handlePauseClick = () => {
    this.props.pause();
  };

  render() {
    const { isPlaying } = this.props;

    return (
      <Wrapper>
        <Controls>
          <StyledButton>
            <StyledIcon type={IconType.SkipPrevious} />
          </StyledButton>
          {isPlaying ? (
            <MainButton onClick={this.handlePauseClick}>
              <StyledIcon type={IconType.Pause} />
            </MainButton>
          ) : (
            <MainButton onClick={this.handlePlayClick}>
              <StyledIcon type={IconType.PlayArrow} />
            </MainButton>
          )}
          <StyledButton>
            <StyledIcon type={IconType.SkipNext} />
          </StyledButton>
        </Controls>

        <ProgressBar>
          <Cursor />
        </ProgressBar>
      </Wrapper>
    );
  }
}

const mapState = (state: State) => ({
  isPlaying: isPlaying(state)
});

const mapDispatch = {
  play: play,
  pause: pause
};

export default connect(
  mapState,
  mapDispatch
)(Player);
