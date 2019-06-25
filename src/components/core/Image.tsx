import React, { useState, HTMLAttributes } from "react";
import styled from "styled-components";

export enum ImageShape {
  Square = "SQUARE",
  Round = "ROUND"
}

const Wrapper = styled.div<{ shape: ImageShape }>`
  background: ${props => props.theme.background.tertiary};
  ${props => props.shape === ImageShape.Round && "border-radius: 50%;"}
  overflow: hidden;
  width: 100%;
`;

const ReWrapper = styled.div`
  padding-top: 100%;
  position: relative;
`;

const Img = styled.img<{ isLoaded: boolean }>`
  height: 100%;
  left: 0;
  position: absolute;
  object-fit: cover;
  opacity: ${props => (props.isLoaded ? "1" : "0")}
  top: 0;
  width: 100%;
  transition: opacity .2s;
`;

interface Props {
  source?: string;
  shape: ImageShape;
}

function Image({
  className,
  source,
  shape
}: Props & HTMLAttributes<HTMLElement>) {
  const [isLoaded, setIsLoaded] = useState(false);

  function handleLoad() {
    setIsLoaded(true);
  }

  return (
    <Wrapper className={className} shape={shape}>
      <ReWrapper>
        {source && <Img src={source} onLoad={handleLoad} isLoaded={isLoaded} />}
      </ReWrapper>
    </Wrapper>
  );
}

Image.defaultProps = {
  shape: ImageShape.Square
};

export default Image;
