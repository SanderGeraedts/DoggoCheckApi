import mongoose, { Schema } from "mongoose";

export const Defecation = mongoose.model("Defecation", {
  type: { type: String, required: true },
  datetime: { type: Date, default: Date.now },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});
