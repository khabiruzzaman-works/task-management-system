import { App_error } from "../../../utils/app_outcome_handler.js";
import User from "../../user/model/user.model.js";
import Task from "../model/task.model.js";

export default async function task_change_as_manager_service(
  task_id,
  manager_id,
  worker_email,
) {
  const task = await Task.findOne({ _id: task_id, manager: manager_id });
  if (!task) {
    throw new App_error("task not found", 404, "TASK_NOT_FOUND");
  }

  if (task.status !== "pending" && task.status !== "in_progress") {
    throw new App_error(
      "you are not permitted to do this",
      403,
      "FORBIDDEN",
      "manager can only edit task status into in_progress ",
    );
  }
  const valid_email = worker_email.trim().toLowerCase();

  const worker = await User.findOne({
    email: valid_email,
    manager: manager_id,
    role: "worker",
  })
    .select("_id")
    .lean();
  if (!worker) {
    throw new App_error("worker is not found", 404, "USER_NOT_FOUND");
  }
  task.assigned_to = worker._id;
  task.status = "in_progress";

  await task.save();
  return;
}
