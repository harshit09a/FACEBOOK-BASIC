import * as API from "../api/index";
import {
  CREATE_POST,
  FETCH_ALL,
  EDIT_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  LIKE_POST_SUCCESS,
  COMMENT_ADD_SUCCESS,
  COMMENT_DELETE_SUCCESS,
  COMMENT_LIKE_SUCCESS 
} from "./actionTypes";
export const createPost = (formData) => async (dispatch) => {
  try {
    const { data } = await API.createPost(formData);
    dispatch(createPostSucess(data));
  } catch (error) {
    console.log(error);
  }
};
export const editPost = (formData, id) => async (dispatch) => {
  try {
    const { data } = await API.editPost(formData, id);
    dispatch(editPostSucess(data));
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await API.likePost(id);
    dispatch(likePostSucess(data));
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
export const likePostSucess = (data) => {
  return { type: LIKE_POST_SUCCESS, data };
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await API.deletePost(id);
    dispatch(deletePostSucess(id));
  } catch (error) {
    console.log(error);
  }
};
export const deletePostSucess = (id) => {
  return { type: DELETE_POST_SUCCESS, id };
};
export const createPostSucess = (data) => {
  return { type: CREATE_POST, data };
};
export const editPostSucess = (data) => {
  return { type: EDIT_POST_SUCCESS, data };
};
export const fetchAll = () => async (dispatch) => {
  try {
    const { data } = await API.fetchPost();
    console.log(data);
    dispatch(fetchAllSucess(data));
  } catch (error) {
    console.log("fetch-all error");
    console.log(error);
  }
};
export const fetchAllSucess = (data) => {
  return { type: FETCH_ALL, data };
};
export const addComment=(formData,id)=>async(dispatch)=>{
  try {
    const { data } = await API.addComment(formData, id);
    dispatch(commentsAddSuccess(data));
  } catch (error) {
    console.log(error);
  }
}
export const commentsAddSuccess=(data)=>{
return {type:COMMENT_ADD_SUCCESS,data}
}
export const deleteComment = (postId, id) => async (dispatch) => {
  try {
    const { data } = await API.deleteComment(postId, id);
    dispatch(commentDeleteSuccess(data));
  } catch (error) {
    console.log(error);
  }
};
export const commentDeleteSuccess=(data)=>{
return {type:COMMENT_DELETE_SUCCESS,data}
}
export const likeComment = (postId, id) => async (dispatch) => {
  try {
    const { data } = await API.likeComment(postId, id);
    dispatch(commentLikeSuccess(data));
  } catch (error) {
    console.log(error);
  }
};
export const commentLikeSuccess = (data) => {
  return { type: COMMENT_LIKE_SUCCESS , data }
}
