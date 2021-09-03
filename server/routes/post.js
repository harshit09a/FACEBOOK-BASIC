import express from "express";
const router = express.Router();
import auth from "../middlewere/auth.js";

import { getPosts, createPost ,updatePost,deletePost,likePost,addComment,commentDelete,likeComment} from "../controllers/posts.js";

router.get("/", getPosts);
router.post("/",auth,createPost);
router.patch('/:id',auth, updatePost);
router.delete('/:id',auth, deletePost);
router.patch('/:id/likePost',auth, likePost);
router.post('/comment/like/:id/:postId',auth,likeComment)
router.post("/comment/:id/:postId",auth,commentDelete);
router.post("/comment/:id",auth,addComment);

export default router;
