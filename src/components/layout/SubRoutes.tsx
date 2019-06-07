import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import DefaultRoute from "../DefaultRoute";
import PrivateRoute from "../PrivateRoute";

interface Props extends RouteComponentProps {
  items: { default?: boolean; path: string; component: any }[];
}

function SubRoutes({ match, items }: Props) {
  const defaultItem = items.find(item => !!item.default);
  return (
    <>
      {!!defaultItem && (
        <DefaultRoute
          from={`${match.path}`}
          to={`${match.path}/${defaultItem.path}`}
        />
      )}

      {items.map(item => (
        <PrivateRoute
          key={item.path}
          path={`${match.path}/${item.path}`}
          component={item.component}
        />
      ))}
    </>
  );
}

export default withRouter(SubRoutes);
