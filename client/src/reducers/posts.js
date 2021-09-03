import {
  CREATE_POST,
  FETCH_ALL,
  EDIT_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  LIKE_POST_SUCCESS,COMMENT_ADD_SUCCESS, COMMENT_DELETE_SUCCESS,COMMENT_LIKE_SUCCESS
} from "../actions/actionTypes";

export default function posts(state = [], action) {
  switch (action.type) {
    case CREATE_POST:
      return [...state, action.data];
    case FETCH_ALL:
      return action.data;
    case EDIT_POST_SUCCESS:

      return state.map((post) => (post._id === action.data._id ? action.data : post));
      case DELETE_POST_SUCCESS:
        return state.filter((post)=>post._id!==action.id);
    case LIKE_POST_SUCCESS:return  state.map((post) => (post._id === action.data._id ? action.data : post));
    case COMMENT_ADD_SUCCESS: return state.map((post)=>post._id==action.data._id?action.data:post);
    case COMMENT_DELETE_SUCCESS:return state.map((post) =>
      post._id == action.data._id ? action.data : post
    );
    case COMMENT_LIKE_SUCCESS: return state.map((post) =>
      post._id == action.data._id ? action.data : post
    );
    default:
      return state;
  }
}
