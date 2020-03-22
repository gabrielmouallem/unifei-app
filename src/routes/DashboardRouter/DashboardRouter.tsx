import React from "react";
import { Route, Switch } from "react-router";

import DashboardContainer from "../../pages/DashBoard/components/DashBoardContainer/DashboardContainer";
import { BasicsProvider } from "../../pages/DashBoard/components/BasicsProvider/BasicsProvider";
import MainDashboard from "../../pages/DashBoard/MainDashboard/MainDashboard";

export default () => (
  <BasicsProvider>
    <DashboardContainer>
      <Switch>
        <Route
          exact
          path={'/dashboard'}
          component={MainDashboard}
        />
      </Switch>
    </DashboardContainer>
  </BasicsProvider>
);
