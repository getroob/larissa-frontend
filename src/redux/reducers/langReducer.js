import { SET_LANG } from "../actions/lang";
import { initialState } from "../index";

const langReducer = (state = initialState.lang, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LANG:
      return payload;

    default:
      return state;
  }
};

export default langReducer;
