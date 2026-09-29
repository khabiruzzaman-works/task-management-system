import jsonwebtoken from "jsonwebtoken";
import User from "../model/user.model.js";
import variables from "../../../config/env_variables.js";
import { refresh_tokens_service } from "../service/refresh_tokens.service.js";

export async function refresh_token_controller(req, res) {
  const token = req.cookies?.refreshToken;
  if (!token) {
    return res.status(401).json({
      message: "token is exired",
      success: false,
    });
  }

  try {
    const refreshed_data = await refresh_tokens_service(token);

    res.cookie("refreshToken", refreshed_data.new_refresh_token, {
      httpOnly: true,
    });
    res.status(200).json({
      message: "tokens is refreshed successfully",
      success: true,
      user: {
        _id: refreshed_data.user_with_new_refresh._id,
        name:refreshed_data.user_with_new_refresh.name,
        email:refreshed_data.user_with_new_refresh.email,
        role:refreshed_data.user_with_new_refresh.role,
      },
      accessToken: refreshed_data.new_access_token,
    });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({
      message: error.message || "couldn't refresh tokens",
      success: error.success || false,
    });
  }
}
