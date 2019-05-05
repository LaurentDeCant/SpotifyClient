import React, { useState } from "react";
import styled from "styled-components";

const Img = styled.img<{ isLoaded: boolean }>`
  height: 100%;
  object-fit: cover;
  opacity: ${props => (props.isLoaded ? "1" : "0")}
  width: 100%;
  transition: opacity .2s;
`;

interface Props {
  className?: string;
  source: string;
}

function Image({ className, source }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);

  function handleLoad() {
    setIsLoaded(true);
  }

  return (
    <Img
      className={className}
      src={source}
      onLoad={handleLoad}
      isLoaded={isLoaded}
    />
  );
}

export default Image;
