import { Account } from "../models/Account";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Retrieves an Account based at first on the id parameter and secondly on
 * loggedIn User from the jwt token.
 *
 * @param {String}  { id } passed down as a parameter to retrieve an Account
 *                  that's not the loggedIn User
 * @param {*}       { user } passed down from the Authorization header.
 *
 * @returns {Account}   Returns the retrieved Account
 */
export const account = (_, { id }, { user }) => {
  const userId = id ? id : user.id;
  return Account.findById(userId).populate("dogs");
};

/**
 * Retrieves all Accounts
 *
 * @returns {[Account]} All Accounts stored in the DB
 */
export const allAccounts = () => Account.find().populate("dogs");

/**
 * Creates a new Account. Hashes the password before storing it.
 *
 * @param {String} email    Email from the user
 * @param {String} password Password from the user
 *
 * @returns {Account}       returns the created account
 */
export const register = async (_, { email, password }) => {
  const hashed = await bcrypt.hash(password, 12);

  const account = new Account({ email, password: hashed });
  try {
    const saved = await account.save();
    return saved;
  } catch (e) {
    throw new Error("Duplicate User");
  }
};

/**
 * Verifies the credentials. Checks if an Account with email is found.
 * Throws Error if not. Then compares the given password with the stored hash.
 * Throws Error if the hash did not compare to the given password. Then returns
 * the JWT if there were no errors.
 *
 * @param {String} email    Email from the user
 * @param {String} password Password from the user
 * @param {String} SECRET   Signing secret passed down from the context
 *
 * @returns {String} the Authorization key for the loggedIn user
 */
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
