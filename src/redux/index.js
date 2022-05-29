import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import langReducer from "./reducers/langReducer";
import loggedInReducer from "./reducers/loggedInReducer";
import userReducer from "./reducers/userReducer";

const composeThatAlwaysWorks =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
  loggedIn: false,
  user: null,
  lang: localStorage.getItem('lang') || 'gr'
};

const bigReducer = combineReducers({
  loggedIn: loggedInReducer,
  user: userReducer,
  lang: langReducer,
});

const configureStore = createStore(
  bigReducer,
  initialState,
  composeThatAlwaysWorks(applyMiddleware(thunk))
);

export default configureStore;
