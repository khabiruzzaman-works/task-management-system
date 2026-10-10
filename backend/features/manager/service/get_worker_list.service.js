import { App_error } from "../../../utils/app_outcome_handler.js";
import User from "../../user/model/user.model.js";

export default async function get_worker_list_service({ _id }) {
  const worker_list = await User.find({
    manager: _id,
    role:"worker" ,
  })
    .select("email name role manager")
    .lean();
  if (!worker_list) {
    throw new App_error("user is not found",404,"USER_NOT_FOUND")
  }

  return worker_list;
}
