import {
  GET_QUESTIONS,
  ADD_ANSWER,
  ADD_QUESTION,
  ADD_QUESTION_TO_USERS,
} from "./types";
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "../_DATA";
import { addAnswerToUsers } from "./users";

export const getQuestions = (questions) => {
  return {
    type: GET_QUESTIONS,
    questions,
  };
};

export const addQuestionToUsers = (question) => {
  return {
    type: ADD_QUESTION_TO_USERS,
    question,
  };
};

export const addAnswerToQuestion = (questions) => {
  return {
    type: ADD_ANSWER,
    questions,
  };
};

export const addQuestion = (questions) => {
  return {
    type: ADD_QUESTION,
    questions,
  };
};

export const handleAddAnswer = (answer, qid) => {
  console.log(answer, qid, "checking answer and qId");
  return (dispatch, getState) => {
    const { auth } = getState();
    console.log(auth, "answer auth user");
    return _saveQuestionAnswer({
      authedUser: auth.id,
      qid,
      answer,
    }).then((res) => {
      dispatch(addAnswerToQuestion(res.questions));
      dispatch(addAnswerToUsers(res.users));
    });
  };
};

export const handleAddQuestion = (optionOneText, optionTwoText) => {
  return (dispatch, getState) => {
    const { auth } = getState();
    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: auth.id,
    }).then((questions) => {
      dispatch(addQuestion(questions));
      dispatch(addQuestionToUsers(questions));
    });
  };
};
