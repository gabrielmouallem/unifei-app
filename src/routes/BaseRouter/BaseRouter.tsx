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


const BaseRouter = () => {
  // Farms.
  //const logged_in = useSelector();
  const logged_in = false;

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
                  pathname: '/dashboard'
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
              <Redirect to={{ pathname: '/login' }} />
            )
          }
        />
      </Switch>
    </Router>
  );
};

export default BaseRouter;
