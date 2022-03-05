import { SET_LOGGEDIN } from "../actions/loggedIn";
import { initialState } from "../index";

const loggedInReducer = (state = initialState.loggedIn, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOGGEDIN:
      return payload;

    default:
      return state;
  }
};

export default loggedInReducer;
