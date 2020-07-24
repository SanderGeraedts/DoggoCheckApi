import { Account } from "../models/Account";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const allAccounts = () => Account.find();

export const register = async (_, { email, password }) => {
  const hashed = await bcrypt.hash(password, 12);

  console.log(hashed);

  const account = new Account({ email, password: hashed });
  try {
    const saved = await account.save();
    return saved;
  } catch (e) {
    throw new Error("Duplicate User");
  }
};

export const login = async (_, { email, password }, { SECRET }) => {
  const account = await Account.findOne({ email });

  if (!account) {
    throw new Error("No user with that email");
  }

  const valid = await bcrypt.compare(password, account.password);

  if (!valid) {
    throw new Error("Incorrect password");
  }

  const token = jwt.sign(
    {
      user: {
        id: account.id,
        email: account.email
      }
    },
    SECRET,
    {
      expiresIn: "1y"
    }
  );

  return token;
};

export const deleteAccount = async (_, { account }) => {
  const result = await Account.findByIdAndRemove(account);

  if (result !== null) {
    return {
      code: 204,
      success: true,
      message: "Account successfully deleted"
    };
  } else {
    return {
      code: 500,
      success: false,
      message: "An error has occured in the deletion of the Account."
    };
  }
};
