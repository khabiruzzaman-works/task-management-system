import { App_error, App_response } from "../../../utils/app_outcome_handler.js";
import task_change_as_manager_service from "../service/task_change_as_manager.service.js";

const manager_allowed_status = [
  "in_progress",
  undefined,
];

export default async function task_change_as_manager_controller(req, res) {
  const { worker_email, task_id, status } = req.body;

  const manager_id = req.user._id;

  if (!task_id || !manager_id) {
    throw new App_error(
      "task assigning data is missing",
      400,
      "VALIDATION_ERROR",
      "some of the task assigning info is missing from fillng space",
    );
  }
  if (!manager_allowed_status.includes(status)) {
    throw new App_error(
      "you are not permitted to do this",
      403,
      "FORBIDDEN",
      "manager can only edit task status into in_progress ",
    );
  }

  await task_change_as_manager_service(
    task_id,
    manager_id,
    worker_email,
    status,
  );
  return new App_response("task is assign successfully", 200).send_response(
    res,
  );
}
