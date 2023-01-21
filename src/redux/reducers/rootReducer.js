import { combineReducers } from "redux";
import CommonReducer from "./CommonReducer";
import TodoReducer from "./TodoReducer";

const rootReducer = combineReducers({
  todos: TodoReducer,
  common: CommonReducer,
});

export default rootReducer;
