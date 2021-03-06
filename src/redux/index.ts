// tools
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
// redux elements
import { applyMiddleware, createStore, Store } from "redux";
import reducers from "./reducers";
import middlewares from "./middlewares";
import { Persistor, persistStore } from "redux-persist";
// state
import { AuthState } from "./auth/types";

//todos os types de redux vem aqui
export interface ApplicationState {
  auth: AuthState;
}

const store: Store<ApplicationState> = createStore(
  reducers,
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares))
);

const persistor: Persistor = persistStore(store);

export default () => ({ store, persistor });
