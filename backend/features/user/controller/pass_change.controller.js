import { pass_change_service } from "../service/pass_change.service.js";

export async function pass_change_controller(req, res) {
  const { new_password, current_password } = req.body;
  const user_id = req.user._id;
  try {
    const is_new_pass_same_as_old = new_password === current_password;

    if (is_new_pass_same_as_old) {
      return (
        res.status(405),
        json({
          message: "new password can't be the old one",
          success: false,
        })
      );
    }

    const pass_updated = await pass_change_service({
      user_id,
      new_password,
      current_password,
    });

    if (!pass_updated) {
      return (
        res.status(405).
        json({
          message: "pass couldn't update",
          success: false,
        })
      );
    }

    res.status(201).json({
      message: "pass updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "couldn't change password",
      success: error.success || false,
    });
  }
}
