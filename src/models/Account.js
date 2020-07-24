import mongoose, { Schema } from "mongoose";

export const Account = mongoose.model("Account", {
  email: { type: String, unique: true, required: true },
  password: String,
  dogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dog"
    }
  ]
});
