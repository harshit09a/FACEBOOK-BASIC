import {
  SIGNUP_START,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  LOGIN_START,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  AUTHENTICATE_USER,
  LOGOUT,
  CLEAR_AUTH_STATE,
  USER_UPDATION_FAIL,
  USER_UPDATED_SUCCESSFULLY,
  ACCEPT_REQUEST_AUTH_SUCCESS,
  UNFRIEND_REQUEST_AUTH_SUCCESS,
} from "../actions/actionTypes";

const initialAuthState = {
  user: {},
  error: null,
  isLoggedIn: false,
  inProgress: false,
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_START:
    case SIGNUP_START:
      return { ...state, inProgress: true };
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return {
        ...state,
        inProgress: false,
        error: action.error,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      localStorage.setItem("token", action.user.token);
      return {
        ...state,
        inProgress: false,
        user: action.user,
        isLoggedIn: true,
        error: null,
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        error: null,
        isLoggedIn: true,
        inProgress: false,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isLoggedIn: false,
        user: {},
        inProgress: false,
        error: null,
      };
    case USER_UPDATION_FAIL:
      return { ...state, error: action.error };
    case USER_UPDATED_SUCCESSFULLY:
      localStorage.setItem("token", action.user.token);
      return { ...state, error: false, user: action.user };
    case CLEAR_AUTH_STATE:
      return { ...state, error: null };
    case ACCEPT_REQUEST_AUTH_SUCCESS:
      localStorage.setItem("token", action.user.token);
      return { ...state, error: false, user: action.user}  
      case UNFRIEND_REQUEST_AUTH_SUCCESS:
      localStorage.setItem("token", action.user.token);
      return { ...state, error: false, user: action.user }  
    default:
      return state;
  }
}
