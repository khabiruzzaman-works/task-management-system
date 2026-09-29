import { token_generator } from "../../../utils/token_generator.js";
import {
  login_service,
  update_refresh_token,
} from "../service/login.service.js";
import variables from "../../../config/env_variables.js";

export default async function login_controller(req, res) {
  const { email, password } = req.body;
  try {
    const email_parts = email.split("@");

    if (email_parts.length !== 2 || email_parts[1] !== variables.ORG_DOMAIN) {
      const error = new Error(" email is invalid");
      error.status = 401;
      error.success = false;

      throw error;
    }

    const logged_user = await login_service({ email, password });
    const access_token = token_generator({ _id: logged_user._id }, "access");
    const refresh_token = token_generator(
      {
        _id: logged_user._id,
        name: logged_user.name,
        email: logged_user.email,
      },
      "refresh",
    );

    const is_token_refreshed = await update_refresh_token(
      logged_user._id,
      refresh_token,
    );

    if (!is_token_refreshed) {
      const error = new Error("login failed due to some issue with token");
      error.status = 403;
      error.success = false;

      throw error;
    }

    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
    });
    res.status(200).json({
      message: "log in successful",
      success: true,
      user: {
        _id: logged_user._id,
        role: logged_user.role,
        name:logged_user.name,
      },
      accessToken: access_token,
    });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({
      message: error.message || "couldn't login user",
      success: error.success || false,
    });
  }
}
