import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

interface Props {
  from: string;
  to: string;
}

class DefaultRoute extends Component<Props> {
  render() {
    const { from, to } = this.props;

    return <Route exact path={from} render={() => <Redirect to={to} />} />;
  }
}

export default DefaultRoute;
