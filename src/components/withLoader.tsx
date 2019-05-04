import React, { FunctionComponent, ComponentType, useState } from "react";
import styled from "../styles/styled";

const Fader = styled.div<{ isLoading: boolean }>`
  opacity: ${props => (props.isLoading ? "0" : "1")};
  transition: ${props => (props.isLoading ? "all 0" : "all 0.2s")};
`;

const Loader = styled.div<{ isLoading: boolean }>`
  height: 5px;
  left: 0;
  position: absolute;
  opacity: ${props => (props.isLoading ? "1" : "0")};
  top: 0;
  transition: ${props => (props.isLoading ? "all 0" : "all 0.2s")};
  width: 100%;

  &::before {
    background: ${props => props.theme.foreground.dark};
    content: "";
    height: 100%;
    position: absolute;
    width: 100%;
  }

  &::after {
    animation: transform 2s linear infinite;
    background: ${props => props.theme.foreground.default};
    content: "";
    height: 100%;
    position: absolute;
    transform-origin: 0;
    width: 100%;

    @keyframes transform {
      0% {
        left: 0;
        width: 0;
      }
      50% {
        left: 0;
        width: 100%;d
      }
      100% {
        left: 100%;
        width: 0;
      }
    }
  }
`;

interface Props {
  isLoading: boolean;
}

const withLoader = <P extends Props>(
  WrappedComponent: ComponentType<P>
): FunctionComponent<P> => {
  return ({ isLoading, ...rest }: any) => {
    const [prevIsLoading, setPrevIsLoading] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    if (prevIsLoading !== isLoading) {
      if (!isLoading) {
        setHasLoaded(true);
      }
      setPrevIsLoading(isLoading);
    }

    return (
      <>
        <Fader isLoading={!hasLoaded}>
          <WrappedComponent {...rest} />
        </Fader>
        <Loader isLoading={!hasLoaded} />
      </>
    );
  };
};

export default withLoader;
