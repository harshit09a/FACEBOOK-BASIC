import mongoose from "mongoose";
var commentSchema = mongoose.Schema({


    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"

        },
        username: String,
        userDp:String,
       


    },
    likes: { type: [String], default: [] },


});
export default   mongoose.model("Comment", commentSchema);