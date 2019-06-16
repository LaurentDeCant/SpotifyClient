import React, { useState, useRef } from "react";
import styled from "../../styles/styled";

const Wrapper = styled.div<{ isDisabled: boolean }>`
  border-radius: ${props => props.theme.thickness.extraExtraSmall}px;
  cursor: ${props => (props.isDisabled ? "default" : "pointer")};
  padding: 0 ${props => props.theme.thickness.small}px
  width: 100%;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  height: ${props => props.theme.thickness.medium}px;
  position: relative;
  width: 100%;
`;

const Left = styled.div.attrs<{ width: number }>(props => ({
  style: { width: `${props.width * 100}%` }
}))<{ width: number }>`
  background: ${props => props.theme.color.primary};
  border-radius: ${props => props.theme.thickness.extraExtraSmall}px 0 0
    ${props => props.theme.thickness.extraExtraSmall}px;
  height: ${props => props.theme.thickness.extraExtraSmall}px;
`;

const Thumb = styled.div.attrs<{ position: number }>(({ position }) => ({
  style: { left: `${position * 100}%` }
}))<{ position: number }>`
  background: transparent;
  border-radius: 50%;
  height: ${props => props.theme.thickness.medium}px;
  margin-left: -12.5px;
  position: absolute;
  visibility: hidden;
  width: ${props => props.theme.thickness.medium}px;
  z-index: 1;
  transition: left 0.2s;

  &::before {
    background: ${props => props.theme.foreground.default};
    border-radius: 50%;
    box-shadow: ${props => props.theme.shadow.middle};
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

const Right = styled.div.attrs<{ width: number }>(props => ({
  style: { width: `${100 - props.width * 100}%` }
}))<{ width: number }>`
  background: ${props => props.theme.foreground.lightFade};
  border-radius: 0 ${props => props.theme.thickness.extraExtraSmall}px
    ${props => props.theme.thickness.extraExtraSmall}px 0;
  height: ${props => props.theme.thickness.extraExtraSmall}px;
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
        {canChange && <Thumb ref={thumb} position={currentValue} />}
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
