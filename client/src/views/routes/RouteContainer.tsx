import React, { ReactElement } from "react";
import { Route, Switch } from "react-router-dom";
import { routePaths } from "./RoutePaths";

export const RouteContainer: React.FC = (): ReactElement => {
  const availableRoutes = Object.values(routePaths);

  return (
    <>
      <Switch>
        {availableRoutes.map(routePath => {
          return (
            <Route key={routePath.path}
              path={routePath.path} component={routePath.container} exact={routePath.isExact} />
          );
        })}
      </Switch>
    </>
  );
};
