import reducer from "./reducers/anecdoteReducer";
import { createStore } from "redux";

const store = createStore(reducer);

export default store;
