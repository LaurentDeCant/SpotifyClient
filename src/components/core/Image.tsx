import React, { useState, HTMLAttributes } from "react";
import styled from "styled-components";
import Icon, { IconType } from "./Icon";

const StyledImg = styled.img<{ shape: ImageShape; isLoaded: boolean }>`
  ${props => props.shape === ImageShape.Round && "border-radius: 50%;"}
  height: auto;
  object-fit: cover;
  opacity: ${props => (props.isLoaded ? "1" : "0")}
  width: 100%;
  transition: opacity .2s;
`;

const StyledIcon = styled(Icon)<{ shape: ImageShape }>`
  background: ${props => props.theme.background.light};
  ${props => props.shape === ImageShape.Round && "border-radius: 50%;"}
  text-align: center;
  width: 100%;
`;

export enum ImageShape {
  Square = "SQUARE",
  Round = "ROUND"
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  source?: string;
  shape: ImageShape;
}

function Image({ className, source, shape }: Props) {
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
    <StyledIcon className={className} type={IconType.Person} shape={shape} />
  );
}

Image.defaultProps = {
  shape: ImageShape.Square
};

export default Image;
