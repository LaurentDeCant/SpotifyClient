import React, { useState, useRef } from "react";
import styled from "../../styles/styled";

const Wrapper = styled.div<{ isDisabled: boolean }>`
  border-radius: 2.5px;
  cursor: ${props => (props.isDisabled ? "default" : "pointer")};
  padding: 0 12.5px
  width: 100%;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  height: 25px;
  position: relative;
  width: 100%;
`;

const Left = styled.div.attrs<{ width: number }>(
  (props: { width: number }) => ({
    style: { width: `${props.width * 100}%` }
  })
)<{ width: number }>`
  background: ${props => props.theme.primaryLight};
  border-radius: 2.5px 0 0 2.5px;
  height: 2.5px;
`;

const Thumb = styled.div.attrs<{ position: number }>(
  ({ position }: { position: number }) => ({
    style: { left: `${position * 100}%` }
  })
)<{ position: number; isDisabled: boolean }>`
  background: transparent;
  border-radius: 50%;
  height: 25px;
  margin-left: -12.5px;
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

const Right = styled.div.attrs<{ width: number }>(
  (props: { width: number }) => ({
    style: { width: `${100 - props.width * 100}%` }
  })
)<{ width: number }>`
  background: ${props => props.theme.foreground.dark};
  border-radius: 0 2.5px 2.5px 0;
  height: 2.5px;
`;

interface Props {
  className?: string;
  value: number;
  canChange: boolean;
  onChange: (value: number) => void;
}

function Slider({ className, value, canChange, onChange }: Props) {
  const [isDown, setIsDown] = useState(false);
  const [localValue, setLocalValue] = useState(0);

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
    if (!canChange) {
      return;
    }

    setIsDown(true);
    setLocalValue(getValue(event.pageX));
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(event: MouseEvent) {
    setLocalValue(getValue(event.pageX));
  }

  function handleMouseUp(event: MouseEvent) {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    setIsDown(false);
    const value = getValue(event.pageX);
    onChange(value);
  }

  function getCurrentValue() {
    return isDown ? localValue : value;
  }

  const currentValue = getCurrentValue();

  return (
    <Wrapper
      ref={wrapper}
      onMouseDown={handleMouseDown}
      isDisabled={!canChange}
      className={className}
    >
      <Container>
        <Left width={currentValue} />
        {canChange && (
          <Thumb ref={thumb} position={currentValue} isDisabled={!canChange} />
        )}
        <Right width={currentValue} />
      </Container>
    </Wrapper>
  );
}

Slider.defaultProps = {
  value: 0,
  canChange: true,
  onChange: () => {}
};

export default Slider;
