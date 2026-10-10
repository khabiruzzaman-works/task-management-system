import { App_response } from "../../../utils/app_outcome_handler.js";
import { cookie_options } from "../../../utils/cookie_handler.js";
import logout_service from "../service/logout.service.js";

export async function logout_controller(req, res) {
  await logout_service(req.user._id);
  res.clearCookie("refreshToken", cookie_options);
  return new App_response("logout successfull", 200).send_response(res);
}
