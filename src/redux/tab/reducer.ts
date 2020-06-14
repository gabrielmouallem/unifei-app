import { TabState, TabTypes } from "./types";
import { TabActions } from "./actions";

const INITIAL_STATE: TabState = {
  data: {
    value: undefined
  }
};

function reducer(state = INITIAL_STATE, action: TabActions) {
  const { type }: { type: string } = action;

  switch (type) {
    case TabTypes.SELECT_TAB:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export default reducer;
