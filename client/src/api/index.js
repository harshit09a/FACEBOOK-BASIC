import axios from "axios";

//const API = axios.create({ baseURL: "http://localhost:5000" });
const API = axios.create({
  baseURL: "https://connect-socialmedia-project.herokuapp.com/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    // console.log(localStorage.getItem("tocken"));
    //req.headers.`;
    req.headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Access-Control-Allow-Methods": ["GET", "PATCH", "POST", "DELETE"],
      "Access-Control-Allow-Headers": "Authorization",
    };
  }

  return req;
});
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const updateUser = (formData) => API.patch("/user/update", formData);
export const createPost = (formData) => API.post("/posts", formData);
export const editPost = (formData, id) => API.patch(`/posts/${id}`, formData);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const fetchPost = () => API.get("/posts");
export const addComment = (formData, id) =>
  API.post(`/posts/comment/${id}`, formData);
export const deleteComment = (postId, id) =>
  API.post(`/posts/comment/${id}/${postId}`);
export const likeComment = (postId, id) =>
  API.post(`/posts/comment/like/${id}/${postId}`);
export const fetchUser = (id) => API.get(`/user/fetch/${id}`);
export const addFriend = (id, userId) =>
  API.get(`/user/addFriend/${id}/${userId}`);
export const unsendRequest = (id, userId) =>
  API.get(`/user/unsendRequest/${id}/${userId}`);
export const acceptRequest = (id, userId) =>
  API.get(`/user/acceptRequest/${id}/${userId}`);
export const unfriend = (id, userId) =>
  API.get(`/user/unfriend/${id}/${userId}`);
export const searchUser = (val) => API.get(`/user/search/${val}`);
