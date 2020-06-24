import { ProfileState, ProfileTypes } from "./types";
import { ProfileActions } from "./actions";

const INITIAL_STATE: ProfileState = {
  data: {
    name: '',
    email: '',
    course: -1,
    user_permissions: -1,
    code: '',
  }
};

function reducer(state = INITIAL_STATE, action: ProfileActions) {
  const { type }: { type: string } = action;

  switch (type) {
    case ProfileTypes.SET_PROFILE:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export default reducer;
