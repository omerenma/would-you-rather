import { _getUsers, _getQuestions } from "../_DATA";
import { getUsers } from "../actions/users";
import { getQuestions } from "../actions/questions";
import { setAuthedUser } from "../actions/setAuthedUser";

// Get the initial state of the auth user from the store
import store from "../store";
const auth = store.getState().auth;

// let AuthedUser = 'tylermcginnis'

// Get the save auth in Login from local storage and pass it to setAuthedUser

let loginUser = localStorage.getItem("login");

const handleGetInitialData = () => (dispatch) => {
  _getUsers().then((users) => {
    dispatch(getUsers(users));
    dispatch(setAuthedUser(loginUser));
  });
  _getQuestions().then((questions) => dispatch(getQuestions(questions)));
};

export default handleGetInitialData;
