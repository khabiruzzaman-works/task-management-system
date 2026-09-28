import bcryptjs from "bcryptjs";
import { token_generator } from "../../../utils/token_generator.js";
import User from "../model/user.model.js";

export async function refresh_tokens_service(token) {
  const decoded_user = jsonwebtoken.verify(
    token,
    variables.REFRESH_TOKEN_SECRET_KEY,
  );
  const authorized_user = await User.findById(decoded_user._id).select(
    "-password",
  );

  const is_refresh_token_valid = await bcryptjs.compare(
    token,
    authorized_user.refresh_token,
  );

  if (!is_refresh_token_valid) {
    const error = new Error("refresh token is invaild");
    error.status = 403;
    error.success = false;

    throw error;
  }

  const new_access_token = token_generator(
    { _id: authorized_user._id },
    "access",
  );
  const new_refresh_token = token_generator(
    {
      name: authorized_user.name,
      _id: authorized_user._id,
      email: authorized_user.email,
    },
    "refresh",
  );

  const new_hashed_refresh_token = await bcryptjs.hash(new_refresh_token, 10);

  const user_with_new_refresh = await User.findByIdAndUpdate(
    authorized_user._id,
    { refresh_token: new_hashed_refresh_token },
    { new: true },
  );

  if (!user_with_new_refresh) {
    const error = new Error("refresh token could update in db");
    error.status = 409;
    error.success = false;

    throw error;
  }

  return {
    new_access_token,
    new_refresh_token,
    user_with_new_refresh,
  };
}
