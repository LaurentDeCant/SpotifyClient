import React, { Component } from "react";
import styled from "../../styles/styled";
import { IconType } from "../Icon";
import RoundButton from "../RoundButton";
import Slider from "./Slider";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
`;

const StyledSlider = styled(Slider)`
  width: 100px;
`;

interface Props {
  volume: number;
  isMuted: boolean;
  onChange: (volume: number, isMuted: boolean) => void;
}

class Volume extends Component<Props> {
  handleClick = () => {
    const { volume, isMuted, onChange } = this.props;
    onChange(volume, !isMuted);
  };

  handleChange = (value: number) => {
    const { onChange } = this.props;
    onChange(value, false);
  };

  render() {
    const { volume, isMuted } = this.props;

    return (
      <Wrapper>
        <RoundButton
          onClick={this.handleClick}
          iconType={isMuted ? IconType.VolumeOff : IconType.VolumeUp}
        />
        <StyledSlider
          value={isMuted ? 0 : volume}
          onChange={this.handleChange}
        />
      </Wrapper>
    );
  }
}

export default Volume;
