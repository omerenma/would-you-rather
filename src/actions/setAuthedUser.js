import { SET_AUTHED_USER, NO_AUTHED_USER } from "./types";

export const setAuthedUser = (id) => {
  return {
    type: SET_AUTHED_USER,
    id: id,
  };
};

export const noAuthedUser = (id) => {
  return {
    type: NO_AUTHED_USER,
    id,
  };
};
