import { register_service } from "../service/register.service.js";

const max_length = 72;
const min_length = 8;

export async function register_controller(req, res) {
  const { name, password, email } = req.body;
  try {
    const email_parts = email.split("@");

    if (email_parts.length !== 2 || email_parts[1] !== process.env.ORG_DOMAIN) {
      const error = new Error(" email is invalid");
      error.status = 401;
      error.success = false;

      throw error;
    }

    if (password.length < min_length || password.length > max_length) {
      return res.status(402).json({
        message: "password has to be between 8 and 72 chars",
        success: false,
      });
    }

    await register_service({ reference: req.user._id, name, password, email });
    res
      .status(201)
      .json({ message: "user is created succcessfully", success: true });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "couldn't register user",
      success: error.success || false,
    });
  }
}
