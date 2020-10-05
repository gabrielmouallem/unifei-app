import React, { useMemo } from "react";
import SnackProvider from "./SnackProvider/SnackProvider";

// Redux
import Redux from "../../redux";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Persistor } from "redux-persist";
import { Store } from "redux";
import { ChildrenProps } from "../../utils/types";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { RecoilRoot } from "recoil";

const AppProviders = (props: ChildrenProps) => {
  const store: Store = useMemo(() => Redux().store, []);
  const persistor: Persistor = useMemo(() => Redux().persistor, []);
  const { children } = props;

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#004780'
      },
      secondary: {
        main: '#FFF'
      }
    }
  });

  return (
    <RecoilRoot>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <MuiThemeProvider theme={theme}>
            <SnackProvider>
              {children}
            </SnackProvider>
          </MuiThemeProvider>
        </PersistGate>
      </ReduxProvider>
    </RecoilRoot>
  );
};

export default AppProviders;
