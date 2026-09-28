import { logout_service } from "../service/logout.service.js";

export async function logout_controller(req, res) {
  if (!req.user) {
    const error = new Error("middleware failed and could get user in request");
    error.status = 409;
    error.success = false;

    throw error;
  }

  try {
    await logout_service(req.user._id);
    res.clearCookie("refreshToken", {
      httpOnly: true,
    });
    res.status(200).json({
      message: "logout  successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({
      message: error.message || "couldn't lougout",
      success: error.success || false,
    });
  }
}
