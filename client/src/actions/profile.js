import * as API from "../api/index";
import {
  USER_FETCH_START,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAIL,
  ADD_FRIEND_SUCCESS,
  UNSEND_FRIEND_REQIEST_SUCCESS,
  ACCEPT_REQUEST_AUTH_SUCCESS,
  ACCEPT_REQUEST_PROFILE_SUCCESS,
  UNFRIEND_REQUEST_AUTH_SUCCESS,
  UNFRIEND_REQUEST_PROFILE_SUCCESS
} from "./actionTypes";
export const fetchUser = (id) => async (dispatch) => {
  try {
    dispatch(fetchStart());
    const { data } = await API.fetchUser(id);
    dispatch(fetchSuccess(data.user));
  } catch (error) {
    dispatch(fetchFailure(error.response.data.message));
    console.log(error);
  }
};
export function fetchStart() {
  return { type: USER_FETCH_START };
}
export function fetchSuccess(user) {
  return {
    type: USER_FETCH_SUCCESS,
    user: user,
  };
}
export function fetchFailure(error) {
  return {
    type: USER_FETCH_FAIL,
    error,
  };
}
export const addFriend = (id, userId) => async (dispatch) => {
  try {
    const { data } = await API.addFriend(id, userId);
    dispatch(addFriendSuccess(data.user));
  } catch (error) {
    console.log(error);
  }
};
export const addFriendSuccess = (user) => {
  return {
    type: ADD_FRIEND_SUCCESS,
    user,
  };
};
export const unsendRequest = (id, userId) => async (dispatch) => {
  try {
    const { data } = await API.unsendRequest(id, userId);
    dispatch(unsendRequestSuccess(data.user));
  } catch (error) {
    console.log(error);
  }
};
export const unsendRequestSuccess = (user) => {
  return {
    type: UNSEND_FRIEND_REQIEST_SUCCESS,
    user,
  };
};
export const acceptRequest = (id, userId) => async (dispatch) => {
  try {
    const { data } = await API.acceptRequest(id, userId);
    dispatch(acceptAuthRequestSuccess(data.user1));
    dispatch(acceptProfileRequestSuccess(data.user2));
  } catch (error) {
    console.log(error);
  }
};
export const acceptAuthRequestSuccess = (user) => {
  return {
    type: ACCEPT_REQUEST_AUTH_SUCCESS,
    user,
  };
};
export const acceptProfileRequestSuccess = (user) => {
  return {
    type: ACCEPT_REQUEST_PROFILE_SUCCESS,
    user,
  };
};
export const unfriend = (id, userId) => async (dispatch) => {
    try {
        const { data } = await API.unfriend(id, userId);
        dispatch(unfriendAuthRequestSuccess(data.user1));
        dispatch(unfriendProfileRequestSuccess(data.user2));
    } catch (error) {
        console.log(error);
    }
};
export const unfriendAuthRequestSuccess = (user) => {
    return {
        type: UNFRIEND_REQUEST_AUTH_SUCCESS,
        user,
    };
};
export const unfriendProfileRequestSuccess = (user) => {
    return {
        type: UNFRIEND_REQUEST_PROFILE_SUCCESS,
        user,
    };
};
