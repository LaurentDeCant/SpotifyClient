import React from "react";
import { Route, Redirect } from "react-router";

interface Props {
  from: string;
  to: string;
}

function DefaultRoute({ from, to }: Props) {
  return <Route exact path={from} render={() => <Redirect to={to} />} />;
}

export default DefaultRoute;
