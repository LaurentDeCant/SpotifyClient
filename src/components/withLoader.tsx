import React, { FunctionComponent, ComponentType } from "react";
import Loader from "./Loader";
import Fader from "./Fader";

interface Props {
  isLoading: boolean;
}

function withLoader<P extends Props>(
  WrappedComponent: ComponentType<P>
): FunctionComponent<P> {
  return function({ isLoading, ...rest }: any) {
    return (
      <>
        <Loader isLoading={isLoading} />
        <Fader isLoading={isLoading}>
          <WrappedComponent {...rest} />
        </Fader>
      </>
    );
  };
}

export default withLoader;
