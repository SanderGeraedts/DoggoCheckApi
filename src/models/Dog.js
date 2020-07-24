import mongoose, { Schema } from "mongoose";

export const Dog = mongoose.model("Dog", {
  name: String,
  birthday: Date,
  picture: String,
  defecations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Defecation"
    }
  ],
  weights: [
    {
      type: Schema.Types.ObjectId,
      ref: "Weight"
    }
  ]
});
