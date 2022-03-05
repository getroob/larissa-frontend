import { initialState } from "../index";
import { SET_USER } from "../actions/user";

const userReducer = (state = initialState.user, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return payload;

    default:
      return state;
  }
};

export default userReducer;
