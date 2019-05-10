import React, { useState } from "react";
import styled from "styled-components";

const Img = styled.img<{ shape: ImageShape; isLoaded: boolean }>`
  ${props => props.shape === ImageShape.Round && "border-radius: 50%;"}
  height: auto;
  object-fit: cover;
  opacity: ${props => (props.isLoaded ? "1" : "0")}
  width: 100%;
  transition: opacity .2s;
`;

export enum ImageShape {
  Square = "SQUARE",
  Round = "ROUND"
}

interface Props {
  className?: string;
  source: string;
  shape: ImageShape;
}

function Image({ className, source, shape }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);

  function handleLoad() {
    setIsLoaded(true);
  }

  return (
    <Img
      className={className}
      src={source}
      shape={shape}
      onLoad={handleLoad}
      isLoaded={isLoaded}
    />
  );
}

Image.defaultProps = {
  shape: ImageShape.Square
};

export default Image;
