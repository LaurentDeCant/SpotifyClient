import React from "react";
import {
  Route,
  RouteProps,
  RouteComponentProps,
  Redirect,
  withRouter
} from "react-router";
import { connect } from "react-redux";
import { State } from "../reducers";
import { selectIsLoggedIn } from "../reducers/authorization";

interface Props extends RouteProps {
  isLoggedIn: boolean;
}

function PrivateRoute({
  component: Component,
  isLoggedIn,
  ...rest
}: Props & RouteComponentProps) {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          Component && <Component {...props} />
        ) : (
          <Redirect to={`${process.env.PUBLIC_URL}/login`} />
        )
      }
    />
  );
}

const mapState = (state: State) => ({
  isLoggedIn: selectIsLoggedIn(state)
});

export default withRouter(
  connect(
    mapState,
    null
  )(PrivateRoute)
);
