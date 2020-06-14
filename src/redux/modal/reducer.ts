import { ModalState, ModalTypes } from "./types";
import { ModalActions } from "./actions";

const INITIAL_STATE: ModalState = {
  data: {
    open: false
  }
};

function reducer(state = INITIAL_STATE, action: ModalActions) {
  const { type }: { type: string } = action;

  switch (type) {
    case ModalTypes.HANDLE_MODAL:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export default reducer;
