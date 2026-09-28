import jsonwebtoken from "jsonwebtoken";
import User from "../features/user/model/user.model.js";
import variables from "../config/env_variables.js";

export async function authentify(req, res, next) {
  const token = req.headers?.authorization;
  if (!token) {
    return res.status(401).json({
      message: "token is exired",
      success: false,
    });
  }

  try {
    const access_token = token.split(" ")[1];
    const decoded_user = jsonwebtoken.verify(
      access_token,
      variables.ACCESS_TOKEN_SECRET_KEY,
    );
    const authorized_user = await User.findById(decoded_user._id).select(
      "-password",
    );

    if (!authorized_user) {
      return res.status(401).json({
        message: "user doesn't exist",
        success: false,
      });
    }

    req.user = authorized_user;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "authentication is failed",
      success: false,
    });
  }
}
