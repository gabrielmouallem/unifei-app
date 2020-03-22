import { Reducer } from "redux";
import { AuthState, AuthTypes } from "./types";
import { AuthActions } from "./actions";

const INITIAL_STATE: AuthState = {
  token: "",
  logged_in: false
};

const reducer: Reducer<AuthState, AuthActions> = (
  state = INITIAL_STATE,
  action: AuthActions
): AuthState => {
  const { type, payload }: { type: string; payload: any } = action;

  switch (type) {
    case AuthTypes.SET_TOKEN:
      return { ...state, logged_in: true, token: payload.token };
    case AuthTypes.CLEAR_TOKEN:
      return { ...state, logged_in: false, token: "" };

    default:
      return state;
  }
};

export default reducer;
