import { GET_USERS, ADD_ANSWER_TO_USERS,ADD_QUESTION_TO_USERS } from "./types";

export const getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

export const addAnswerToUsers = (users) => {
  return {
    type:ADD_ANSWER_TO_USERS,
    users
  }
}
export const addQuestionToUsers = (question) => {
  return {
    tpye:ADD_QUESTION_TO_USERS,
    question
  }
}