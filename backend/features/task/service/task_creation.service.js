import { App_error } from "../../../utils/app_outcome_handler.js";
import User from "../../user/model/user.model.js";
import Task from "../model/task.model.js";

export default async function task_creation_service({
  title,
  description,
  priority,
  status,
  manager_email,
  assigned_by,
}) {
  const manager_user = await User.findOne({ email: manager_email })
    .select("_id role")
    .lean();
  if (!manager_user) {
    throw new App_error("manager is not found", 404, "USER_NOT_FOUND");
  }
  if (manager_user.role !== "manager") {
    throw new App_error(
      "only manager can assigned to manage task",
      403,
      "FORBIDDEN",
    );
  }

  const new_task = new Task({
    title,
    description,
    priority,
    status,
    manager: manager_user._id,
    assigned_by,
  });

  return await new_task.save();
}
