import { App_error } from "../../../utils/app_outcome_handler.js";
import Task from "../model/task.model.js";

const is_available_status = {
  in_progress: ["submitted"],
  submitted: [],
  pending: [],
  canceled: [],
  approved: [],
  rejected: [],
};
export default async function task_change_as_worker_service(
  task_id,
  status,
  worker_id,
) {
  const task = await Task.findOne({ _id: task_id, assigned_to: worker_id });
  if (!task) {
    throw new App_error("task not found", 404, "TASK_NOT_FOUND");
  }

  if (status !== undefined) {
    const is_allowed_status = is_available_status[task.status];
    if (!is_allowed_status.includes(status)) {
      throw new App_error(
        `you can't change this task status to ${status}`,
        403,
        "FORBIDDEN",
        "worker can only edit task status into some specific field",
      );
    }
    task.status = status;
  }
  await task.save();
  return;
}
