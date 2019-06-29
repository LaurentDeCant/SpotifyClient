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
import { selectIsLoggedIn } from "../selectors/authorization";
import { selectUserProfile } from "../selectors/userProfile";
import { UserProfile } from "../types";

interface Props extends RouteProps {
  isLoggedIn: boolean;
  userProfile?: UserProfile;
}

function PrivateRoute({
  component: Component,
  isLoggedIn,
  userProfile,
  ...rest
}: Props & RouteComponentProps) {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          userProfile ? (
            Component && <Component {...props} />
          ) : (
            <></>
          )
        ) : (
          <Redirect to={`${process.env.PUBLIC_URL}/login`} />
        )
      }
    />
  );
}

const mapState = (state: State) => ({
  isLoggedIn: selectIsLoggedIn(state),
  userProfile: selectUserProfile(state)
});

export default withRouter(
  connect(
    mapState,
    null
  )(PrivateRoute)
);
