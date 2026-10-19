import { App_error, App_response } from "../../../utils/app_outcome_handler.js";
import task_change_as_manager_service from "../service/task_change_as_manager.service.js";

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

  if (status !== undefined) {
    throw new App_error(
      "managers can't change status directly",
      403,
      "FORBIDDEN",
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
