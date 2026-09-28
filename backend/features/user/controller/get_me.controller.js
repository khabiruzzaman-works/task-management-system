import { Error } from "mongoose";
import { get_me_service } from "../service/get_me.service.js";

export async function get_me_controller(req, res) {
  const user = req.user;

  if (!user) {
    const error = new Error("could get user fron auth middleware");
    error.status = 401;
    error.succes = false;
    throw error;
  }

  try {
    const user_info = await get_me_service(user._id);

    res.status(201).json({
      message: "user details got succesfully",
      success: true,
      user: user_info,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "couldn't get user info",
      success: error.success || false,
    });
  }
}
