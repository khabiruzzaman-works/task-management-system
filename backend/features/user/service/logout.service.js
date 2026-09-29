import User from "../model/user.model.js";

export async function logout_service(_id) {
  const logged_out_user = await User.findByIdAndUpdate(
    _id,
    { refresh_token: null },
    { returnDocument:"after" },
  );
  if (!logged_out_user) {
    const error = new Error("refresh token could update in db");
    error.status = 409;
    error.success = false;

    throw error;
  }
}
