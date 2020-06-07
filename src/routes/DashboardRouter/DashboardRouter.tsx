import React from "react";
import { Route, Switch } from "react-router";

import DashboardContainer from "../../pages/DashBoard/components/DashBoardContainer/DashboardContainer";
import { BasicsProvider } from "../../pages/DashBoard/components/BasicsProvider/BasicsProvider";
import MainDashboard from "../../pages/DashBoard/MainDashboard/MainDashboard";
import Register from "../../pages/Auth/Register/Register";

export default () => (
  <BasicsProvider>
    <DashboardContainer>
      <Switch>
        <Route
          exact
          path={'/dashboard'}
          component={MainDashboard}
        />
        <Route
          exact
          path={'/register'}
          component={Register}
        />
      </Switch>
    </DashboardContainer>
  </BasicsProvider>
);
