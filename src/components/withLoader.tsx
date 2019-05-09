import React, { ComponentType } from "react";
import { connect } from "react-redux";
import { State } from "../reducers";
import { selectIsLoading } from "../reducers/loading";
import Fader from "./Fader";
import Loader from "./Loader";

const withLoader = (WrappedComponent: ComponentType<any>) => {
  const WithLoader = ({ isLoading, ...rest }: any) => {
    return (
      <>
        <Loader isLoading={isLoading} />
        <Fader isLoading={isLoading}>
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
  )(WithLoader);
};

export default withLoader;
