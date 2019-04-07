import React, { Component, createRef } from "react";
import styled from "../../styles/styled";

const Wrapper = styled.div<{ isDisabled: boolean }>`
  align-items: center;
  border-radius: 2.5px;
  display: flex;
  cursor: ${props => (props.isDisabled ? "default" : "pointer")};
  height: 20px;
  position: relative;
  width: 100%;
`;

const Left = styled.div<{ width: number }>`
  background: ${props => props.theme.primaryLight};
  border-radius: 2.5px 0 0 2.5px;
  height: 2.5px;
  left: 0;
  position: absolute;
  width: calc(${props => props.width * 100}%);
`;

const Thumb = styled.div<{ position: number; isDisabled: boolean }>`
  background: transparent;
  border-radius: 50%;
  height: 20px;
  left: calc(${props => props.position * 100}% - 10px);
  position: absolute;
  visibility: hidden;
  width: 20px;
  z-index: 1;

  &::before {
    background: ${props => props.theme.foreground.default};
    border-radius: 50%;
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
    content: "";
    height: 50%;
    left: 25%;
    position: absolute;
    top: 25%;
    width: 50%;
  }

  ${Wrapper}:hover & {
    visibility: visible;
  }
`;

const Right = styled.div<{ width: number }>`
  background: ${props => props.theme.foreground.dark};
  border-radius: 0 2.5px 2.5px 0;
  height: 2.5px;
  position: absolute;
  right: 0;
  width: calc(100% - ${props => props.width * 100}%);
`;

interface Props {
  className?: string;
  value: number;
  canChange: boolean;
  onChange?: (value: number) => void;
}

interface State {
  isDown: boolean;
  value: number;
}

class Slider extends Component<Props, State> {
  static defaultProps = {
    canChange: true
  };

  wrapper = createRef<HTMLDivElement>();
  thumb = createRef<HTMLDivElement>();
  state = {
    isDown: false,
    value: 0
  };

  getValue(x: number) {
    const wrapper = this.wrapper.current;
    const thumb = this.thumb.current;
    if (!wrapper || !thumb) {
      return 0;
    }

    const clientRect = wrapper.getBoundingClientRect();
    let value = (x - clientRect.left) / wrapper.clientWidth;
    if (value < 0) {
      value = 0;
    } else if (value > 1) {
      value = 1;
    }

    return value;
  }

  handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    const { canChange } = this.props;
    if (!canChange) {
      return;
    }

    this.setState({
      isDown: true,
      value: this.getValue(event.pageX)
    });
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  };

  handleMouseMove = (event: MouseEvent) => {
    this.setState({
      value: this.getValue(event.pageX)
    });
  };

  handleMouseUp = (event: MouseEvent) => {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
    this.setState({
      isDown: false
    });
    const { onChange } = this.props;
    if (onChange) {
      const value = this.getValue(event.pageX);
      onChange(value);
    }
  };

  getCurrentValue() {
    const { props, state } = this;
    return state.isDown ? state.value : props.value;
  }

  render() {
    const { className, canChange } = this.props;
    const value = this.getCurrentValue();

    return (
      <Wrapper
        ref={this.wrapper}
        onMouseDown={this.handleMouseDown}
        isDisabled={!canChange}
        className={className}
      >
        <Left width={value} />
        {canChange && (
          <Thumb ref={this.thumb} position={value} isDisabled={!canChange} />
        )}
        <Right width={value} />
      </Wrapper>
    );
  }
}

export default Slider;
