import { App_error } from "../../../utils/app_outcome_handler.js";
import User from "../../user/model/user.model.js";
import Task from "../model/task.model.js";

const editablity = {
  in_progress: {status:["canceled"],                          manager:false, details:false},
  submitted:   {status:["rejected", "approved", "canceled"],manager:false, details:false},
  pending:     {status:["canceled"],                          manager:true,  details:true},
  canceled:    {status:[],                                  manager:false, details:false},
  approved:    {status:[],                                  manager:false, details:false},
  rejected:    {status:[],                                  manager:false, details:false},
};
function valid(value) {
  if (typeof value !== "string") { return undefined };
  const val = value.trim();
  return val === "" ? undefined : val
}


export default async function task_change_as_admin_service(
  admin_id,
  task_id,
  status,
  priority,
  title,
  description,

  manager_email,
) {
  const task = await Task.findOne({ _id: task_id, assigned_by: admin_id });
  if (!task) {
    throw new App_error("task isn't found ", 404, "TASK_NOT_FOUND");
  }

  const editable = editablity[task.status];
  const valid_title = valid(title);
  const valid_description = valid(description);
  const valid_priority = valid(priority);
  const valid_status = valid(status);
  const valid_manager_email = valid(manager_email);


  if (valid_title || valid_description || valid_priority) {
    if (!editable.details) {
      throw new App_error("details can't be edited now", 403, "FORBIDDEN");
    }
    if (valid_title) {
      task.title = valid_title;
    }
    if (valid_description) {
      task.description = valid_description;
    }
    if (valid_priority) {
      task.priority = valid_priority;
    }
  }


  if (valid_manager_email && valid_status !== "canceled") {
    if (!editable.manager) {
      throw new App_error("manager can't be assigned now", 403, "FORBIDDEN");
    }

    const manager_user = await User.findOne({
      email: valid_manager_email,
      role: "manager",
    })
      .select("_id")
      .lean();
    if (!manager_user) {
      throw new App_error("manager is not found", 404, "USER_NOT_FOUND");
    }
    if (task.manager.equals(manager_user._id)) {
      throw new App_error("manager is already assigned", 409, "CONFLICT");
    }
    task.manager = manager_user._id;
    task.assigned_to = null;
  }

  if (valid_status && valid_status !== task.status) {
    if (!editable.status.includes(valid_status)) {
      throw new App_error("status can't be edited now", 403, "FORBIDDEN");
    }
    task.status = valid_status;
  }

  await task.save();
  return;
}
