import express from "express";
const router = express.Router();

import {
  signin,
  signup,
  updatedUser,
  fetchUser,
  addFriend,
  unsendRequest,
  acceptRequest,
  unfriend,
  searchUser
} from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/update", updatedUser);
router.get("/fetch/:id", fetchUser);
router.get("/addFriend/:id/:userId", addFriend);
router.get("/unsendRequest/:id/:userId", unsendRequest);
router.get("/acceptRequest/:id/:userId", acceptRequest);
router.get("/unfriend/:id/:userId", unfriend);
router.get("/search/:val",searchUser);

export default router;
