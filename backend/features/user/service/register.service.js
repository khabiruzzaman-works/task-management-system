import { Error } from "mongoose";
import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export async function register_service({ reference, name, email, password }) {
  const is_already_exist = await User.findOne({ email });

  if (is_already_exist) {
    const error = new Error("User is already registered");
    error.status = 409;
    error.success = false;

    throw error;
  }

  const hashed_pass = await bcryptjs.hash(password, 10);

  const new_user = new User({
    name,
    email,
    password: hashed_pass,
    role: "worker",
    reference,
    refresh_token: null,
  });

  return await new_user.save();
}
