import express from "express";
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import UserModal from "../models/user.js";
import Comments from "../models/comment.js"

export const getPosts = async (req, res) => {
  try {
    console.log("hello");
    const postMessages = await PostMessage.find().populate('comments');

    res.status(200).json(postMessages);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const addComment=async(req,res)=>{
const comment=req.body;
const user = await UserModal.findById(req.userId);
const newComment=new Comments({text:comment.comment,likes:[]});
newComment.author.id=req.userId;
newComment.author.username=user.name;
newComment.author.userDp=user.selectedFile;
  try {
    await newComment.save();
    const post = await PostMessage.findById(req.params.id);
    post.comments.push(newComment);
    await post.save();
    const newPost = await PostMessage.findById(req.params.id).populate('comments');
    res.status(201).json(newPost);
  }
  catch (error) {
    res.status(409).json({ message: error.message });
  }

}
export const createPost = async (req, res) => {
  const post = req.body;
  const user = await UserModal.findById(req.userId);
  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    userDp: user.selectedFile,

    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { message, name, selectedFile} = req.body;
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  const user = await UserModal.findById(req.userId);
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
const post = await PostMessage.findById(id);
  const updatedPost = {
    creator: req.userId, message, selectedFile, userDp: user.selectedFile,likes:post.likes,comments:post.comments,

    createdAt: post.createdAt,};
  try{
 const newPost =await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true }).populate('comments');

  res.json({...newPost._doc,_id:id});
  }
  catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
}
export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true }).populate('comments');
  res.status(200).json(updatedPost);
}
export const commentDelete=async(req,res)=>{
  const { id ,postId} = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  try{
  await Comments.findByIdAndRemove(id);
  const post =await PostMessage.findById(postId).populate('comments');
  res.status(200).json(post);
  }
  catch(error)
  {
    console.log(error);
  }
}
export const likeComment = async (req, res) => {
  const { id,postId } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const findComment = await Comments.findById(id);

  const index = findComment.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    findComment.likes.push(req.userId);
  } else {
    findComment.likes = findComment.likes.filter((id) => id !== String(req.userId));
  }
  const updatedComment = await Comments.findByIdAndUpdate(id, findComment, { new: true });
  const post = await PostMessage.findById(postId).populate('comments');
  res.status(200).json(post);
}