import { combineReducers } from "redux";
import questions from "./questions";
import users from "./users";
import auth from "./auth";

const reducers = combineReducers({
  users,
  questions,
  auth,
});

export default reducers;
