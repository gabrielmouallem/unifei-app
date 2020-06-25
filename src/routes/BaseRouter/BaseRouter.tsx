import React from "react";
// router
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

import AuthRouter from "../AuthRouter/AuthRouter";
import DashboardRouter from "../DashboardRouter/DashboardRouter";
import { useSelector, shallowEqual } from "react-redux";
import { ApplicationState } from "../../redux";


const BaseRouter = () => {

  // const logged_in = true;
  
  const logged_in = useSelector(
    (state: ApplicationState) => state.auth.logged_in,
    shallowEqual
  );

  return (
    <Router>
      <Switch>
        <Route
          exact
          path={'/'}
          render={(props: any) =>
            !logged_in ? (
              <AuthRouter {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/marker-list'
                }}
              />
            )
          }
        />
        <Route
          render={(props: any) =>
            logged_in ? (
              <DashboardRouter {...props} />
            ) : (
              <Redirect to={{ pathname: '/' }} />
            )
          }
        />
      </Switch>
    </Router>
  );
};

export default BaseRouter;
