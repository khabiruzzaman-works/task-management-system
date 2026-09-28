import { Error } from "mongoose";
import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export async function login_service({ email, password }) {
  const does_exist = await User.findOne({ email }).select("+password");

  if (!does_exist) {
    const error = new Error("User doesn't exist");
    error.status = 403;
    error.success = false;

    throw error;
  }

  const is_pas_correct = await bcryptjs.compare(password, does_exist.password);

  if (!is_pas_correct) {
    const error = new Error(" email or password is incorrect");
    error.status = 401;
    error.success = false;

    throw error;
  }
  return does_exist;
}

export async function update_refresh_token(_id, token) {
  const hashed_refresh_token = await bcryptjs.hash(token, 10);
  const updated_user = await User.findByIdAndUpdate(
    _id,
    { refresh_token: hashed_refresh_token },
    { new: true },
  );
  return updated_user;
}
