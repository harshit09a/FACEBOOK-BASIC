import * as API from "../api/index";
import {SEARCH_SUCCESS} from "./actionTypes";
export const fetchUser = (id) => async (dispatch) => {
  try {
    console.log("search user");
    const { data } = await API.searchUser(id);
    
    dispatch(fetchSuccess(data.user));
  } catch (error) {
    
    console.log(error);
  }
};

export function fetchSuccess(user) {
  
  return {
    type:SEARCH_SUCCESS ,
    user,
  };
}