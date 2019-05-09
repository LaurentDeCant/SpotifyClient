import React, { ComponentType, useState } from "react";
import { connect } from "react-redux";
import { State } from "../reducers";
import { selectIsLoading } from "../reducers/loading";
import Fader from "./Fader";
import Loader from "./Loader";

function withReloader(WrappedComponent: ComponentType<any>) {
  const WithReloaded = ({ isLoading, ...rest }: any) => {
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

  const mapState = (state: State) => ({
    isLoading: selectIsLoading(state)
  });

  return connect(
    mapState,
    null
  )(WithReloaded);
}

export default withReloader;
