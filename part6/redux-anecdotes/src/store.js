import anecdoteReducer from "./reducers/anecdoteReducer";
import { combineReducers, createStore } from "redux";
import notificationReducer from "./reducers/notificationReducer";
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
});

const store = createStore(reducer);

export default store;
