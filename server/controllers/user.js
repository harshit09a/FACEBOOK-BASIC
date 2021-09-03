import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import UserModal from "../models/user.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email })
      .populate("friends")
      .populate("friendRequest");

    if (!oldUser)
      return res
        .status(404)
        .json({ user: null, message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ user: null, message: "Invalid credentials" });

    const token = jwt.sign(
      {
        email: oldUser.email,
        _id: oldUser._id,
        selectedFile: oldUser.selectedFile,
        name: oldUser.name,
        friends: oldUser.friends,
        friendRequest: oldUser.friendRequest,
      },
      secret,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      user: {
        name: oldUser.name,
        email: oldUser.email,
        _id: oldUser._id,
        selectedFile: oldUser.selectedFile,
        friends: oldUser.friends,
        friendRequest: oldUser.friendRequest,
        token,
      },
      message: "successfully loged in",
    });
  } catch (err) {
    res.status(500).json({ user: null, message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, name, confirmPassword, selectedFile } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password doesn't match" });
    }
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) {
      return res
        .status(400)
        .json({ user: null, message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name,
      selectedFile,
      friendRequest: [],
      friends: [],
    });

    const token = jwt.sign(
      {
        email: result.email,
        _id: result._id,
        name: result.name,
        selectedFile: result.selectedFile,
        friendRequest: [],
        friends: [],
      },
      secret,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      user: {
        name,
        email,
        selectedFile,
        _id: result._id,
        token,
        friendRequest: [],
        friends: [],
      },
      message: "successfully signed up",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });

    console.log(error);
  }
};
export const updatedUser = async (req, res) => {
  const id = req.body._id;
  const { password, confirmPassword, name, selectedFile } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password doesn't match" });
    }
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .send({ message: "something went wrong,user not found" });
    const findUser = await UserModal.findById(id);
    let hashedPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);

      hashedPassword = await bcrypt.hash(password, salt);
    } else {
      hashedPassword = findUser.password;
    }

    const newUser = {
      password: hashedPassword,
      name,
      selectedFile,
      email: findUser.email,
      friends: findUser.friends,
      friendRequest: findUser.friendRequest,
    };
    const updateUser = await UserModal.findByIdAndUpdate(id, newUser, {
      new: true,
    });
    const token = jwt.sign(
      {
        email: updateUser.email,
        _id: updateUser._id,
        name: updateUser.name,
        selectedFile: updateUser.selectedFile,
        friends: findUser.friends,
        friendRequest: findUser.friendRequest,
      },
      secret,
      {
        expiresIn: "1h",
      }
    );
    const oldUser = await UserModal.findById(id)
      .populate("friends")
      .populate("friendRequest");
    res.status(201).json({
      user: {
        name: updateUser.name,
        email: updateUser.email,
        selectedFile: updateUser.selectedFile,
        _id: updateUser._id,
        friends: oldUser.friends,
        friendRequest: oldUser.friendRequest,
        token,
      },
      message: "user successfully updated",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });

    console.log(error);
  }
};
export const fetchUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModal.findById(id)
      .populate("friends")
      .populate("friendRequest");
    res.status(201).json({
      user: {
        name: user.name,
        email: user.email,
        selectedFile: user.selectedFile,
        _id: user._id,
        friends: user.friends,
        friendRequest: user.friendRequest,
      },
      message: "user successfully fetched",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });

    console.log(error);
  }
};
///add friend
export const addFriend = async (req, res) => {
  const { id, userId } = req.params;
  try {
    console.log("hello add friend");
    const userItself = await UserModal.findById(userId)
      .populate("friends")
      .populate("friendRequest");
    const friend_to_add = await UserModal.findById(id);
    friend_to_add.friendRequest.push(userItself);
    await friend_to_add.save();
    const new_friend_to_add = await UserModal.findById(id)
      .populate("friends")
      .populate("friendRequest");

    res.status(201).json({
      message: "successfully request send",
      user: {
        email: new_friend_to_add.email,
        _id: new_friend_to_add._id,
        name: new_friend_to_add.name,
        selectedFile: new_friend_to_add.selectedFile,
        friends: new_friend_to_add.friends,
        friendRequest: new_friend_to_add.friendRequest,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong add friend", error });

    console.log(error);
  }
};
export const unsendRequest = async (req, res) => {
  const { id, userId } = req.params;
  try {
    console.log("hello add friend");
    const userItself = await UserModal.findById(userId)
      .populate("friends")
      .populate("friendRequest");
    const friend_to_add = await UserModal.findById(id);
    friend_to_add.friendRequest = friend_to_add.friendRequest.filter(
      (friend) => friend._id != userId
    );
    await friend_to_add.save();
    const new_friend_to_add = await UserModal.findById(id)
      .populate("friends")
      .populate("friendRequest");

    res.status(201).json({
      message: "successfully request send",
      user: {
        email: new_friend_to_add.email,
        _id: new_friend_to_add._id,
        name: new_friend_to_add.name,
        selectedFile: new_friend_to_add.selectedFile,
        friends: new_friend_to_add.friends,
        friendRequest: new_friend_to_add.friendRequest,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong add friend", error });

    console.log(error);
  }
};
export const acceptRequest = async (req, res) => {
  const { id, userId } = req.params;
  try {
    const userItself = await UserModal.findById(userId)
      .populate("friends")
      .populate("friendRequest");
    const friend_to_add = await UserModal.findById(id)
      .populate("friends")
      .populate("friendRequest");
    const old_userItself = await UserModal.findById(userId);
    const old_friend_to_add = await UserModal.findById(id);
    old_friend_to_add.friends.push(userItself);
    await old_friend_to_add.save();
    old_userItself.friends.push(friend_to_add);
    await old_userItself.save();
    old_userItself.friendRequest = old_userItself.friendRequest.filter(
      (friend) => friend._id != id
    );
    await old_userItself.save();
    const new_friend_to_add = await UserModal.findById(id)
      .populate("friends")
      .populate("friendRequest");
    const new_userItself = await UserModal.findById(userId)
      .populate("friends")
      .populate("friendRequest");
    const token = jwt.sign(
      {
        email: new_userItself.email,
        _id: new_userItself._id,
        name: new_userItself.name,
        selectedFile: new_userItself.selectedFile,
        friends: new_userItself.friends,
        friendRequest: new_userItself.friendRequest,
      },
      secret,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({
      message: "successfully request send",
      user2: {
        email: new_friend_to_add.email,
        _id: new_friend_to_add._id,
        name: new_friend_to_add.name,
        selectedFile: new_friend_to_add.selectedFile,
        friends: new_friend_to_add.friends,
        friendRequest: new_friend_to_add.friendRequest,
      },
      user1: {
        email: new_userItself.email,
        _id: new_userItself._id,
        name: new_userItself.name,
        selectedFile: new_userItself.selectedFile,
        friends: new_userItself.friends,
        friendRequest: new_userItself.friendRequest,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong add friend", error });

    console.log(error);
  }
};
export const unfriend = async (req, res) => {
  const { id, userId } = req.params;
  try {
    // const userItself = await UserModal.findById(userId).populate("friends").populate("friendRequest");
    // const friend_to_add = await UserModal.findById(id).populate("friends").populate("friendRequest");
    const old_userItself = await UserModal.findById(userId);
    const old_friend_to_add = await UserModal.findById(id);
    old_friend_to_add.friends = old_friend_to_add.friends.filter(
      (friend) => friend._id != userId
    );
    await old_friend_to_add.save();
    old_userItself.friends = old_userItself.friends.filter(
      (friend) => friend._id != id
    );
    await old_userItself.save();
    const new_friend_to_add = await UserModal.findById(id)
      .populate("friends")
      .populate("friendRequest");
    const new_userItself = await UserModal.findById(userId)
      .populate("friends")
      .populate("friendRequest");
    const token = jwt.sign(
      {
        email: new_userItself.email,
        _id: new_userItself._id,
        name: new_userItself.name,
        selectedFile: new_userItself.selectedFile,
        friends: new_userItself.friends,
        friendRequest: new_userItself.friendRequest,
      },
      secret,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({
      message: "successfully request send",
      user2: {
        email: new_friend_to_add.email,
        _id: new_friend_to_add._id,
        name: new_friend_to_add.name,
        selectedFile: new_friend_to_add.selectedFile,
        friends: new_friend_to_add.friends,
        friendRequest: new_friend_to_add.friendRequest,
      },
      user1: {
        email: new_userItself.email,
        _id: new_userItself._id,
        name: new_userItself.name,
        selectedFile: new_userItself.selectedFile,
        friends: new_userItself.friends,
        friendRequest: new_userItself.friendRequest,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong add friend", error });

    console.log(error);
  }
};
//search
export const searchUser = async (req, res) => {
  const { val } = req.params;
  
  try {
    var regexp = new RegExp("^" + val,"i");
    const user = await UserModal.find({ name: regexp})
      .populate("friends")
      .populate("friendRequest");
    res.status(201).json({
      user,
      message: "user successfully fetched",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });

    // console.log(error);
  }
};
