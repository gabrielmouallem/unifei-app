import React, { useContext } from "react";
import { Route, Switch, __RouterContext } from "react-router";
import { useTransition, animated } from 'react-spring';

import DashboardContainer from "../../pages/DashBoard/components/DashBoardContainer/DashboardContainer";
import { BasicsProvider } from "../../pages/DashBoard/components/BasicsProvider/BasicsProvider";
import MainDashboard from "../../pages/DashBoard/MainDashboard/MainDashboard";
import Register from "../../pages/Auth/Register/Register";
import SelectedMarker from "../../pages/DashBoard/MainDashboard/components/SelectedMarker/SelectedMarker";
import Profile from "../../pages/DashBoard/Profile/Profile";
import MySchedule from "../../pages/DashBoard/MySchedule/MySchedule";

export default () => {

  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, location => location.pathname, {
    // from:  { opacity: 0},
    // enter: { opacity: 1},
    // leave: { opacity: 0}
    from: { opacity: 0, transform: "translateX(100%)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 0, transform: "translateX(-50%)" }
  })

  return (
    <BasicsProvider>
      <DashboardContainer>
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props}>
            <Switch location={item}>
              <Route
                exact
                path={'/marker-list'}
                component={MainDashboard}
              />
              <Route
                exact
                path={'/register'}
                component={Register}
              />
              <Route
                exact
                path={'/markers/:marker'}
                component={SelectedMarker}
              />
              <Route
                exact
                path={'/profile/'}
                component={Profile}
              />
              <Route
                exact
                path={'/my-schedule/'}
                component={MySchedule}
              />
            </Switch>
          </animated.div>
        ))}
      </DashboardContainer>
    </BasicsProvider>
  );
};
