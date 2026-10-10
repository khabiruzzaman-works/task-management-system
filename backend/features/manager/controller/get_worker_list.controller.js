import { App_error, App_response } from "../../../utils/app_outcome_handler.js";
import get_worker_list_service from "../service/get_worker_list.service.js";

export default async function get_worker_list_controller(req, res) {
  const _id = req.user._id;

  const worker_list = await get_worker_list_service({_id})

  return new App_response("worker list fetchd", 200, {
    worker_list,
  }).send_response(res);
}
