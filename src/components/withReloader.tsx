import React, { FunctionComponent, ComponentType, useState } from "react";
import Loader from "./Loader";
import Fader from "./Fader";

interface Props {
  isLoading: boolean;
}

function withReloader<P extends Props>(
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
        <Loader isLoading={!hasLoaded} />
        <Fader isLoading={!hasLoaded}>
          <WrappedComponent {...rest} />
        </Fader>
      </>
    );
  };
}

export default withReloader;
