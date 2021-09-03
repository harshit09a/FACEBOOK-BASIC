import { combineReducers } from "redux";
import auth from "./auth";
import posts from "./posts";
import profile from "./profile";
import search from "./search";
export default combineReducers({ auth, posts ,profile,search});
