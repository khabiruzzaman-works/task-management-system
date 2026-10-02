import { Error } from "mongoose";
import User from "../../user/model/user.model.js";
import Task from "../model/task.model.js";

export default async function get_tasks_service(user_id) {
  const get_user = await User.findOne({ user_id }).select("role").lean();

  if (!get_user) {
    throw new Error("couldn't get user info to get tasks");
  }

  let tasks = [];

  if (get_user.role === "admin") {
    tasks = await Task.find({ assigned_by: user_id }).lean();
  }
  if (get_user.role === "manager") {
    tasks = await Task.find({ manager: user_id }).lean();
  }
  if (get_user.role === "worker") {
    tasks = await Task.find({ assigned_to: user_id }).lean();
  }

  return tasks;
}
