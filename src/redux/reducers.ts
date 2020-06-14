import { combineReducers } from "redux";
// persist
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import filter from './filter/reducer';
import modal from './modal/reducer';

// reducers
import auth from "./auth/reducer";

const persistConfig = {
  key: "auth$v1.0",
  // debug: true,
  storage
};

export default combineReducers({
  auth: persistReducer(persistConfig, auth),
  filter: filter,
  modal: modal,
});
