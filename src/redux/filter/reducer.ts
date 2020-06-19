import { FilterState, FilterTypes } from "./types";
import { FilterActions } from "./actions";

const INITIAL_STATE: FilterState = {
  data: {
    genericMarkers: false,
    eventMarkers: false,
    studyGroupMarkers: false,
    extraActivityMarkers: false,
    constructionMarkers: false,
    scheduleMarkers: false
  }
};

function reducer(state = INITIAL_STATE, action: FilterActions) {
  const { type }: { type: string } = action;

  switch (type) {
    case FilterTypes.STORE_FILTER:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export default reducer;
