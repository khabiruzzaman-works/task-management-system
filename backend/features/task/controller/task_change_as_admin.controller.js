import { App_error, App_response } from "../../../utils/app_outcome_handler.js";
import task_change_as_admin_service from "../service/task_change_as_admin.service.js";

export default async function task_change_as_admin_controller(req, res) {
  const { task_id, manager_email, title, description, status, priority } =
    req.body;
  const admin_id = req.user._id;

  if (!admin_id || !task_id) {
    throw new App_error(
      "task id  is missing",
      400,
      "VALIDATION_ERROR",
      "task  id is missing from fillng space",
    );
  }

  await task_change_as_admin_service(
    admin_id,
    task_id,
    status,
    priority,
    title,
    description,
    manager_email,
  );

  return new App_response("task is updated successfully ,admin").send_response(
    res,
  );
}
