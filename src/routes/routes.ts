export enum AuthRoutes {
    LOGIN = "/login",
    REGISTER = "/register",
    FORGET_PASSWORD = "/forget-password",
  }
  
  export enum DashboardRoutes {
    MAIN = "/marker-list",
  }
  
  export default {
    AUTH: AuthRoutes,
    DASHBOARD: DashboardRoutes,
  };
  