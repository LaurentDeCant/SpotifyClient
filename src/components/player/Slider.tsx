import React, { useState, useRef, HTMLAttributes } from "react";
import styled from "../../styles/styled";

const Wrapper = styled.div<{ isDisabled: boolean }>`
  align-items: center;
  border-radius: 2.5px;
  display: flex;
  cursor: ${props => (props.isDisabled ? "default" : "pointer")};
  height: 25px;
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
  height: 25px;
  left: calc(${props => props.position * 100}% - 12.5px);
  position: absolute;
  visibility: hidden;
  width: 25px;
  z-index: 1;
  transition: left 0.2s;

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

function Slider(props: Props & HTMLAttributes<HTMLDivElement>) {
  const [isDown, setIsDown] = useState(false);
  const [value, setValue] = useState(0);

  const wrapper = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLDivElement>(null);

  function getValue(x: number) {
    const currentWrapper = wrapper.current;
    const currentTHunb = thumb.current;
    if (!currentWrapper || !currentTHunb) {
      return 0;
    }

    const clientRect = currentWrapper.getBoundingClientRect();
    let value = (x - clientRect.left) / currentWrapper.clientWidth;
    if (value < 0) {
      value = 0;
    } else if (value > 1) {
      value = 1;
    }

    return value;
  }

  function handleMouseDown(event: React.MouseEvent<HTMLElement>) {
    const { canChange } = props;
    if (!canChange) {
      return;
    }

    setIsDown(true);
    setValue(getValue(event.pageX));
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(event: MouseEvent) {
    setValue(getValue(event.pageX));
  }

  function handleMouseUp(event: MouseEvent) {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    setIsDown(false);
    const { onChange } = props;
    if (onChange) {
      const value = getValue(event.pageX);
      onChange(value);
    }
  }

  function getCurrentValue() {
    return isDown ? value : props.value;
  }

  const { className, canChange } = props;
  const currentValue = getCurrentValue();

  return (
    <Wrapper
      ref={wrapper}
      onMouseDown={handleMouseDown}
      isDisabled={!canChange}
      className={className}
    >
      <Left width={currentValue} />
      {canChange && (
        <Thumb ref={thumb} position={currentValue} isDisabled={!canChange} />
      )}
      <Right width={currentValue} />
    </Wrapper>
  );
}

Slider.defaultProps = {
  value: 0,
  canChange: true
};

export default Slider;
