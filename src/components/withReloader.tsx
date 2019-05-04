import React, { FunctionComponent, ComponentType, useState } from "react";
import styled from "../styles/styled";
import Loader from "./Loader";

const Fader = styled.div<{ isLoading: boolean }>`
  opacity: ${props => (props.isLoading ? "0" : "1")};
  transition: ${props => (props.isLoading ? "all 0" : "all 0.2s")};
`;

interface Props {
  isLoading: boolean;
}

function withOneTimeLoader<P extends Props>(
  WrappedComponent: ComponentType<P>
): FunctionComponent<P> {
  return function({ isLoading, ...rest }: any) {
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
}

export default withOneTimeLoader;
