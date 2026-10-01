import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export async function pass_change_service({user_id, new_password, current_password}) {
  const get_user = await User.findById(user_id).select("+password");

  const is_pass_valid = bcryptjs.compare(current_password, get_user.password);
  if (!is_pass_valid) {
    return new error({
      message: "old password is wrong",
    });
  }
  const pass_updated_user = await User.findByIdAndUpdate(
    user_id,
    {
      password: new_password,
    },
    {
      returnDocument: "after",
    },
  );

  return pass_updated_user;
}
