import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  message: String,
  name: String,
  creator: String,
  selectedFile: String,
  userDp:String,
  likes: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
});

var PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
