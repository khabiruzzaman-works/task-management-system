import { Error } from "mongoose";
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
  const manage_user = await User.findOne({ email: manager_email })
    .select("_id")
    .lean();

  if (!manage_user) {
    throw new Error("manager id couldn't be find to create a task");
  }

  const new_task = new Task({
    title,
    description,
    priority,
    status,
    manager: manage_user._id,
    assigned_by,
  });

  return await new_task.save();
}
