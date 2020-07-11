import mongoose from "mongoose";

export const Dog = mongoose.model("Dog", {
  name: String,
  birthday: Date,
  picture: String
});
