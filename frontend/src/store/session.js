// frontend/src/store/session.js
import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const RESTORE_SESSION = "session/restoreSession";
const SIGNUP_USER = "session/signupUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const restoreSession = (user) => {
  return {
    type: RESTORE_SESSION,
    payload: user,
  };
}

const signupUser = (user) => {
  return {
    type: SIGNUP_USER,
    payload: user,
  };
}

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, email, password, role } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      role,
    }),
  });
  const data = await response.json();
  dispatch(signupUser(data.user));
  return data.user;
}

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
    return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(restoreSession(data.user));
  return response;
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SIGNUP_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
    case RESTORE_SESSION:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
  }
};

export default sessionReducer;