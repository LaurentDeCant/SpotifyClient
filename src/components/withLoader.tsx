import React, { FunctionComponent, ComponentType } from "react";
import Loader from "./Loader";

interface Props {
  isLoading: boolean;
}

function withLoader<P extends Props>(
  WrappedComponent: ComponentType<P>
): FunctionComponent<P> {
  return function({ isLoading, ...rest }: any) {
    return (
      <>
        <WrappedComponent {...rest} />
        <Loader isLoading={isLoading} />
      </>
    );
  };
}

export default withLoader;
