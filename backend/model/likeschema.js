import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    like_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vedio_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Like = mongoose.model("Like", likeSchema);

export default Like;
