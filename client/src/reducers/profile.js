import {
  USER_FETCH_START,
  USER_FETCH_FAIL,
  USER_FETCH_SUCCESS,
  ADD_FRIEND_SUCCESS,
  UNSEND_FRIEND_REQIEST_SUCCESS,
  ACCEPT_REQUEST_PROFILE_SUCCESS,
  UNFRIEND_REQUEST_PROFILE_SUCCESS,
} from "../actions/actionTypes";

const initalProfileState = {
  user: {},
  error: null,
  success: null,
  inProgress: true,
};
export default function profile(state = initalProfileState, action) {
  switch (action.type) {
    case USER_FETCH_START:
      return { ...state, inProgress: true };
    case USER_FETCH_FAIL:
      return {
        ...state,
        inProgress: false,
        error: action.error,
        success: false,
      };
    case USER_FETCH_SUCCESS:
      return { ...state, user: action.user, inProgress: false, success: true };
    case ADD_FRIEND_SUCCESS:
      return { ...state, user: action.user };
    case UNSEND_FRIEND_REQIEST_SUCCESS:
      return { ...state, user: action.user };
    case ACCEPT_REQUEST_PROFILE_SUCCESS:
      return { ...state, user: action.user };
      case UNFRIEND_REQUEST_PROFILE_SUCCESS:
          return { ...state, user: action.user };
    default:
      return state;
  }
}
