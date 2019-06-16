import React, { useState, HTMLAttributes } from "react";
import styled from "styled-components";

export enum ImageShape {
  Square = "SQUARE",
  Round = "ROUND"
}

const StyledImg = styled.img<{ shape: ImageShape; isLoaded: boolean }>`
  ${props => props.shape === ImageShape.Round && "border-radius: 50%;"}
  height: auto;
  object-fit: cover;
  opacity: ${props => (props.isLoaded ? "1" : "0")}
  width: 100%;
  transition: opacity .2s;
`;

const Container = styled.div<{ shape: ImageShape }>`
  background: ${props => props.theme.background.tertiary};
  ${props => props.shape === ImageShape.Round && "border-radius: 50%;"}
  height: 100%;
  position: relative;
  width: 100%;
`;

const StyledText = styled.span`
  font-size: ${props => props.theme.thickness.extraLarge}px;
  font-weight: ${props => props.theme.fontWeight.light}
  left: 50%;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
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

  return source ? (
    <StyledImg
      className={className}
      src={source}
      shape={shape}
      onLoad={handleLoad}
      isLoaded={isLoaded}
    />
  ) : (
    <Container className={className} shape={shape}>
      <StyledText>?</StyledText>
    </Container>
  );
}

Image.defaultProps = {
  shape: ImageShape.Square
};

export default Image;
