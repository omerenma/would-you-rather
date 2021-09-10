import { GET_QUESTIONS, ADD_ANSWER, ADD_QUESTION } from "../actions/types";

const questions = (state = {}, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.questions.id]: action.questions,
      };
    case ADD_ANSWER:
      return {
        ...state,
        ...action.questions,
      };
    default:
      return state;
  }
};

export default questions;
