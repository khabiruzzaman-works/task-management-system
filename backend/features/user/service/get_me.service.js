import User from "../model/user.model.js";

export async function get_me_service(_id) {
  const user_deatils = await User.findById(_id).select("-password");
  if (!user_deatils) {
    const error = new Error("could get user fron db");
    error.status = 401;
    error.succes = false;
    throw error;
  }

  return user_deatils;
}
