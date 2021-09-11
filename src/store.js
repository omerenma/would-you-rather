import { createStore, compose, applyMiddleware } from "redux";
import rootReducers from "./reducers/rooteReducers";
import thunk from "redux-thunk";
import logger from './middleware/logger';

const store = createStore(
  rootReducers,
  compose(
    applyMiddleware(thunk, logger)
    
  ) || compose
);
export default store;
