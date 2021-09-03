import * as API from "../api/index";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_START,
  LOGIN_START,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  AUTHENTICATE_USER,
  LOGOUT,
  CLEAR_AUTH_STATE,
  USER_UPDATED_SUCCESSFULLY,
  USER_UPDATION_FAIL,
} from "./actionTypes";
export const signup = (formData) => async (dispatch) => {
  try {
    dispatch(signupStart());
    const { data } = await API.signUp(formData);
    dispatch(signupSuccess(data.user));
  } catch (error) {
    dispatch(signupFailure(error.response.data.message));
    console.log(error);
  }
};
export function signupStart() {
  return { type: SIGNUP_START };
}
export function loginStart() {
  return { type: LOGIN_START };
}
export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user: user,
  };
}
export function signupFailure(error) {
  return {
    type: SIGNUP_FAILURE,
    error,
  };
}
export const login = (formData) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const { data } = await API.signIn(formData);
    console.log(data);
    dispatch(loginSuccess(data.user));
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
    console.log(error);
  }
};
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user: user,
  };
}
export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error,
  };
}
export function authenticateUser(user){
return {
    type:AUTHENTICATE_USER,user
}
}
export function logout(){
  return {type:LOGOUT}

}
export function clearAuthState()
{
  return {type:CLEAR_AUTH_STATE}
}
export const editUser=(formData)=>async(dispatch)=>
{
  try{
     const {data} =await API.updateUser(formData);
     dispatch(updateSuccess(data.user));
  }
  catch(error){
dispatch(updateFailure(error.response.data.message));
  }
}
export function updateSuccess(user) {
  return {
    type: USER_UPDATED_SUCCESSFULLY,
    user: user,
  };
}
export function updateFailure(error) {
  return {
    type: USER_UPDATION_FAIL,
    error,
  };
}