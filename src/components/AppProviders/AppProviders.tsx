import React, { useMemo } from "react";
import SnackProvider from "./SnackProvider/SnackProvider";

// Redux
import Redux from "../../redux";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Persistor } from "redux-persist";
import { Store } from "redux";
import { ChildrenProps } from "../../utils/types";

const AppProviders = (props: ChildrenProps) => {
  const store: Store = useMemo(() => Redux().store, []);
  const persistor: Persistor = useMemo(() => Redux().persistor, []);
  const { children } = props;

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <SnackProvider>
            {children}
        </SnackProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default AppProviders;
